<?php

include('../config.php');
include('../DB.php');

$db = new DB;
$sql = "INSERT INTO `note` (`id`, `title`, `content`, `date`) VALUES (?,?,?,?)";
$db->pdo()->prepare($sql)->execute([null,'test4', 'eeeee', '2020-09-17 11:43:19']);
