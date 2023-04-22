<?php
session_start();
require './dbclasses.php';
$index=json_decode(file_get_contents("php://input"),true);
$user_id=$_SESSION['user_id'];
$notes=$index['notes'];
$room_number=$index['room_number'];
$orderArrlength=$index['orderArrlength'];
$orderArr=$index['orderArr'];


$db = new DB($con);
$data = $db->submitOrder($orderArr,$user_id,$room_number,$notes,$orderArrlength);
