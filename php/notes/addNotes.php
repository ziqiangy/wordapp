<?php

include('../config.php');
include('../DB.php');

$db = new DB;
$sql = "INSERT INTO `note` (`id`, `title`, `content`, `date`) VALUES (?,?,?,?)";
$db->pdo()->prepare($sql)->execute([null,$_POST['title'], $_POST['content'], $_POST['date']]);
