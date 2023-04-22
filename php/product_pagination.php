<?php
require './dbclasses.php';
$db = new DB($con);
$index=json_decode(file_get_contents("php://input"),true)['index'];
$allProductIndex = $db->allProducts(($index-1)*4);
echo json_encode($allProductIndex) ;




