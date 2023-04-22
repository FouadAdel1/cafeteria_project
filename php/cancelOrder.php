<?php
$sql='mysql:host=localhost;dbname=cafeteria';
$con= new PDO($sql,'root','');
// $result =file_get_contents('php://input');
// $result=json_decode($result);
// $id=$result;  
// print_r($result[0]['id']);  

$id=json_decode(file_get_contents('php://input'),true)['id'];

$query="DELETE FROM order_product WHERE order_id =$id;
DELETE FROM total_order WHERE id = $id ";
$sql_query=$con->prepare($query);

$result=$sql_query->execute();

if($result){
    $total_Order=$sql_query->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($total_Order);
}