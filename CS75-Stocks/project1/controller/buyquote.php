<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/10/18
 * Time: 1:06 PM
 */

session_start();

require_once('../model/model.php');
require_once('../includes/helper.php');

if (isset($_POST['quotesubmit'])) {
    if (isset($_POST['quantity']) && is_numeric($_POST['quantity'])) {
        $quantity = htmlspecialchars($_POST['quantity']);
        $symbol = htmlspecialchars($_POST['symbol']);
        $price = htmlspecialchars($_POST['price']);
        $id = $_SESSION['userid'];

        buy_shares($symbol,$price,$quantity,$id);

    }
}

render('home');