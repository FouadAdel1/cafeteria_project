<?php

require "dbclasses.php";
$db=new DB($con);
$data=$db->getProducts("product");
echo json_encode($data);
