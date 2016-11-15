<html>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css"  crossorigin="anonymous">
<script src="//code.jquery.com/jquery-1.12.3.js" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js" crossorigin="anonymous"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<link href="css/style.css" rel="stylesheet" type="text/css" >
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
<script src="js/function.js" ></script>

<body>
<h2 style="text-align: center;margin-bottom:50px;">User Images:</h2>


<?php

include('dbconnect.php');

$sql = 'SELECT * FROM `img_user` WHERE visible = "true" ORDER BY pic_id asc ';
$qry = mysql_query($sql);

?>

<ul id="img-list" class="img-list animated fadeIn">
  <?php while($row = mysql_fetch_array($qry)) { ?>
    <li class='img-show1 animated fadeIn' id='data-<?php echo $row['pic_id'].'_'.$row['user_id']; ?>'>
        <span>
          <img class='img-show' src='<?php echo $row['image']; ?>' width='200px' height='200px' />
        </span>
    </li>
<?php
}  ?>
</ul>

<div class="modal fade">
  <div class="modal-dialog" role="document" style="width: 50%;">
    <div class="modal-content">
      <div class="modal-header" style="background: #3074ae; color: white;">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Product tag on user</h4>
      </div>
      <div class="modal-body" style="padding: 0px; width: 100%;float: left;">
        <div id="imgtag" style="width: 100%">
          <div id="tagbox">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success savechanges">Done</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</body>
</html>



