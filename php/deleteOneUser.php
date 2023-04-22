<?php
require './dbclasses.php';
$db = new DB($con);
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->delete('users',$index);
echo json_encode($data);