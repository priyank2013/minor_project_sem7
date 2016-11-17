<?php
$errors = array();
$data = array();
echo "<h2>PHP is Fun!</h2>";
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$username=$request->user_name;
$name=$request->name;

$ph=$request->ph;
$email=$request->email;
$pwd=$request->pwd;
require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}
 $queryDetail="insert into registration values('usern1ame','name','ph','email','pwd')";
$mysqli->autocommit(FALSE); 
$query=$mysqli->query($queryDetail);
if($query == true ){

        
        

        echo "Registered successfully";
            
    }else{
        
         echo "failed to successfully";
    }
$mysqli->commit();
$mysqli->close();
echo json_encode($data);


?>