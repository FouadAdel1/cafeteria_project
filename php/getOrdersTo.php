<?php
require './dbclasses.php';
$db = new DB($con);
$user_id = json_decode(file_get_contents("php://input"), true)['user_id'];
$to = json_decode(file_get_contents("php://input"), true)['to'];
$data = $db->getOrderToAll('total_order', $to, $user_id);
echo json_encode($data);
