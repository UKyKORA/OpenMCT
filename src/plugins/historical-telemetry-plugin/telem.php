<?php

$start = (int)$_GET['start'];
$end = (int)$_GET['end'];
$prop = (string)$_GET['type'];

$data = Array();
$dataIndex = 0;

$diff = $end-$start;
$chunk = $diff/50;

for ($x = $start; $x < $end; $x+=$chunk) {
    $data[$dataIndex]= Array("timestamp" => $x, "value"=>77, "id"=>$prop);
    $dataIndex=$dataIndex+1;
} 

header('Content-type: application/json');
echo json_encode( $data );

?>
