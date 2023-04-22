<?php 
require './dbclasses.php';
$db = new DB($con);
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->getUserTotalPriceIndex('users','total_order',($index-1)*2);
echo json_encode($data);