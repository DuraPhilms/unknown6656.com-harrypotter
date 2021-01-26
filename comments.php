<?php
    include('yaml.php');
    header('Content-Type: application/json');

    const COMMENTS_DIR = __DIR__.'/comments';
    const UPDATE_INTERVAL_SECONDS = 2700; // 45min
    const MAX_COMMENT_COUNT = 4000;
    const MAX_WRITE_ATTEMPTS = 10;


    $yaml = new Yaml();
    $metadata = $yaml->load(__DIR__.'/metadata.yaml');
    $api_key = trim(fgets(fopen(__DIR__.'/youtube-api-keys.txt', 'r')));

    if (!file_exists(COMMENTS_DIR))
        mkdir(COMMENTS_DIR, 0777, true);

    $key = isset($_GET["key"]) ? $_GET["key"] : "";
    $part = isset($_GET["part"]) ? $_GET["part"] : "";

    if (preg_match('/^[a-z]+$/i', $key) && preg_match('/^\d+$/i', $part))
    {
        $part = substr(str_pad($part, 2, "0", STR_PAD_LEFT), -2);

        if (!isset($metadata[$key]["parts"][$part]["youtube-ids"]))
            http_response_code(400);
        else
        {
            http_response_code(200);
            echo get_comments($key, $part);
        }
    }
    else
        http_response_code(401);

    /*
    for each comment:
        ["id"]              string
        ["html"]            string
        ["author_name"]     string
        ["author_image"]    string
        ["author_url"]      string
        ["likes"]           int
        ["date"]            string
        ["reply_count"]     int
        ["replies"]         array
            ["id"]              string
            ["html"]            string
            ["author_name"]     string
            ["author_image"]    string
            ["author_url"]      string
            ["likes"]           int
            ["date"]            string
    */


    function transform_comment($comment)
    {
        return [
            "id" => $comment["id"],
            "html" => $comment["snippet"]["textDisplay"],
            "author_name" => $comment["snippet"]["authorDisplayName"],
            "author_image" => $comment["snippet"]["authorProfileImageUrl"],
            "author_url" => $comment["snippet"]["authorChannelUrl"],
            "likes_count" => $comment["snippet"]["likeCount"],
            "date" => $comment["snippet"]["publishedAt"],
        ];
    }

    function fetch_comments_from_yt($video_id)
    {
        global $api_key;

        $comments = [];
        $base_url = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId='.$video_id.'&textFormat=html&maxResults=100&key='.$api_key;
        $url = $base_url;

        try
        {
            do
            {
                $raw_data = json_decode(file_get_contents($url), true);

                if (!isset($raw_data["items"]))
                    break;

                foreach ($raw_data["items"] as $value)
                {
                    $comment = transform_comment($value["snippet"]["topLevelComment"]);
                    $repl_count = intval($value["snippet"]["totalReplyCount"]);
                    $replies = [];

                    if ($repl_count > 0)
                        foreach ($value["replies"]["comments"] as $value2)
                        {
                            $reply = transform_comment($value2);

                            array_push($replies, $reply);
                        }

                    $comment["reply_count"] = $repl_count;
                    $comment["replies"] = $replies;

                    array_push($comments, $comment);
                }

                if (!isset($raw_data["nextPageToken"]))
                    break;

                $url = $base_url.'&pageToken='.$raw_data["nextPageToken"];
            }
            while (count($comments) < MAX_COMMENT_COUNT);
        }
        catch (Exception $e)
        {
            echo 'Caught exception: '.$e->getMessage()."\n";
        }

        return $comments;
    }

    function get_cache_path($key, $part)
    {
        return COMMENTS_DIR.'/comments-'.$key.$part.'.json';
    }

    function get_comments($key, $part)
    {
        global $metadata;

        $now = time();
        $path = get_cache_path($key, $part);
        $json = file_exists($path) ? file_get_contents($path) : '{"created":0,"comments":[]}';
        $existing = json_decode($json, true);

        if ($existing["created"] < $now - UPDATE_INTERVAL_SECONDS)
        {
            $ex_comments = $existing["comments"];
            $comments = [];

            foreach ($metadata[$key]["parts"][$part]["youtube-ids"] as $id)
            {
                $fetched = fetch_comments_from_yt($id);
                $comments = array_merge($comments, $fetched);
            }

            foreach ($comments as $comment)
            {
                $found = false;

                foreach ($ex_comments as $index => $value)
                    if ($value["id"] == $comment["id"])
                    {
                        $ex_comments[$index] = $comment;
                        $found = true;

                        break;
                    }

                if (!$found)
                    array_push($ex_comments, $comment);
            }

            $existing["created"] = $now;
            $existing["comment_count"] = count($ex_comments);
            $existing["comments"] = $ex_comments;
            $json = json_encode($existing, JSON_PRETTY_PRINT);

            $file_hnd = fopen($path, 'w+');
            $attempt = MAX_WRITE_ATTEMPTS;

            do
            {
                if (flock($file_hnd, LOCK_EX))
                {
                    fwrite($file_hnd, $json);
                    flock($file_hnd, LOCK_UN);

                    break;
                }
                else
                    sleep(1);
            }
            while ($attempt-- > 0);

            fclose($file_hnd);
        }

        return $json;
    }
?>
