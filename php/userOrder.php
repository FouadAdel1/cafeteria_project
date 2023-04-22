<?php
$sql='mysql:host=localhost;dbname=cafeteria';
$con= new PDO($sql,'root','');
/////////////user Id from session//////////////
$user_Id=4;
$query='SELECT  status ,total_price,created_at,id  FROM total_order where user_id='.$user_Id.' ORDER BY created_at DESC';
$sql_query=$con->prepare($query);
$result=$sql_query->execute();
if($result){
    $total_Order=$sql_query->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($total_Order);
  
}
