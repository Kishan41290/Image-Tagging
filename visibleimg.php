<?php
include('dbconnect.php');

$type = $_POST['type'];
$pic_id = $_POST['pic_id'];
$img = $_POST['img'];
$uid = $_POST['user_id'];

if($type=='insert') {
  if ($pic_id != "") {
    $sql = "INSERT INTO `img_user` (`user_id`, `pic_id`, `image`, `visible`) VALUES ($uid, $pic_id, '" . $img . "', 'true') ON DUPLICATE KEY UPDATE `user_id` = $uid, `pic_id` = $pic_id, `visible`='true' ";
    // $sql = "INSERT INTO `img_user` (`pic_id`, `image`, `visible`) VALUES ($pic_id, '" . $img . "', 'true')";
    $qry = mysql_query($sql);
    echo 'success';
    die();
  }
}else{
  if($pic_id != "") {
    $sql = "UPDATE `img_user` SET visible = 'false' WHERE user_id = $uid AND pic_id = $pic_id";
    $qry = mysql_query($sql);
    echo 'success';
    die();
  }
}

?>
