<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/16/18
 * Time: 9:30 AM
 */

require("load.php");


$dom = simplexml_load_file("http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V");




function get_info() {

    $routes = array();

    // Create Connection
    $conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME1);

    $query = 'SELECT abbr FROM routes';

    $result = mysqli_query($conn,$query);

    $abbr = mysqli_fetch_all($result);

    for ($i =0; $i<count($abbr);$i++) {

        array_push($routes,$abbr[$i][0]);

    }

    return $routes;
}


// selects all the stations for a specified route number
function stations_of_route($num) {

    $dom = simplexml_load_file("http://api.bart.gov/api/route.aspx?cmd=routeinfo&route={$num}&key=MW9S-E7SL-26DU-VV8V");

    $stations = array();

    foreach($dom->routes->route->config->station as $station) {
        array_push($stations,$station);
    }

    return $stations;
}

