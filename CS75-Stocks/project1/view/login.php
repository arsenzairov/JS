<?php
require_once('../includes/helper.php');
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

    <div id="middletext">
        <label id="centertext1"> JOIN THE EXCITING MARKET OF </label>
        <label id="centertext2"> FOREIGN EXCHANGE TRADING </label>
    </div>



    <div class="login-box">

        <div id="loginText" >
            <label id="huge"> SIGN UP NOW </label>
            <label id="small"> Lorem Ipsum has been the industry's standard dummy text  </label>
        </div>

            <form method="POST" action="../controller/login.php" onsubmit="return validateForm();">

                <? if(isset($_SESSION['authenticated']) && $_SESSION['authenticated'] == false) : ?>
                    <div class="alert alert-danger" role="alert">
                        The Username Already Exists
                    </div>
                <? endif; ?>
                <div class="form-group">
                    <label for="exampleInputUsername">Username: </label>
                    <input type="text" name="username" class="form-control" id="exampleInputUsername" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address: </label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password: </label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>

                <input type="submit" class="btn btn-primary" name="submit">
            </form>

    </div>

    

    <script>
        function validateForm() {
            isValid = true;

            $("input[name=password]").each(function () {
                if (this.value.length < 8)
                    isValid = false;
                if (!/\d/.test(this.value))
                    isValid = false;
                if (!/[a-z]/.test(this.value))
                    isValid = false;
                if (!/[A-Z]/.test(this.value))
                    isValid = false;
                // if (/[^0-9a-zA-Z]/.test(this.value))
                //     isValid = false;

            });

            if (isValid == false) {

                // set the focus to the email field (located by id attribute)
                alert("The password should contain at least one digit, one lower case, one upper case, and be at least 8 characters");
                $("input[name=email]").focus();
            }

            return isValid;
        }
    </script>

<?php
render('footer');
?>

