<?php
include('../config.php');
include('../DB.php');
$db = new DB;
$sql = "INSERT INTO `vocab` (`vocab`,`translation`) VALUES (?,?)";
$db->pdo()->prepare($sql)->execute([$_POST['word'],$_POST['translation']]);