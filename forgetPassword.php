<?php
require("./php/dbclasses.php");
session_start();
$db = new DB($con);
//**********************validation for email in forget password */
$email = $_REQUEST['email'];
$id = $db->getUserId('users', $email);
$id = $id['id'];
echo $id;
if (!$id) {
    setcookie('error', json_encode(['email' => "Email is not valid"]));
    header('location:forget_password.html');
    exit();
} else {
    setcookie('error', '', time() - 60);
}
$_SESSION["user_email"] = $email;
$_SESSION["user_id"] = $id;
header("location:updatePwd.html");
