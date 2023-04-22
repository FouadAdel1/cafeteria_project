<?php 
require './dbclasses.php';
$db = new DB($con);
$from=json_decode(file_get_contents("php://input"),true)['from'];
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->getUserOrderFrom('total_order', 'users', $from, ($index-1)*2);
echo json_encode($data);