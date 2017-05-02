
<?php
	$mysqli = new mysqli('localhost','root','','myClass');
	$mysqli->query('set names utf8');

	$user = $_POST['userValue'];

	$sql = "select * from user where userno='{$user}'";
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc();

    if($data) 	$json = 1;
	else  $json = false;
    echo json_encode($json);

?>