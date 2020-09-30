<?php

include('../config.php');
include('../DB.php');

$db = new DB;
$sql = "DELETE FROM `note` WHERE `id` = ?";
$db->pdo()->prepare($sql)->execute([$_POST['id']]);
