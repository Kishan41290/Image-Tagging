<?php include('dbconnect.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"> 
  <head> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
    <link href="css/style.css" rel="stylesheet" type="text/css" >
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">

    <?php
    // GET ALL PRODUCTS
    $qry = 'select * from img_product';
    $result = mysql_query($qry);
    while($row = mysql_fetch_assoc($result)){
      $json[] = $row;
    }
    ?>
 <script type="text/javascript">
   var pro_list = <?php echo json_encode($json); ?>;
   var pic_id = <?php echo json_encode($_POST['pic_id']) ?>;
 </script>

  </head>
  <body>
  <div class="main_popup">
    <?php $img = $_POST['img_val']; ?>
    <div id="imgtag"  style="width:70%;display:block !important;">
    <img src="<?php echo $img; ?>" width="100%" />
    <div class="tagbox">
    </div>
  </div>
  <div class="taglist" style="width: 27%;float: left; background: white;">
    <span class="tagtitle"><h4 style="margin-top: 0px;text-align: left;">List of Tags</h4></span>
    <ol class="taglist-product" style="z-index: 999;">
    </ol>
  </div>
  </body>
</html>