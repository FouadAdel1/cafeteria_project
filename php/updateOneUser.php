<?php
require("./dbclasses.php");
$db=new DB($con);
$id=$_REQUEST["id"];
$email=$_REQUEST["email"];
$name=$_REQUEST["name"];
$room=$_REQUEST["room"];
$img=$_FILES["userImg"];

$errors = [];
foreach ($_REQUEST as $key => $value) {
    if (empty($value)) {
        $errors[$key] = "$key is required";
         header("location:../all_users.html");
    }
}
if (!empty($errors)) {
    setcookie("errors", json_encode($errors),0,'/');
    // header("location:../all_users.html");
    exit();
} else {
    
setcookie('errors','', -1, '/');
   
}


$imgSize = $img['size'];
if ($imgSize > 2000000) {
    setcookie('errors', json_encode(['image' => 'size of image bigger than 2MG']),0,'/');
    header("location:../all_users.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}

$allowed_image_extension = array('png', 'jpg', 'jpeg');
$imgExtension = explode('/', $img['type'])[1];
if (!in_array($imgExtension, $allowed_image_extension)) {
    setcookie("errors", json_encode(['image' => 'extension image is not valid']),0,'/');
    header("location:../all_users.html");
    exit();
} else {
    setcookie('errors','', -1, '/');
}
 $img=$_FILES['userImg'];
$file_path = $img['tmp_name'];
$img = '../images/users/' . time() . '.' . explode('/', mime_content_type($file_path))[1];
move_uploaded_file($file_path, $img);

$userpicuplode= time() . '.' . $imgExtension;

$dataRoom= $db->validateUserRoom($room);
$dataEmail= $db->validateUserEmail($email);
if($dataRoom && $dataEmail){
  $data = $db->updateUserExceptEmailRoom('users',$id,$name,$userpicuplode);    
  header("Location: ../all_users.html");
} else if($dataEmail){
  $data = $db->updateUserExceptEmail('users','user_room',$id,$name,$room,$userpicuplode);
  header("Location: ../all_users.html");
} else if($dataRoom){
  $data = $db->updateUserExceptRoom('users',$id,$name,$email,$userpicuplode);
  header("Location: ../all_users.html");
} else{ 
  $data = $db->updateUser('users','user_room',$id,$name,$email,$room,$userpicuplode);
  header("Location: ../all_users.html");
}
