<?php
require("dbclasses.php");
$db = new DB($con);
$data=$db->users_data("total_order","users", 'user_room');
echo json_encode($data);
