<?php
include('dbconnect.php');

$pic_id = $_POST['pic_id'];
$uid = $_POST['user_id'];

if($pic_id!='') {
  $result = mysql_query("SELECT * FROM `img_tag` WHERE user_id = $uid AND pic_id = $pic_id ORDER BY id ");
  while ($rs = mysql_fetch_array($result)) {
    echo '<li rel="' . $rs['id'] . '"><a>' . $rs['name'] . '</a> </li>';
  }
}

?>
