<?php

require './dbclasses.php';
// var_dump(file_get_contents("php://input"),true);
$index=json_decode(file_get_contents("php://input"),true);
$user_id=$index['user_id'];
$notes=$index['notes'];
$room_number=$index['room_number'];
$orderArrlength=$index['orderArrlength'];
$orderArr=$index['orderArr'];

// echo $orderArrlength;

$db = new DB($con);
$data = $db->submitOrder($orderArr,$user_id,$room_number,$notes,$orderArrlength);
// echo json_encode($data);
