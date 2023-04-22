<?php 
require './dbclasses.php';
$db = new DB($con);
$from=json_decode(file_get_contents("php://input"),true)['from'];
$data = $db->getUserOrderFromAll('total_order', 'users', $from);
echo json_encode($data);