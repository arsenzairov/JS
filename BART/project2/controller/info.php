<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/17/18
 * Time: 5:56 PM
 */


require_once('../config/config.php');

$abbr = $_POST['abbr'];


// Create Connection
$dom = simplexml_load_file("http://api.bart.gov/api/etd.aspx?cmd=etd&orig={$abbr}&key=MW9S-E7SL-26DU-VV8V");

foreach($dom->station->etd as $etd) {

    echo('<b>' . $etd->destination . '</b>' . ": ");

    foreach($etd->estimate as $estimate) {
        echo('Platform: ' . $estimate->platform);
        echo ("   ,   ");
        echo('Minutes: ' . $estimate->minutes);
        echo ("   ,   ");
        echo('Direction: ' . $estimate->direction);
        echo ("</br>");
    }
    print('</br>');
}

