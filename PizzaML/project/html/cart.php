<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/6/18
 * Time: 10:43 AM
 */

session_start();

// Turn off all error reporting
error_reporting(0);

if (isset($_POST['click'])) {
    $val = htmlspecialchars($_POST['delete']);
    unset($_SESSION['cart'][$val]);
}

?>

<?
$quantity = 0;
$price = 0;
$total = 0;

if (!empty($_SESSION['cart'])) {echo "<h1> Welcome Back </h1>";}
echo "<h1 id='cartlabel'> Here is Your Cart </h1>";
foreach($_SESSION['cart'] as $key => $value){

    echo "<h2>" . $key . "</h2>";
    echo "<ul>";
    foreach($_SESSION['cart'][$key] as $key => $value){
        echo "<li>" . "<span id='key'>" . $key . "</span>" . ":    " . $value . "</li>";

        if ((string) $key == 'Quantity') { $quantity=$value;}
        if ((string) $key == 'Price') {$price=$value;}
    }
    echo "<li> <span id='key'> Total Price For The Item</span>" . ":   " . $quantity * $price . "</li>";
    $total+=$quantity*$price;
    echo "</ul>";


}

echo "<h1 id='total'> Your Total is : " . $total . "</h1>";



echo "<form action='cart.php' method='post'>";
echo "<h3> Enter The Name of The Item You Wish To Delete: </h3>";
echo "<input type='text' name='delete'>";
echo "<input type='submit' name='click' value='Submit' >";
echo "</form>";


echo "<a href='http://arsenzairov/project/html/index.php'> Go Back To Home Page";



?>

<style>

    h1 {
        margin-left: 20px;
        margin-top: 0;
    }

    #cartlabel {
        margin-top: -20px;
        margin-left: 9px;
        color: #D2691E;
    }

    h2 {
        color: green;
        margin-left: 22px;
    }

    h3{
        color: brown;
        margin-top: -20px;
        margin-left: 2px;
    }
    li{
        margin-top: 0px;
        position: relative;
        top: -12px;
    }
    #total {
        color: #3E50B4;
        font-size: 24px;
    }

    form {
        margin-top: 30px;
    }

    input[type='text']{
        position: relative;
        top: -38px;
        left: 409px;
    }

    input[type='submit']{
        position:relative;
        top: -38px;
        left: 413px;
        font-weight: bold;
    }

    #key {
        font-weight: bold;
    }

</style>


