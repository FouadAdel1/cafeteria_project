 <?php

    //*******************************validation back end for from ********************************************************************************/
    require('./php/dbclasses.php');
    $db = new DB($con);
    session_start();
    // // validation for request (form)
    // // ***********************validation on  all fields  must be required*********************************
    $errors = [];
    function set_cookie($errors = [])
    {
        foreach ($errors as $key => $value) {
            global $errors;
            $errors[$key] = $value;
        }
        print_r($errors);
    };
    //********************validation for empty input */ */
    foreach ($_REQUEST as $key => $value) {
        if (empty($value)) {
            $arr[$key] = "$key is Required";
        }
    }
    set_cookie($arr);
    // //  ************************validation for valid email ******************************************
    $email = $_REQUEST['email'];
    $id = $db->getUserId('users', $email)['id'];
    if (!isset($errors['email'])) {
        if (!preg_match('/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-z]{0,3}/', $email) || !empty($id)) {
            $arr = ['email' => 'Email in Not Valid '];
            set_cookie($arr);
        } else {
            setcookie('errors', "", time() - 60);
        }
    }

    // // ****************************validation for valid password **********************************************
    $password = $_REQUEST['password'];
    if (!preg_match('/^[0-9]{4,8}$/', $password)) {
        $arr = ['password' => 'Error'];
        set_cookie($arr);
    } else {
        setcookie('Errors', '', time() - 60);
    }
    // // // ********************** validation for confirm password *******************************************
    $conpassword = $_REQUEST['conpassword'];
    if (!isset($errors['conpassword'])) {
        if (!($password === $conpassword)) {
            $arr = ['conpassword' => "  Password is Not Match"];
            set_cookie($arr);
        } else {
            setcookie('errors', '', time() - 60);
        }
    }

    //  //  ***********************validation for room is empty or no  *******************************************
    $roomNum = $_REQUEST['roomNum'];
    $rooms = $db->index('user_room');
    foreach ($rooms as $key => $value) {
        $roomsFull[] = ($rooms[$key]['Room_number']);
    }
    if (in_array($roomNum, $roomsFull)) {
        $arr = ["roomNum" => 'The Room is Full'];
        set_cookie($arr);
    } else {
        setcookie('errors', '', time() - 60);
    }
    // //****************************** */ validation for files **************************************************************
    //**************************validation for extension of image ***************************************
    $img = $_FILES['image'];
    $allowed_image_extension = array('png', 'jpg', 'jpeg');
    $imgExtension = explode('/', $img['type'])[1];
    // print_r($imgExtension);
    if (!isset($arr["image"])) {
        if (!in_array($imgExtension, $allowed_image_extension)) {
            $arr = ['image' => 'Extension Image is Not Valid'];
            set_cookie($arr);
        } else {
            setcookie("errors", "", time() - 60);
        }
    }

    // // validation for size of image *********************************************
    $img = $_FILES['image'];
    $imgSize = $img['size'];
    if (!isset($errors['image'])) {
        if ($imgSize > 2000000) {
            $arr = ['image' => 'Size of Image Bigger Than 2MG'];
            set_cookie($arr);
        } else {
            setcookie('errors', "", time() - 60);
        }
    }



    //*******final send errors */

    if ($errors) {
        setcookie("errors", json_encode($errors));
        header("location:Register.html");
        exit();
    } else {
        setcookie("errors", "", time() - 60);
    }
    //******************************Insert Data to Data Base ***********************************/
    $user_name = $_REQUEST['username'];
    $user_email = $_REQUEST['email'];
    $user_password = $_REQUEST['password'];
    $user_room = $_REQUEST['roomNum'];
    $img = $_FILES['image'];
    $tmp_path = $img['tmp_name'];
    $imgExtension = explode('/', $img['type'])[1];
    $img_name = time() . '.' . $imgExtension;
    $img_path = "./images/users/" . $img_name;
    move_uploaded_file($tmp_path, $img_path);
    $res = $db->store('users', ['name' => "$user_name", 'email' => "$user_email", 'password' => "$user_password", 'profile_pic' => "$img_name"]);
    // echo $res;
    $user_id = $db->getUserId('users', "$user_email")['id'];
    // print_r($user_id);
    $res1 = $db->store('user_room', ['user_id' => "$user_id", 'room_number' => "$user_room"]);
    // //**************************send message for success full process */
    //massage for admin to confirm insert user
    // setcookie("success", "", time() - 60);
    // if ($res && $res1) {
    //     setcookie('success', json_encode(["success" => "Register is SuccessFully"]));
    //     header("location:Register.html");
    //     exit();
    // } else {
    //     setcookie("success", "", time() - 60);
    // }
    // for insert user 
    if ($res && $res1) {
        if(isset( $_SESSION['user_id'])){
            header("location:all_users.html");
        }else{
        $_SESSION['user_id'] = $user_id;
        header("location:userHome.html");
        }
        exit();
    }
