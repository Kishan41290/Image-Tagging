<?php

$hostname="localhost";
$username="root";
$password="root";
$dbname="imagetag";

$rec_limit = 10;
$connection = mysql_connect($hostname, $username, $password);
mysql_select_db($dbname, $connection);

?>