<?php

include('../config.php');
include('../DB.php');
$db = new DB;

$sql = "UPDATE `note` SET `title` = ?, `content` = ? WHERE id = ?";
$db->pdo()->prepare($sql)->execute([$_POST['title'], $_POST['content'], $_POST['id']]);


