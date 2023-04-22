<?php
require './dbclasses.php';
$db = new DB($con);
$user_id = json_decode(file_get_contents("php://input"), true)['user_id'];
$from = json_decode(file_get_contents("php://input"), true)['from'];
$to = json_decode(file_get_contents("php://input"), true)['to'];
$data = $db->getOrderFromToAll('total_order', $from, $to, $user_id);
echo json_encode($data);
