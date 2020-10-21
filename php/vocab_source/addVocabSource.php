<?php
include('../config.php');
include('../DB.php');
$db = new DB;
$sql = "INSERT INTO `vocab_source` (`source_from`) VALUES (?)";
$db->pdo()->prepare($sql)->execute([$_POST['source']]);