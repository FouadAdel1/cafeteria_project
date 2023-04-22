<?php
include('env.php');
try {
    $sql = DATABASE . ':host=' . DATABASE_host . ';dbname=' . DATABASE_name;
    $con = new PDO($sql, DATABASE_username, DATABASE_password);
} catch (PDOException $e) {
    echo 'connection error' . $e->getMessage();
}

