<?php 
require './dbclasses.php';
$db = new DB($con);
$to=json_decode(file_get_contents("php://input"),true)['to'];
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->getUserOrderTo('total_order', 'users', $to, ($index-1)*2);
echo json_encode($data);