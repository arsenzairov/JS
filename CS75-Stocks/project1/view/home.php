<?php
require_once('../includes/helper.php');
require_once('../model/model.php');
render('header', array('title' => 'C$75 Finance'));

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

    <div class="form-style-6">
        <h1> Get a Quote </h1>
        <form action="../controller/quote.php" method="post" onsubmit="return checkSymbol();">
            <input id="symbolforquote" type="text" placeholder="Stock Symbol" name="symbolname" />
            <input type="submit" value="Send" name="action" />
        </form>
    </div>


    <div class="news">
        <div id="news1">
            <h1> Bitcoin  </h1>
            <div class="imageClass">
                <img src="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2016/11/22/104123761-GettyImages-625039762.530x298.jpg?v=1479829300">
            </div>
             <ul>
                 <li> Bitcoin steady as cryptocurrencies take a back seat to the stock market for another session </li>
                 <li> Here’s proof that this bitcoin crash is far from the worst the cryptocurrency has seen </li>
                 <li> Check bitcoin and cryptocurrency prices, performance, and market capitalization, in one dashboard </li>
             </ul>
        </div>
        <div id="news2">
            <h1> Fed  </h1>
            <div class="imageClass">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/E-ticker.jpg">
            </div>
            <ul>
                <li>  Fed’s Dudley says drop in stocks is ‘small potatoes’ </li>
                <li> Tim Mullaney: Who remembers the good old days of rising stocks and a robust economy? </li>
                <li> The ‘markets stop panicking when central banks start panicking’: Bank of America Merrill Lynch </li>
            </ul>
        </div>
        <div id="news3">
            <h1> Amazon  </h1>
            <div class="imageClass">
                <img src="https://www.wired.com/wp-content/uploads/2016/04/amazon-a-logo.jpg">
            </div>
            <ul>
                <li>  FedEx, UPS shares slammed on report Amazon is preparing a mail delivery service </li>
                <li> How to get Whole Foods delivered to your door in 2 hours or less </li>
                <li> Why your Amazon packages may soon arrive faster  </li>
            </ul>
        </div>
    </div>

    <div class="balancebox">
        <div class="alert alert-primary" role="alert">
            <label> Your Balance : <? echo get_user_balance($_SESSION['userid']); ?></label>
        </div>
    </div>


    <div class="portfoliobox">
        <form action="../controller/portfolio.php" method="post">
            <input class="btn btn-primary" type="submit" value="View Portfolio" name="portfolio">
        </form>
    </div>





    <div class="logoutbox">
        <form action="../controller/logout.php" method="post">
            <input class="btn btn-primary" type="submit" value="Logout" name="logout">
        </form>
    </div>








<!--    <ul>-->
<!--        <li><a href="../contoller/G">Get quote for Google</a></li>-->
<!--        <li><a href="portfolio">View Portfolio</a></li>-->
<!--        <li><a href="../controller/logout.php">Logout</a></li>-->
<!--    </ul>-->

<?php
render('footer');
?>
<script>

    function checkSymbol(){

        var stocks = ["V","UNH","PG","KO","GS","MRK","VZ","UTX","TRV","DIS","BA","HD","MMM","PFE","NKE","MCD","JPM","INTC","GE","CSCO","CVX","CAT","AXP","JNJ","XOM","MSFT","IBM","AAPL"];

        value = $("#symbolforquote").val();

        contains = (stocks.indexOf(value) > -1);

        if (contains == false){
            alert("The Symbol Does Not Exist");
        }

        return contains;
    }

</script>
