<?php
/*********************
 * home.php
 *
 * CSCI S-75
 * Project 1
 * Chris Gerber
 *
 * Default controller
 *********************/

require_once('../includes/helper.php');

// See if user ID has been set and decide where to go
if (isset($_SESSION['userid']))
    render('home');
else
    render('login');
?>