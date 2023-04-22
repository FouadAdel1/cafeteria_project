<?php
require('./php/dbclasses.php');
session_start();
$db = new DB($con);
// // ****************************validation for valid password **********************************************
$password = $_REQUEST['password'];
if (!preg_match('/^[0-9]{4,8}$/', $password)) {
    setcookie('errors', json_encode(['password' => 'password is not valid']));
    header("location:updatePwd.html");
    exit();
} else {
    setcookie('errors', '', time() - 60);
}
// // ********************** validation for confirm password *******************************************
$conpassword = $_REQUEST['conpassword'];
if (!($password === $conpassword)) {
    setcookie('errors', json_encode(['conpassword' => "password is not match"]));
    header("location:updatePwd.html");
    exit();
} else {
    setcookie('errors', '', time() - 60);
}
// // ****************************update data  for this user **********************************************
$id = $_SESSION["user_id"];
$db->update('users', "$id", ['password' => "$password"]);
// **************************** check if user or admin and redirect to his page *********************
$email = $_SESSION["user_email"];
$is_admin = $db->checkUser('users', "$email")['is_admin'];
if ($is_admin) {
    header("location:admin.html");
} else {
    header("location:index.html");
}
