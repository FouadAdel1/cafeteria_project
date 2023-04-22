<?php
require './dbclasses.php';
$db = new DB($con);
$totalPrice = $db->getUserTotalPrice('users','total_order');
echo json_encode($totalPrice);