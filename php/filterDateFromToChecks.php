<?php 
require './dbclasses.php';
$db = new DB($con);
$from=json_decode(file_get_contents("php://input"),true)['from'];
$to=json_decode(file_get_contents("php://input"),true)['to'];
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->getUserOrderFromTo('total_order', 'users', $from, $to, ($index-1)*2);
echo json_encode($data);