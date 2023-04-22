<?php 
require './dbclasses.php';
$db = new DB($con);
$from=json_decode(file_get_contents("php://input"),true)['from'];
$to=json_decode(file_get_contents("php://input"),true)['to'];
$data = $db->getUserOrderFromToAll('total_order', 'users', $from, $to);
echo json_encode($data);