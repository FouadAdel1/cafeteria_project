<?php
require './dbclasses.php';
$db = new DB($con);
$user_id=json_decode(file_get_contents("php://input"),true)['user_id'];
$data = $db->showUserOrder('total_order', $user_id);
echo json_encode($data);