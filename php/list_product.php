<?php
require './dbclasses.php';
$db = new DB($con);
$data=$db->lisProducts('product');
echo json_encode($data);


