
<?php
require_once('../includes/helper.php');
if (!isset($quote_data["open"]))
{
    // No quote data
    render('header', array('title' => 'Quote'));

    echo "<div class='alert alert-danger' role='alert'>";
    echo "No symbol was provided, or no quote data was found.";
    echo "</div>";

    render('home');
}
else
{
    // Render quote for provided quote data
    render('header', array('title' => 'Quote for '.htmlspecialchars($quote_data["symbol"])));
    ?>


    <div id="quoteheader">
        <p> Stock price quote for , symbol <? echo $quote_data["symbol"]; ?> ( <?echo $quote_data["date"] ?> )</p>
        <p> Quote data is updated continuously during trading hours </p>
    </div>

    <div id="quoteinformation">

        <div id="title">
        <h1> <?echo $quote_data["symbol"] ?> <span id="nasdaq"> (NASDAQ) </span></h1>
        </div>


        <div id="info">
            <ul id="leftinfo">
                <li> Open : <?echo $quote_data["open"] ?> </li>
                <li> High : <?echo $quote_data["high"] ?> </li>
                <li> Low : <?echo $quote_data["low"] ?> </li>
                <li> Close : <?echo $quote_data["close"] ?> </li>
                <li> Volume : <?echo $quote_data["volume"] ?> </li>
                <li> Dividend : <?echo $quote_data["dividend"] ?> </li>
            </ul>
            <ul id="rightinfo">
                <li> Split : <?echo $quote_data["split"] ?> </li>
                <li> Adjusted Open : <?echo $quote_data["adj_open"] ?> </li>
                <li> Adjusted High : <?echo $quote_data["adj_high"] ?> </li>
                <li> Adjusted Low : <?echo $quote_data["adj_low"] ?> </li>
                <li> Adjusted Close : <?echo $quote_data["adj_close"] ?> </li>
                <li> Adjusted Volume: <?echo $quote_data["adj_volume"] ?> </li>
            </ul>
        </div>

        <div id="actioninfo">
            <form action="../controller/buyquote.php" method="post" onsubmit="return validate();">
                <div class="form-row align-items-center">
                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInput">Name</label>
                        <input name="quantity" type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Stock Quantity">
                        <input type="text" name="symbol" hidden="hidden" value="<? echo $quote_data["symbol"]; ?>" class="btn btn-primary mb-2">
                        <input type="text" name="price" hidden="hidden" value="<? echo $quote_data["open"]; ?>" class="btn btn-primary mb-2">
                        <input type="text" name="id" hidden="hidden" value="<? echo $_SESSION["userid"]; ?>">
                    </div>
                </div>
                <div class="col-auto">
                    <input type="submit" name="quotesubmit" class="btn btn-primary mb-2">
                </div>
            </form>
        </div>
    </div>


    <script>
        function validate()
        {

            // check if the email address was entered (min=6: x@x.to)
            quantity = $("input[name=quantity]");

            if (quantity.val().length == 0){
                alert("You must Specify the quantity of stock you wish to buy");
                return false;
            }

            return true;
        }

        // set the focus to the email field (located by id attribute)
        $("input[name=quantity]").focus();

        // ]] >
    </script>



    <?php
}

render('footer');
?>


