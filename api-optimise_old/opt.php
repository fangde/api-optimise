<?php
/**
 * Created by PhpStorm.
 * User: Yang
 * Date: 25/01/2016
 * Time: 11:02
 */

include 'utilities.php';
include 'config.php';

$connection = db_connect(OPTIMISE_DB);
$optimise = $connection->selectCollection(OPTIMISE_TABLE);
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    parse_str($_SERVER['QUERY_STRING'], $rawqueryList);
    $mQuery = array();//mongoDB query list
    $RecordSet = [];
    foreach ($rawqueryList as $key => $value) {
        $mQuery[$key] = $value;
    }
//    var_dump($mQuery);
    $cursor = $optimise->find($mQuery);
    foreach ($cursor as $id => $valueRoot) {
//    var_dump($valueRoot);
        $recordItems = array();
        foreach ($valueRoot as $key => $value) {
//        var_dump($value);
            $recordItems[] = array('fieldName' => $key, 'value' => $value);
        }
        $RecordSet[] = array('RecordItems' => $recordItems);
    }
    $returnResult = array('RecordSet' => $RecordSet);
    $jsonReturn = json_encode($returnResult);
    echo isset($_GET['callback'])
        ? "{$_GET['callback']}($jsonReturn)"
        : $jsonReturn;

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = file_get_contents('php://input'); //get POST payload=
    $json = json_decode($data, true);
    if ($json == null) {
        echo "JSON ERROR";
        return;
    }
     if (isset($json['CurrentRecord']) && isset($json['NewRecord'])&&$_REQUEST["OID"]==2) {
        //updating document
        $CurrentRecord = $json['CurrentRecord'];
        $NewRecord = $json['NewRecord'];
        $mQuery = array();//mongoDB query list
        $updateArray = array();
        for ($i = 0; $i < count($CurrentRecord); $i++) {
            $subItem = $CurrentRecord[$i];
            if (isset($subItem) && isset($subItem['fieldName']) && isset(
                    $subItem['value'])
            ) {
                $fieldName = $subItem['fieldName'];
//                $value = strval($subItem['value']);
                $value = $subItem['value'];
                $mQuery[$fieldName] = $value;
            }
        }
        for ($i = 0; $i < count($NewRecord); $i++) {
            $subItem = $NewRecord[$i];
//                   var_dump($subItem);
            if (isset($subItem) && isset($subItem['fieldName']) && isset(
                    $subItem['value'])
            ) {
                $fieldName = $subItem['fieldName'];
                //$value = strval($subItem['value']);
                $value = $subItem['value'];
                $updateArray[$fieldName] = $value;
            }
        }
        if (count($mQuery) > 0 && count($updateArray) > 0) {
//            var_dump($mQuery);
//            var_dump($updateArray);
//            $cursor=$optimise->find($mQuery);
//            foreach ($cursor as $id => $valueRoot) {
//            var_dump($valueRoot);
//            }
            $result = $optimise->findAndModify($mQuery, array('$set' => $updateArray), array('_id'=>1),array('upsert' => false,'new'=>true));
        }
        echo "RECORD UPDATED";
    } else if (isset($json['RecordSet'])) {
        //inserting new document
        $RecordSet = $json['RecordSet'];
        for ($i = 0; $i < count($RecordSet); $i++) {
            if (isset($RecordSet[$i]['RecordItems'])) {
                $mongoItem = array();
                for ($j = 0; $j < count($RecordSet[$i]['RecordItems']); $j++) {
                    $subItem = $RecordSet[$i]['RecordItems'][$j];
//                   var_dump($subItem);
                    if (isset($subItem) && isset($subItem['fieldName']) && isset(
                            $subItem['value'])
                    ) {
                        $fieldName = $RecordSet[$i]['RecordItems'][$j]['fieldName'];
                        $value = $RecordSet[$i]['RecordItems'][$j]['value'];
                        $mongoItem[$fieldName] = $value;
                    }

                }
                if (count($mongoItem) > 0) {
                    $result = $optimise->insert($mongoItem);
//                    var_dump($result);
                }
            }
        }
        echo "RECORD(s) SUCCESSFULLY INSERTED";
        return;
    } else {
        echo "UNKNOWN METHOD";
    }
}else if($_SERVER['REQUEST_METHOD'] == "DELETE")
{
    $data = file_get_contents('php://input'); //get POST payload=
    $json = json_decode($data, true);
    if ($json == null) {
        echo "JSON ERROR";
        return;
    }
    if(isset($json['RecordItems'])&&count($json['RecordItems'])>0)
    {
        $RecordItems = $json['RecordItems'];
        $mQuery = array();//mongoDB query list
        for ($i = 0; $i < count($RecordItems); $i++) {
            $subItem = $RecordItems[$i];
            if (isset($subItem) && isset($subItem['fieldName']) && isset(
                    $subItem['value'])
            ) {
                $fieldName = $subItem['fieldName'];
//                $value = strval($subItem['value']);
                $value = $subItem['value'];
                $mQuery[$fieldName] = $value;
            }
        }
        if(count($mQuery)>0) {
            $optimise->remove($mQuery);
        }
        echo "RECORD DELETED";
    }else{
        echo "UNKNOWN METHOD";
    }

}

