<?php
require './dbclasses.php';
$db = new DB($con);
$user_id = json_decode(file_get_contents("php://input"), true)['user_id'];
$from = json_decode(file_get_contents("php://input"), true)['from'];
$data = $db->getOrderFromAll('total_order', $from, $user_id);
echo json_encode($data);
