
<?php

    session_start();

    if (empty($_SESSION["cart"])){
        $_SESSION["cart"] = array();
    }

    if (isset($_POST['cartitems'])){
        header("Location: http://arsenzairov/project/html/cart.php");
    }


    if(isset($_POST['additem'])) {

        $category = htmlspecialchars($_POST['categories']);
        $item = htmlspecialchars($_POST['items']);
        $price = htmlspecialchars($_POST['prices']);
        $quantity = htmlspecialchars($_POST['quantity']);


        header("Location: http://arsenzairov/project/html/index.php#form-box");

        $_SESSION["cart"][$item] = array('Category' => $category, 'Item' => $item , 'Price' => $price, 'Quantity' => $quantity);
    }






$dom = simplexml_load_file("/Applications/XAMPP/xamppfiles/htdocs/project/menu.xml");
$index=0;

echo "<div id='form-box'>";


        echo "<form method='post' action='../html/index.php#form-box'>";

        echo "<h5>  Add the Product </h5>";
        echo "<div class='selection'>";
        echo "<select name='categories' id='category'>";


        foreach ($dom->category as $category) {

                    if ($category['type'] == $_POST[categories] && isset($_POST[categories])) {
                        echo "<option selected='selected' value='" . $category['type'] . "'>" . $category['type'] . "</option>";

                    } else {
                        echo "<option value='" . $category['type'] . "'>" . $category['type'] . "</option>";
                    }
         }

        // close first category
        echo "</select>";
        echo "</div>";
        echo "<input type='submit' name='selectcategory' value='SELECT' >";


        echo "<div class='selection'>";
        echo "<select name='items' id='category1'>";




        if(isset($_POST['selectcategory'])) {

            foreach ($dom->category->item as $category) {
                switch($_POST['categories']) {
                    case 'Pizzas':
                        $index=0;
                        break;
                    case 'Speciality Pizzas':
                        $index=1;
                        break;
                    case 'Special Dinners':
                        $index=2;
                        break;
                    case 'Side Orders':
                        $index=3;
                        break;
                }
            }



        foreach($dom->category[$index]->item as $category) {
                    if($_POST['items'] == $category['name']) {
                        echo "<option selected='selected' value='" . $category['name'] . "'>" . $category['name'] . "</option>";
                    } else {
                        echo "<option value='" . $category['name'] . "'>" . $category['name'] . "</option>";
                    }

            }
        }

        echo "</select>";
        echo "</div>";
        echo "<br>";



        echo "<div class='selection'>";
        echo "<select name='prices' id='category1'>";
        if(isset($_POST['selectcategory'])) {
            foreach($dom->category[$index]->item as $item) {
                if($item['name'] == $_POST['items']) {
                    foreach ($item->price as $type) {
                        switch ((string)$type['choice']) {
                            case 'small':
                                echo "<option value='" . $type. "'>" . $type . "</option>";
                                break;
                            case 'large':
                                echo "<option value='" . $type. "'>" . $type . "</option>";
                                break;
                            default:
                                echo "<option value='" . $type . "'>" . $type . "</option>";
                                break;
                        }
                    }
                }
            }
        }

        echo "</select>";
        echo "</div>";



        echo "<label> Quantity : </label>";
        echo "<input type='text' name='quantity' id='textbox'>";
        echo "<input type='submit' value='Add' name='additem' id='addbutton'>";
        echo "<input type='submit' value='Cart' name='cartitems' id='cart'>";



    echo "</form>";
    echo "</div>";

    ?>




<style>

    body {
        background-image: url("https://ak1.picdn.net/shutterstock/videos/7194331/thumb/1.jpg");
    }

    #form-box{
        position:relative;
        left: 32%;
        top: -300px;
    }

    input[name='selectcategory'], input[name='selectitem'] {
        position: relative;
        right: -360px;
        top: -24px;
        background-color: #008CBA;
        border-radius: 12px;
        font-size: 15px;
    }

    input[name='selectcategory'] : hover {
        background-color: #4CAF50; /* Green */
        color: white;
    }


    .selection select {
        border: 0;
        color: #EEE;
        background: transparent;
        font-size: 20px;
        font-weight: bold;
        padding: 2px 10px;
        width: 378px;
        *width: 350px;
        *background: #58B14C;
        -webkit-appearance: none;
    }

    .selection {
        overflow:hidden;
        width:350px;
        -moz-border-radius: 9px 9px 9px 9px;
        -webkit-border-radius: 9px 9px 9px 9px;
        border-radius: 9px 9px 9px 9px;
        box-shadow: 1px 1px 11px #330033;
        background: #58B14C url("http://i62.tinypic.com/15xvbd5.png") no-repeat scroll 319px center;
    }

    h5 {
        color : black;
        font-weight: bold;
        font-size:  22px;
        position:relative;
        right: -100px;
    }

    #addbutton {
        position: relative;
        right: -15px;
        bottom: -12px;
        background-color: #F08080;
        font-size: 15px;
        width: 8%;
    }

    label {
        font-weight: bold;
        position: relative;
        font-size: 15px;
        bottom: -12px;
    }
    #textbox {
        width: 40px;
        position: relative;
        bottom: -12px;
        border: 2px solid black;
    }



    #cart{
        position: relative;
        right: -22px;
        bottom: -12px;
        background-color: #F08080;
        font-size: 15px;
        width: 8%;
    }

</style>


