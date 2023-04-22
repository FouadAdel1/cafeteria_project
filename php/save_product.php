<?php

require './dbclasses.php';
$db = new DB($con);
// $productNAme =$productPrice=$categoryId= $categoryPic =null;

$productNAme =$_REQUEST['name'];
$productPrice=$_REQUEST['price'];
$categoryId  =$_REQUEST['category'];
$categoryPic  =$_FILES['image'];

$errors = [];
foreach ($_REQUEST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
    }
}
if (!empty($errors)) {
    setcookie("errors", json_encode($errors),0,'/');
    header("location:../add_product.html");
    exit();
} else {
    

setcookie('errors','', -1, '/');
   
}


$imgSize = $categoryPic['size'];
if ($imgSize > 2000000) {
    setcookie('errors', json_encode(['image' => 'size of image bigger than 2MG']),0,'/');
    header("location:../add_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}

$allowed_image_extension = array('png', 'jpg', 'jpeg');
$imgExtension = explode('/', $categoryPic['type'])[1];
if (!in_array($imgExtension, $allowed_image_extension)) {
    setcookie("errors", json_encode(['image' => 'extension image is not valid']),0,'/');
    header("location:../add_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}
 $categoryPic=$_FILES['image'];
$file_path = $categoryPic['tmp_name'];
$categoryPic = '../images/products/' . time() . '.' . explode('/', mime_content_type($file_path))[1];
move_uploaded_file($file_path, $categoryPic);
$productPic=time() . '.' . $imgExtension;




$result=$db->validatproductName($productNAme);
if($result==false){
    setcookie('errors', json_encode(['product' => 'product is arredy exist']),0,'/');
    header("location:../add_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
    
    $results= $db->addProduct($productNAme,$productPrice,$productPic,$categoryId );

 if(!$results){
      echo json_encode(['status' => 'product alerday exists']);
      header("location:../all_product.html");
      exit();
    } 
    echo json_encode(['status' => 'added successfully']);
    exit();

}






