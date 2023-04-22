<?php
  require './dbclasses.php';

  $data = file_get_contents('php://input');
  $data = json_decode($data, true);

  

  if(isset($data["productToDelete"])){
   
    $productId ="$data[productToDelete]";
    $db = new DB($con);
    $result=$db->deleteProduct($productId);
    // header('Location: list_product.php');
   
    if(!$result){
      echo json_encode(['status' => 'product is invalid']);
      exit();
    } 
    echo json_encode(['status' => 'deleted successfully']);
    exit();

}


  //data from abatchy server


  



  
