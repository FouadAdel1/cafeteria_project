<?php
require './dbclasses.php';

$db = new DB($con);
$data=$db->index('category');
echo json_encode($data);


