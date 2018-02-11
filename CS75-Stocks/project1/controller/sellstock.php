<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/11/18
 * Time: 2:15 PM
 */

require_once('../model/model.php');

session_start();

if (isset($_POST['action'])) {
    $symbol = htmlspecialchars($_POST['sellsymbol']);

    sell_shares($_SESSION['userid'],$symbol);

    header("Location: ../controller/portfolio.php");
}