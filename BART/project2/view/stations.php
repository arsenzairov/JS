<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/16/18
 * Time: 9:27 AM
 */



require_once('../includes/helper.php');
render('header', array('title' => 'BART ROUTES'));


//print_r($routes);
?>


<div id="image-section">

    <div id="text-section">
    <h1> See Where the Train Can Take You </h1>
        <p> Select The Route that you prefer </p>
    </div>
</div>


<div class="main-area" >

    <div id="form-section">


        <select class="custom-select">
            <option selected>Available Routes</option>
            <? foreach($routes as $route): ?>
            <option value="<? echo $route ?>"> <? echo $route ?> </option>
            <? endforeach; ?>
        </select>

    </div>



    <div id="map-section">
    </div>

</div>

<footer id="footer-station" class="pt-4 my-md-5 pt-md-5 border-top">
    <div class="row">
        <div class="col-12 col-md">
            <img class="mb-2" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24">
            <small class="d-block mb-3 text-muted">&copy; 2017-2018</small>
        </div>
        <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Cool stuff</a></li>
                <li><a class="text-muted" href="#">Random feature</a></li>
                <li><a class="text-muted" href="#">Team feature</a></li>
                <li><a class="text-muted" href="#">Stuff for developers</a></li>
                <li><a class="text-muted" href="#">Another one</a></li>
                <li><a class="text-muted" href="#">Last time</a></li>
            </ul>
        </div>
        <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Resource</a></li>
                <li><a class="text-muted" href="#">Resource name</a></li>
                <li><a class="text-muted" href="#">Another resource</a></li>
                <li><a class="text-muted" href="#">Final resource</a></li>
            </ul>
        </div>
        <div class="col-6 col-md">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Team</a></li>
                <li><a class="text-muted" href="#">Locations</a></li>
                <li><a class="text-muted" href="#">Privacy</a></li>
                <li><a class="text-muted" href="#">Terms</a></li>
            </ul>
        </div>
    </div>
</footer>

<script type="text/javascript">
    window.onload = function(){
        initialize();
        addMarker(37.775362,-122.417564);
    }
</script>


<? render('footer'); ?>

