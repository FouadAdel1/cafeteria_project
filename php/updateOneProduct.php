<?php
require("./dbclasses.php");
$db=new DB($con);
$productName=$_REQUEST['name'];
$productprice=$_REQUEST['price'];
$productStatus=$_REQUEST['status'];
$productId=$_REQUEST['id'];
$catagoryId=$_REQUEST['category'];
$categoryPic=$_FILES['realImg'];



$errors = [];
foreach ($_REQUEST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
         header("location:../all_product.html");
    }
}
if (!empty($errors)) {
    setcookie("errors", json_encode($errors),0,'/');
    header("location:../all_product.html");
    exit();
} else {
    
setcookie('errors','', -1, '/');
   
}


$imgSize = $categoryPic['size'];
if ($imgSize > 2000000) {
    setcookie('errors', json_encode(['image' => 'size of image bigger than 2MG']),0,'/');
    header("location:../all_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}

$allowed_image_extension = array('png', 'jpg', 'jpeg');
$imgExtension = explode('/', $categoryPic['type'])[1];
if (!in_array($imgExtension, $allowed_image_extension)) {
    setcookie("errors", json_encode(['image' => 'extension image is not valid']),0,'/');
    header("location:../all_product.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}
 $categoryPic=$_FILES['realImg'];
$file_path = $categoryPic['tmp_name'];
$categoryPic = '../images/products/' . time() . '.' . explode('/', mime_content_type($file_path))[1];
move_uploaded_file($file_path, $categoryPic);


// $catagorypicuplode= time() . '.' . $imgExtension;


$result=$db->getOneProduct('product',$productName);

if($result){
    $db->updateProuductEpxeptName($productId,$productprice,$categoryPic,$productStatus,$catagoryId);
    setcookie("errors", json_encode(['errors'=>'data exist']),0,'/');
    header('Location:../all_product.html');

}else{
    
    $db->udateproductData($productId,$productName,$productprice,$categoryPic,$productStatus,$catagoryId);
    header('Location:../all_product.html');
    setcookie('errors','', -1, '/');
}

