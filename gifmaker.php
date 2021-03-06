<?php
    $start = $_GET["start"];
    $length = max(min((int)$_GET["length"], 15), 1);
    $baseid = $_GET["baseid"];
    $part = max(min((int)$_GET["part"], 14), 1);
    $resolution = max(min((int)$_GET["resolution"], 560), 144);
    $fps = 15; // (int)$_GET["fps"];

    if (preg_match('/^hp\w+$/', $baseid) &&
        preg_match('/^\d+$/', $part) &&
        preg_match('/^(\d*:)*\d+(\.\d*)?$/', $start) &&
        preg_match('/^(\d*:)*\d+(\.\d*)?$/', $length) &&
        preg_match('/^\d+$/', $resolution) &&
        preg_match('/^\d+$/', $fps))
    {
        $hcaptcha_secret = trim(file("hcaptcha-keys.txt")[1]);
        $data = array(
            'secret' => $hcaptcha_secret,
            'response' => $_GET['h-captcha-response']
        );
        $verify = curl_init();

        curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
        curl_setopt($verify, CURLOPT_POST, true);
        curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($verify);
        $responseData = json_decode($response);

        if ($responseData->success)
        {
            $output = '.'.uniqid(true).'.gif';
            $command = 'python3.9 ./gif-creator/gif-creator.py -p '.$part.' -s "'.$start.'" -d "'.$length.'" -r '.$resolution.' -f '.$fps.' "'.$baseid.'" "'.$output.'"';

            exec($command);

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
    }

    http_response_code(400);
?>