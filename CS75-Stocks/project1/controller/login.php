<?php
/*******************
 * login.php
 *
 * CSCI S-75
 * Project 1
 * Chris Gerber
 *
 * Login controller
 *******************/


require_once('../model/model.php');
require_once('../includes/helper.php');

session_start();

if (isset($_POST['submit'])){

    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    if (!empty($email) && !empty($password) && !empty($username)) {


            $_SESSION['authenticated'] = true;

            $userid = login_user($username, $password);

            if ($userid > 0) {

                // move to home page with existing user
                $_SESSION['userid'] = $userid;
                render('home');
            } else {

                //initial balance of the user
                $balance = 10000;

                // registers the user
                register_user($username, $password, $email, $balance);

                // id of the user
                $_SESSION['userid'] = get_id($username, $password);

                render('home');
            }
    }


    else {
            render('login');
        }
}

?>
