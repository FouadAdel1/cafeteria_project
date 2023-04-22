<?php
require './dbclasses.php';
$db = new DB($con);
$data = $db->index1('users');
echo json_encode($data);


