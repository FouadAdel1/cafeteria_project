<?php
require './dbclasses.php';
$db = new DB($con);
$catagoryName=$_REQUEST['catagory'];
$result=$db->validatecatagoryName($catagoryName);
if($result==false){
    setcookie('errors', json_encode(['catagory' => 'catagory is arredy exist']),0,'/');
    header("location:../add_product.html");
    exit();
} else {

    setcookie('errors','', -1, '/');
    $results= $db->addCategory($catagoryName);
    var_dump($results);

 if(!$results){
      echo json_encode(['status' => 'catagory alerday exists']);
      header("location:../add_product.html");
      exit();
    } 
    echo json_encode(['status' => 'added successfully']);
    header("location:../add_product.html");
    exit();

}
