<?php
include('../config.php');
include('../DB.php');
$db = new DB;
$sql = "INSERT INTO `vocab` (`vocab`,`translation`,`source_id`) VALUES (?,?,?)";
$db->pdo()->prepare($sql)->execute([$_POST['word'],$_POST['translation'],$_POST['source']]);