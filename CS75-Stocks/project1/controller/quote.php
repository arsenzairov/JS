<?php
/*******************
 * quote.php
 *
 * CSCI S-75
 * Project 1
 * Chris Gerber
 *
 * Quote controller
 *******************/

require_once('../model/model.php');
require_once('../includes/helper.php');

if (isset($_POST['action'])) {
    $symbol = htmlspecialchars($_POST['symbolname']);

    $quote_data = get_quote_data($symbol);

    render('quote', array('quote_data' => $quote_data));
}
?>




