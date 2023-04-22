<?php 
require './dbclasses.php';
$db = new DB($con);
$to=json_decode(file_get_contents("php://input"),true)['to'];
$data = $db->getUserOrderToAll('total_order', 'users', $to);
echo json_encode($data);