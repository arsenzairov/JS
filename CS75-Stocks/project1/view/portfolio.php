<?php
require_once('../includes/helper.php');
require_once('../model/model.php');
render('header', array('title' => 'Portfolio'));

$info = get_information_user($_SESSION['userid']);
$balance = get_user_balance($_SESSION['userid']);



?>





    <div id="header">
        <label id="text"> HIGH LEVEL SECURITY AND 24 HOUR CUSTOMER SERVICE</label>
        <label id="chat"> LIVE CHAT </label>
    </div>

    <div id="contact">
        <label id="marketname"><span id="stockText"> STOCK </span> MARKET  </label>
        <label id="callus"> CALL US TOLL FREE </label>
        <label id="phone"> +1 800. 123.4567 </label>
    </div>



    <div class="portfolioheader">
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="data:image/jpeg;base64,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" width="30" height="30" class="d-inline-block align-top" alt="">
            <label>Portfolio </label>
            <span id="usernamebar" class="navbar-brand mb-0 h1">Username: <? echo $info['username']; ?></span>
            <span id="emailbar" class="navbar-brand mb-0 h1">Email:  <?echo $info['email']; ?></span>
            <span id="balancebar" class="navbar-brand mb-0 h1">Balance: <?echo $balance ?> </span>
        </a>
    </nav>
    </div>




    <?php foreach($holdings as $holding){ ?>
        <? $price = get_quote_data($holding["symbol"]); ?>

    <div class="alert alert-primary" role="alert">
        <label id="symbollabel"> Symbol : <? echo $holding["symbol"]; ?> </label>  <label id="quantitylabel"> , Quantity: <?echo $holding["quantity"]; ?> , Price: <?echo $price["open"]; ?> </label>
    </div>
    <?php } ?>

    <div id="whitebackground">
        <div id="portfolioleave">
        <form action="../html/index.php" method="post">
            <input class="btn btn-primary" type="submit" value="Home" name="leave">
        </form>
        </div>
    </div>


    <form class="form-inline" action="../controller/sellstock.php" method="post" onsubmit="return checkSymbol();">
    <div class="form-group mx-sm-3 mb-2">
        <label for="inputPassword2" class="sr-only"></label>
        <input id="sellingsymbolid" type="text" name="sellsymbol" class="form-control" id="inputPassword2" placeholder="Stock Symbol">
    </div>
    <input type="submit" value="Sell" class="btn btn-primary mb-2" name="action" >
    </form>

<style>
    .form-inline {
        position: relative;
        top: -435px;
        left: 460px;
        width: 450px;
    }

    .form-inline #inputPassword2 {
        margin-top: -10px;
    }

    .form-inline input[type="submit"]{
        position: relative;
        left: -2px;
        top: -5px;
    }
</style>



<?php
render('footer');
?>
<script>
    function checkSymbol(){

    var stocks = ["V","UNH","PG","KO","GS","MRK","VZ","UTX","TRV","DIS","BA","HD","MMM","PFE","NKE","MCD","JPM","INTC","GE","CSCO","CVX","CAT","AXP","JNJ","XOM","MSFT","IBM","AAPL"];

    value = $("#sellingsymbolid").val();

    contains = (stocks.indexOf(value) > -1);

    if (contains == false){
        alert("The Symbol Does Not Exist");
    }

        return contains;
    }
</script>
