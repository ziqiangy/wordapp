<?php

include('../config.php');
include('../DB.php');

$db = new DB;
$sql = "DELETE FROM `vocab` WHERE `id` = ?";
$db->pdo()->prepare($sql)->execute([$_POST['id']]);