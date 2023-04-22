<?php
require("./php/dbclasses.php");
$db = new DB($con);

session_start();

$email = $_REQUEST['email'];
$password = $_REQUEST['password'];

//**************************validation for  access email***************************/
$id = $db->getUserId('users', $email);
$id = $id['id'];

if (!$id) {
    setcookie('error', json_encode(['email' => "email is not valid"]));
    header('location:login.html');
    exit();
} else {
    setcookie('error', '', time() - 60);
}
//******************************validation for password *******************************/
$exist_password = $db->getUserpw('users', $email)['password'];
echo $exist_password;
if ($password !== $exist_password) {
    setcookie('error', json_encode(['password' => "Error"]));
    header("location:login.html");
    exit();
} else {
    setcookie("error", "", time() - 60);
}
//******************************************validation for (user or admin)  */

$is_admin = $db->checkUser('users', "$email")['is_admin'];
$user_id = $db->getUserId('users', "$email")['id'];

if ($is_admin) {
    $_SESSION['user_id'] = $user_id;
    header("location:adminHome.html");
} else {
    $_SESSION['user_id'] = $id;
    header("location:userHome.html");
}
