<?php
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 07/11/2015
 * Time: 09:14
 */
$FolderPathPre="JR/OPT-JR-03-";
for ($i=1;$i<=161;$i++)
{
//    echo "GD/GD_".$i.".json"."<br>";
    $data = file_get_contents($FolderPathPre.$i.".json");
    postJsonData($data);
}


//echo $data;
function postJsonData($data)
{
    $url="http://www.optimise-ms.org/api-optimise/opt.php";
    $url = parse_url($url);
    $host = $url['host'];
    $path = $url['path'];
//$jsonData = '{"CurrentRecord":[{"fieldName":"USUBJID","value":"OPT001"},{"fieldName":"QSSEQ","value":0}],"NewRecord":[{"fieldName":"QSSTRESC","value":2}]}';
//    $jsonData=$data;
    $out = "";
    $url = $host;
//echo " JSON : $jsonData ";
    $fp = fsockopen($url, 80,$errno, $errstr, 30);
    $method="POST";
    if($fp) {
        if ($method == "GET") {
            $data = http_build_query($data);
            $out = "GET $path?$data HTTP/1.1\r\n";
        } else if ($method == "POST") {
//        $path=$path.'?'.$SERVER['QUERY_STRING'];
            $out = "POST $path HTTP/1.1\r\n";
        } else if ($method == "DELETE") {
//            $path=$path.'?'.$SERVER['QUERY_STRING'];
            $out = "DELETE $path HTTP/1.1\r\n";
        }

//$out.= "Host: ".$parts['host']."\r\n";
        $out .= "Host:$host\r\n";
        $out .= "Content-Type: application/json\r\n";
        $out .= "Content-Length: " . strlen($data) . "\r\n";
        $out .= "Connection: Close\r\n\r\n";
        $out .= $data;
        fwrite($fp, $out);
//        header('Content-type: application/json');

        $result = '';
        while (!feof($fp)) {
            // receive the results of the request
            $result .= fgets($fp, 128);
        }
    }else{
        echo "error:".$errstr ($errno);
    }
    fclose($fp);
    $result = explode("\r\n\r\n", $result, 2);

    $header = isset($result[0]) ? $result[0] : '';
    $content = isset($result[1]) ? $result[1] : '';

// return as structured array:
    var_dump(array(
        'status' => 'ok',
        'header' => $header,
        'content' => $content
    ));
}