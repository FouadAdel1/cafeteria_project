<?php
require "dbclasses.php";
$db=new DB($con);
$data=$db->index("user_room");
echo json_encode($data);