<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/15/18
 * Time: 9:45 AM
 */


$page = "home";

$path = __DIR__ . '/../controller/' . $page . '.php';
if (file_exists($path))
    require($path);