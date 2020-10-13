<?php
header('Access-Control-Allow-Origin: *'); 
include('../config.php');
include('../DB.php');

$db = new DB;
$sql = "INSERT INTO `note` (`id`, `title`, `content`, `insert_date`) VALUES (?,?,?,?)";
$db->pdo()->prepare($sql)->execute([null,$_POST['title'], $_POST['content'], date("Y-m-d H:i:s", time())]);
