<?php

$errors = array();
$data = array();
$story= array();
$title=array();
require_once 'connection.php';

$qry="select * from story";

$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{
    
    $result=$mysqli->query($qry);
    //print_r($result);
    if($result == true){
        //$row=$result->fetch_array(MYSQLI_NUM);
        //print_r($row);
        while($row=$result->fetch_array(MYSQLI_NUM)){
            //echo "row";
           // print_r($row);
            //if($row)
            $temp=[];
            $temp['title']=$row[0];
            $temp['story']=$row[1];
           //echo $temp['story'];
            array_push($data,$temp);
            //$data.push_back($temp);
        }


    
    }else{
    
        $errors['error']='database error';
    
    }
    
    $mysqli->close();
}
//echo "$data";
echo json_encode($data);
?>