<?php

include('../config.php');
include('../DB.php');
$db = new DB;

$sql = "UPDATE `vocab` SET `vocab` = ?, `translation` = ? WHERE id = ?";
$db->pdo()->prepare($sql)->execute([$_POST['vocab'], $_POST['translation'], $_POST['id']]);


