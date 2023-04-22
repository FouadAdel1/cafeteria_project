<?php
require "dbclasses.php";

$data= file_get_contents('php://input');
$data=json_decode($data,true);

$obj=new DB($con);
$ob=$obj->paginationSearch("product",$data['words']);
echo json_encode($ob);








