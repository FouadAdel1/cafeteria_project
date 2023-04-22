<?php 
require './dbclasses.php';
$db = new DB($con);
$order_id=json_decode(file_get_contents("php://input"),true)['order_id'];
$data = $db->showOrderDetails('order_product', 'total_order', $order_id);
echo json_encode($data);