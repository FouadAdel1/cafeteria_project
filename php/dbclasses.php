<?php
require 'DataBaseConection.php';

class DB
{
    protected $con;
    public function __construct($con)
    {
        $this->con = $con;
    }

    // get all users
    public function index($tableName)
    {
        try {
            $query = "SELECT * FROM $tableName";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    public function index1($tableName)
    {
        try {
            $query = "SELECT * FROM $tableName where is_admin = 0";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    // get users room 
    public function usersroom($tableName1, $tableName2, $index)
    {
        try {
            // $query = "SELECT * FROM $tableName1 INNER JOIN $tableName2 on $tableName1.id =$tableName2.user_id LIMIT $index,4";
            $query = "SELECT $tableName2.*, $tableName1.*   FROM $tableName1, $tableName2 where $tableName1.id = $tableName2.user_id LIMIT $index,4";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }


    // get single user by id
    public function show($tableName, $id)
    {
        try {
            $query = "SELECT * FROM $tableName where id = $id";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetch(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        $query = "SELECT * FROM $tableName where id = $id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);

        return $data;
    }




    public function update($tableName, $id, $data)
    {
        $columns = '';
        foreach ($data as $key => $value) {
            $columns = $columns . $key . "=" . "'" . $value . "'" . ",";
        }
        $columns = rtrim($columns, ",");
        $query = "UPDATE $tableName SET $columns WHERE id=$id";
        $sql = $this->con->prepare($query);
        $sql->execute();
    }
    // update user
    public function updateUser($tableName, $tableRoom, $id, $name, $email, $room, $img)
    {
        try {
            $query = "UPDATE $tableName SET name='$name', email='$email',profile_pic='$img' WHERE id=$id";
            $queryRoom = "UPDATE $tableRoom SET Room_number = $room WHERE user_id=$id";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $sql2 = $this->con->prepare($queryRoom);
            $sql2->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function updateUserExceptRoom($tableName, $id, $name, $email, $img)
    {
        try {
            $query = "UPDATE $tableName SET name='$name', email='$email',profile_pic='$img' WHERE id=$id";
            // $queryRoom="UPDATE $tableRoom SET Room_number = $room WHERE user_id=$id";
            $sql = $this->con->prepare($query);
            $sql->execute();
            // $sql2=$this->con->prepare($queryRoom);
            // $sql2->execute();   
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function updateUserExceptEmail($tableName, $tableRoom, $id, $name, $room, $img)
    {
        try {
            $query = "UPDATE $tableName SET name='$name', profile_pic='$img' WHERE id=$id";
            $queryRoom = "UPDATE $tableRoom SET Room_number = $room WHERE user_id=$id";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $sql2 = $this->con->prepare($queryRoom);
            $sql2->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function updateUserExceptEmailRoom($tableName, $id, $name, $img)
    {
        try {
            $query = "UPDATE $tableName SET name='$name', profile_pic='$img' WHERE id=$id";
            $sql = $this->con->prepare($query);
            $sql->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // create user
    public function store($tableName, $data)
    {
        try {
            $query = "INSERT INTO " . $tableName . " (";
            $query .= implode(",", array_keys($data)) . ') VALUES (';
            $query .= "'" . implode("','", array_values($data)) . "')";
            $query = rtrim($query, "'");
            $sql = $this->con->prepare($query);
            $sql->execute();
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    // delete user
    public function delete($tableName, $id)
    {
        $query = "DELETE FROM $tableName where id = $id";
        $sql = $this->con->prepare($query);
        $sql->execute();
    }

    //get all products
    public function lisProducts($tableName)
    {
        $query = "SELECT * FROM $tableName ";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function allProducts($index)
    {
        $query = "SELECT * FROM product limit $index,4";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function getOneProduct($tableName, $productName)

    {
        $query = "SELECT * FROM $tableName where name = '$productName'";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    public function validatproductName($productName)
    {

        $result = $this->getOneProduct('product', $productName);
        if (gettype($result) == 'array') {
            return false;
        }

        return true;
    }

    public function deleteProduct($id)
    {

        $query = "UPDATE product set status ='Not available' where id ='$id'";
        $sql = $this->con->prepare($query);
        $result = $sql->execute();
        return $result;
    }
    //to do
    public function udateproductData($id, $name, $price, $pic, $status, $categoryId)
    {


        $query = "UPDATE product SET name='$name',price=$price,product_pic='$pic',status='$status',category_id=$categoryId
         WHERE id=$id";
        $sql = $this->con->prepare($query);
        $r = $sql->execute();
    }
    public function updateProuductEpxeptName($id, $price, $pic, $status, $categoryId)
    {

        $query = "UPDATE product SET price=$price,product_pic='$pic',status='$status',category_id=$categoryId
        WHERE id=$id";
        $sql = $this->con->prepare($query);
        $r = $sql->execute();
    }



    public function addProduct($name, $price, $pic, $cat_id)
    {
        $query = "INSERT INTO product (name ,price,product_pic,category_id) VALUES('$name',$price,'$pic',$cat_id)";
        $sql = $this->con->prepare($query);
        $sql->execute();
    }

    public function getproductId($productName)
    {
        $query = "SELECT id FROM product where name = '$productName'";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    // catagory validate

    public function getOneCatagory($catagoryName)
    {
        $query = "SELECT * FROM category where name = '$catagoryName'";
    }

    // get user id
    public function getUserId($tableName, $email)
    {
        $query = "SELECT id from $tableName where email='$email'";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        return $data;
    }
    //get user admin or user 
    public function checkUser($tableName, $email)
    {
        $query = "SELECT is_admin from $tableName where email='$email'";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);

        return $data;
    }


    // get user password
    public function getUserpw($tableName, $email)
    {
        $query = "SELECT password from $tableName where email='$email'";

        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    public function validatecatagoryName($catagoryName)
    {

        $result = $this->getOneCatagory($catagoryName);
        if (gettype($result) == 'array') {
            return false;
        }

        return true;
    }


    public function addCategory($catagoryName)
    {
        $query = "INSERT INTO category(name)VALUES('$catagoryName')";
        $sql = $this->con->prepare($query);
        $sql->execute();
        return true;
    }


    // $oldName=$db->getOneProduct('product','t');
    // var_dump($oldName);
    // $db->addProduct('tea',33,'',3);
    // $db->udateproductDAta('t',2,'',2);
    //$db->lisProducts('product');
    // $db->index('users');

    //get users from total_orders
    public function users_name($tableName1, $tableName2)
    {
        $query = "SELECT name FROM $tableName1,$tableName2 WHERE $tableName1.id=$tableName2.user_id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetch(PDO::FETCH_ASSOC);
        return $data;
    }



    // get products for home page
    public function getProducts($tableName)
    {
        try {
            $query = "SELECT product.name,price,product_pic,product.id FROM `product` , `category` WHERE product.category_id=category.id AND product.status='Available' ORDER BY category_id;";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
            // $sql2=$this->con->prepare($queryRoom);
            // $sql2->execute();   
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    // validate form
    public function validateUser($id, $email, $room)
    {
        try {
            // SELECT * FROM $tableName1 INNER JOIN $tableName2 on $tableName1.id =$tableName2.user_id
            $query = "SELECT email,Room_number FROM users INNER JOIN user_room on  email='$email' and Room_number =$room ";
            // $query="SELECT email, Room_number from users , user_room where users.id = user_room.user_id and   email = '$email' and Room_number = $room";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function validateUserRoom($room)
    {
        try {
            $query = "SELECT Room_number FROM user_room where Room_number =$room";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($data);    
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function validateUserEmail($email)
    {
        try {
            // SELECT * FROM $tableName1 INNER JOIN $tableName2 on $tableName1.id =$tableName2.user_id
            $query = "SELECT email FROM users where  email='$email'";
            // $query="SELECT email, Room_number from users , user_room where users.id = user_room.user_id and   email = '$email' and Room_number = $room";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }


    //search in home page
    public function paginationSearch($tableName, $word)
    {
        try {
            $query = "SELECT name,price,product_pic FROM `product` where name like '%$word%';";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    //get latest order
    public function getLatestOrder($id)
    {
        try {
            $query = "SELECT * FROM product where id=any(
                SELECT product_id FROM order_product where order_id=(
                SELECT id FROM total_order where user_id=$id ORDER BY created_at DESC LIMIT 1));;";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }



    public function submitOrder($orderArr, $user_id, $room_number, $notes, $orderArrlength)
    {

        try {
            $q = json_encode($orderArr);

            $query = "call test('$q',$user_id,$room_number,'$notes',$orderArrlength)";
            $sql = $this->con->query($query);
            $result = $sql->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }



    // checks
    // get users who made orders and done
    public function getUserOrder($tableOrder, $tableUsers)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.* FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done'";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get single user and total amount of price
    public function getSingleUserTotalPrice($tableUsers, $tableOrder, $user_id)
    {
        try {
            $query = "SELECT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $user_id AND user_id = users.id AND status = 'Done' GROUP BY(user_id) ORDER BY $tableOrder.created_at";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetch(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getUserTotalPrice($tableUsers, $tableOrder)
    {
        try {
            $query = "SELECT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = users.id AND status = 'Done' GROUP BY(user_id)";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // pagintation 
    public function getUserTotalPriceIndex($tableUsers, $tableOrder, $index)
    {
        try {
            $query = "SELECT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' GROUP BY(user_id) LIMIT $index,2";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get users who made orders and done from to
    public function getUserOrderFrom($tableOrder, $tableUsers, $from, $index)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND DATE(now()) GROUP BY(user_id) LIMIT $index,2";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get users who made orders and done from to
    public function getUserOrderFromToAll($tableOrder, $tableUsers, $from, $to)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND '$to' GROUP BY(user_id)";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get users who made orders and done from to
    public function getUserOrderFromAll($tableOrder, $tableUsers, $from)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND DATE(now()) GROUP BY(user_id)";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getUserOrderFromTo($tableOrder, $tableUsers, $from, $to, $index)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND '$to' GROUP BY(user_id) LIMIT $index,2";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get users who made orders and done from to
    public function getUserOrderToAll($tableOrder, $tableUsers, $to)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) <= '$to' GROUP BY(user_id)";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getUserOrderTo($tableOrder, $tableUsers, $to, $index)
    {
        try {
            $query = "SELECT DISTINCT $tableUsers.*, sum(total_price) as total_price FROM $tableOrder, $tableUsers WHERE user_id = $tableUsers.id AND status = 'Done' AND DATE($tableOrder.created_at) <= '$to' GROUP BY(user_id) LIMIT $index,2";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get single user by order by user_id
    public function showUserOrder($tableName, $id)
    {
        try {
            $query = "SELECT * FROM $tableName where user_id = $id and status = 'Done' ORDER BY created_at desc";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get single user orders by user_id and done from to
    public function getOrderFromToAll($tableOrder, $from, $to, $id)
    {
        try {
            $query = "SELECT DISTINCT $tableOrder.* FROM $tableOrder WHERE user_id = $id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND '$to' ORDER BY created_at desc";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get single user orders by user_id and done from
    public function getOrderFromAll($tableOrder, $from, $id)
    {
        try {
            $query = "SELECT DISTINCT $tableOrder.* FROM $tableOrder WHERE user_id = $id AND status = 'Done' AND DATE($tableOrder.created_at) BETWEEN '$from' AND DATE(now()) ORDER BY created_at desc";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get single user orders by user_id and done to
    public function getOrderToAll($tableOrder, $to, $id)
    {
        try {
            $query = "SELECT DISTINCT $tableOrder.* FROM $tableOrder WHERE user_id = $id AND status = 'Done' AND DATE($tableOrder.created_at) <= '$to' ORDER BY created_at";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get details of a order for user
    public function showOrderDetails($productOrderTable, $orderTable, $id)
    {
        try {
            $query = "SELECT DISTINCT $productOrderTable.* FROM $productOrderTable, $orderTable where $productOrderTable.order_id = $id and $orderTable.status = 'Done'";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // get product details of a order for user
    public function showOrderProduct($productTable, $id)
    {
        try {
            $query = "SELECT DISTINCT * FROM $productTable where id = $id";
            $sql = $this->con->prepare($query);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    // orders page
    //get users from total_orders
    public function users_data($tableName1, $tableName2, $tableName3)
    {
        $query = "SELECT $tableName1.id, $tableName1.status, $tableName1.total_price, $tableName1.created_at, $tableName2.name, $tableName3.Room_number FROM $tableName1, $tableName2, $tableName3 
        WHERE $tableName1.user_id = $tableName2.id and $tableName1.user_id = $tableName3.user_id and ($tableName1.status = 'Processing' OR $tableName1.status = 'Out for delivery')";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
    public function room_number($tableName1, $tableName2)
    {

        $query = "SELECT Room_number FROM $tableName1,$tableName2 WHERE $tableName1.user_id=$tableName2.user_id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
    // public function room_number($tableName1,$tableName2)
    // {

    //     $query = "SELECT Room_number FROM $tableName1,$tableName2 WHERE $tableName1.user_id=$tableName2.user_id";
    //     $sql = $this->con->prepare($query);
    //     $sql->execute();
    //     $data = $sql->fetch(PDO::FETCH_ASSOC);
    //     return $data;
    // }
    public function DataOfOrder($order_id)
    {
        $query = "SELECT product.name,order_product.quantity,product.price,product.product_pic,(product.price*order_product.quantity) as total_Order 
         FROM total_order,product,order_product
            WHERE total_order.id=order_product.order_id
        and order_product.product_id=product.id 
        AND total_order.id=$order_id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
    public function update_status($status, $order_id)
    {
        $query = "UPDATE `total_order` SET `status` = '$status' WHERE `id` = $order_id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
    public function select_status($order_id)
    {
        $query = "SELECT status FROM total_order WHERE id=$order_id";
        $sql = $this->con->prepare($query);
        $sql->execute();
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}


$db = new DB($con);
// $db->getUserOrderToAll('total_order', 'users', '2023-01-15'); 
//$id=$db->index('users');
// $db->show('users',1);
// $db->store('users' , ['name'=>'ahmed','email'=>'ahmed@gmail.com', 'password'=>'12345678', 'profile_pic'=>'./images/0.12204800 1672674506.jpeg']);
// $db->store('users' , ['name'=>'ali','email'=>'ali@gmail.com', 'password'=>'12345678', 'profile_pic'=>'./images/0.12204800 1672674506.jpeg']);
// $db->store('users' , ['name'=>'alaa','email'=>'alaa@gmail.com', 'password'=>'12345678', 'profile_pic'=>'./images/0.12204800 1672674506.jpeg']);
// $db->store('users' , ['name'=>'toka','email'=>'toka@gmail.com', 'password'=>'12345678', 'profile_pic'=>'./images/0.12204800 1672674506.jpeg']);
// $db->update('users',1,['name'=>'kareem','email' => 'karem234@gmail.com']);
// $db->delete('users',3);
// $db->store('product' , ['name'=>'tea','category_id'=>'1', 'price'=>'5', 'product_pic'=>'./images/0.12204800 1672674506.jpeg','status'=>'Available']);
//$id = $db->getUserId('users', 'ali@gmail.com');
//print_r($id);
//$is_admin=$db->checkUser("users","ahmed@gmail.com");
//print_r($is_admin);
// $user_name='ffff';
// $user_email='fff@gmail.com';
// $user_password ='123456';
 
// $res=$db->store('users',['name' => "$user_name", 'email' => "$user_email", 'password' => "$user_password"]);
// $data=$db->users_name('users','total_order');
// print_r($data);
// $data=$db->room_number('total_order','user_room');
// print_r($data);
