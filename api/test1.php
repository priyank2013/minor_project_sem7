<?php
$errors = array();
$data = array();
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
else{
  
      //  $_SESSION['user']='client';
    $queryDetail="insert into registration values('$username','$name','$ph','$email','$pwd') ";
    
    //$data['session']=$_SESSION['user'];
   try{

       $mysqli->autocommit(FALSE);
       $query=$mysqli->query($queryDetail);
          
     //  $query1=$mysqli->query($queryLogin);
    if($query == true ){

        
        $mysqli->commit();

        $data['message'] = 'Registered successfully';
            
    }else{
        
        $mysqli->rollback();
            
         throw new Exception($mysqli->error);
    }
   }catch(Exception $e){
   
       $mysqli->rollback();
   $errors['exception'] = 'Database, error '. $e->getMessage();
    
    //  print_r($e->getMessage());
//    exit();
   }
   


 


$mysqli->close();

}
   



echo json_encode($data);


?>