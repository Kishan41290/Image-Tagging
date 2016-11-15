<?php
include('dbconnect.php');

  $uid = $_POST['user_id'];
  $pic_id = $_POST['pic_id'];
// fetch all tags
  $i=1;
  if($pic_id!='') {
    $sql = "SELECT * FROM img_tag WHERE user_id = $uid AND pic_id = $pic_id ORDER BY id";
    $qry = mysql_query($sql);

    while($rs = mysql_fetch_array($qry)){
      echo '<div class="tagview" style="left:' . $rs['pic_x'] . 'px;top:' . $rs['pic_y'] . 'px;" id="view_' . $rs['id'] . '"><p style="color:white;text-align:center;font-weight:700;">'.$i.'</p></div>';
      $i++;
    }
  }
?>