<?php
require './dbclasses.php';
$db = new DB($con);
$index=json_decode(file_get_contents("php://input"),true)['index'];
$data = $db->usersroom('users','user_room',($index-1)*4);
echo json_encode($data);






