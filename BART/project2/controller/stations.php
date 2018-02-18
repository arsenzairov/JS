<?php

require_once('../includes/helper.php');
require_once('../model/model.php');



load_stations();
load_routes();
$routes = get_info();

render('stations',array('routes' => $routes));

?>


