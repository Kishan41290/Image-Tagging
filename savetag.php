<?php
include('dbconnect.php');

$pic_id = $_POST['pic_id'];
$uid = $_POST['user_id'];

if ($_POST['type'] == "insert")
{
  $name = $_POST['name'];
  $pic_x = $_POST['pic_x'];
  $pic_y = $_POST['pic_y'];
  echo $sql = "INSERT INTO `img_tag` (`user_id`, `pic_id`, `name`, `pic_x`, `pic_y`) VALUES ($uid, $pic_id, '$name','$pic_x', '$pic_y')";
  $qry = mysql_query($sql);
}

if ($_POST['type'] == "remove")
{
  $tag_id = $_POST['tag_id'];
  $sql = "DELETE FROM `img_tag` WHERE user_id = $uid AND id = '$tag_id' ";
  $qry = mysql_query($sql);
}

if($pic_id!='') {
  $result = mysql_query("SELECT * FROM `img_tag` WHERE user_id = $uid AND pic_id = $pic_id ORDER BY id ");
  while ($rs = mysql_fetch_array($result)) {
    echo '<li rel="' . $rs['id'] . '"><a>' . $rs['name'] . '</a> (<a class="remove">Remove</a>)</li>';
  }
}

?>
