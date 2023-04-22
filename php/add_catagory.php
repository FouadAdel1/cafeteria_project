<?php

require './dbclasses.php';
$db = new DB($con);
$catagoryName='';

$result=$db->validatecatagoryName($catagoryName);

if($result==false){
    setcookie('errors', json_encode(['catagory' => 'catagory is arredy exist']),0,'/');
    header("location:../add_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
    
    $results= $db->addCategory($catagoryName);

 if(!$results){
      echo json_encode(['status' => 'product alerday exists']);
      header("location:../list_products.html");
      exit();
    } 
    echo json_encode(['status' => 'added successfully']);
    exit();

}
























$result=$db->validatproductName($productNAme);
if($result==false){
    setcookie('errors', json_encode(['product' => 'product is arredy exist']));
    header("location:../add_product.html");
    exit();
} else {
    setcookie('errors', "", time() - 60);
    
    $results= $db->addProduct($productNAme,$productPrice,$categoryPic,$categoryId );

 if(!$results){
      echo json_encode(['status' => 'product alerday exists']);
      header("location:../list_products.html");
      exit();
    } 
    echo json_encode(['status' => 'added successfully']);
    exit();

}
