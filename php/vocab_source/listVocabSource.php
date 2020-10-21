<?php
include('../config.php');
include('../DB.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$db = new DB;
$sql = "SELECT * FROM `vocab_source` ORDER BY `id` ASC";
$data = $db->pdo()->query($sql)->fetchAll(PDO::FETCH_ASSOC);
if($data){
    echo json_encode($data);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No items found.")
    );
}