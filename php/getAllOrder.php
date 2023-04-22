<?php
$sql='mysql:host=localhost;dbname=cafeteria';
$con= new PDO($sql,'root','');
$result =file_get_contents('php://input');
$result=json_decode($result);
$id=$result->id;


$query="SELECT order_product.order_id, product.product_pic, product.price, product.name
FROM order_product
JOIN product ON order_product.product_id = product.id
WHERE order_product.order_id =$id  ";

$sql_query=$con->prepare($query);

$result=$sql_query->execute();

if($result){
    $total_Order=$sql_query->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($total_Order);
}








