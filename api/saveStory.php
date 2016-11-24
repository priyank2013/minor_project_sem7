<?php
$errors = array();
$data = array();

$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$title=$request->title;
$story=$request->story;


require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}
else{
    $queryDetail="insert into story values('$title','$story')";

  
$mysqli->autocommit(FALSE); 
$query=$mysqli->query($queryDetail);
    try{      
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
   


if (empty($errors)) {
     $data['success'] = true;
//    $data['message'] = 'Form data is going well';
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);


?>
?>