<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/16/18
 * Time: 9:56 AM
 */

require_once("../config/config.php");

function load_routes()
{
    $conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME1);

    // Create Connection
    $dom = simplexml_load_file("http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V");

// Check Connection
    if (mysqli_connect_errno()){
        // Connection Failed
        echo 'Failed to connect to MySQL' . mysqli_connect_errno();
    }

    $query = "DELETE FROM routes";
    mysqli_query($conn, $query);

    foreach ($dom->routes->route as $route) {

        $name = $route->name;
        $abbr = $route->abbr;
        $routeID = $route->routeID;
        $number = $route->number;
        $color = $route->color;

        $query = "INSERT INTO routes(name,abbr,routeID,number,color) VALUES('$name','$abbr','$routeID','$number','$color')";

        mysqli_query($conn, $query);
    }
}

function load_stations()
{
    $conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME1);

    $dom = simplexml_load_file("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V");

    // Check Connection
    if (mysqli_connect_errno()){
        // Connection Failed
        echo 'Failed to connect to MySQL' . mysqli_connect_errno();
    }

    $query = "DELETE FROM stations";

    foreach($dom->stations->station as $station) {
        $name = $station ->name;
        $abbr = $station ->abbr;
        $lat = $station ->gtfs_latitude;
        $lng = $station ->gtfs_longitude;
        $address = $station ->address;
        $city = $station ->city;
        $state = $station ->state;
        $zip = $station ->zipcode;

        $query = "INSERT INTO stations(name,abbr,lat,lng,address,city,state,zipcode) VALUES('$name','$abbr','$lat','$lng','$address','$city','$state','$zip')";

        mysqli_query($conn,$query);



    }
}

