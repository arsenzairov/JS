<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/16/18
 * Time: 2:43 PM
 */

require_once('../model/model.php');
require_once('../config/config.php');


$index = $_POST['index'];

$stations = stations_of_route($index);

$arr = array();

// Create Connection
$conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME1);

foreach($stations as $station) {

    $result = mysqli_query($conn, "SELECT * FROM stations WHERE abbr='" . $station . "' ");


    $row = mysqli_fetch_assoc($result);


    if ($row['lat'] != null) {
        $array = array("lat" => $row['lat'], "lng" => $row['lng'], "abbr" => $row['abbr']);
    }

    array_push($arr,$array);

}


echo json_encode($arr);




?>










