<?php
    require_once "hcaptcha.php";

    $start = $_GET["start"];
    $length = max(min((int)$_GET["length"], 15), 1);
    $baseid = $_GET["baseid"];
    $part = max(min((int)$_GET["part"], 14), 1);
    $resolution = max(min((int)$_GET["resolution"], 560), 144);
    $fps = 15; // (int)$_GET["fps"];

    $data = array(
        'secret' => hCaptcha::SECRET,
        'response' => $_GET['h-captcha-response']
    );
    $verify = curl_init();

    curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
    curl_setopt($verify, CURLOPT_POST, true);
    curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($verify);
    $responseData = json_decode($response);

    if($responseData->success)
    {
        $output = './gif-creator/.'.uniqid(true).'.gif';
        $res = exec('python ./gif-creator/gif-creator.py "'.$baseid.'" -p '.$part.' -s '.$start.' -d '.$length.' -r '.$resolution.' -f '.$fps.' "'.$output.'"');

        if (file_exists($output))
        {
            http_response_code(200);
            header('Content-type: text/plain');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            // header('Content-Length: '.filesize($output));

            $data = file_get_contents($output);
            $base64 = 'data:image/gif;base64,'.base64_encode($data);

            unlink($output);
            echo($base64);

            exit;
        }
    }

    http_response_code(400);
?>