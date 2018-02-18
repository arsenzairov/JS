<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/15/18
 * Time: 10:01 AM
 */

require_once('../includes/helper.php');
render('header', array('title' => 'BART ROUTES'));
?>

<section id="showcase">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-6">

                <div class="showcase-left">
                    <img  src="https://a1.muscache.com/locations/uploads/article_photo/image/63/0_4200_0_2800_one_SF_DuboceTriangle_OdessaShekar-40.jpg">
                </div>

            </div>
            <div class="col-md-6 col-sm-6">
                <div class="showcase-right">
                    <h1> Nice Train Station </h1>
                    <p> The Nice Train Station (Gare de Nice-Ville) was originally built away from the city center, however the modern city has populated around the station making it part of the town center. The station building can be found in its original condition. Richly decorated balconies and a grand clock are a few of the noticeable attributes of the impressive Nice train station. </p>
                </div>
                <a class="btn btn-outline-secondary"> Read More </a>
            </div>
        </div>
    </div>
</section>


<section id="testimonial">
    <div class="container">
        <p> What thrills me about trains is not their size or their equipment but the fact that they are moving, that they embody a connection between unseen places..</p>
        <p class="customer"> --Marianne Wiggins </p>
    </div>
</section>


<section id="info1">

    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-6">
                <div class="info-left">
                    <img src="http://cs.trains.com/cfs-file.ashx/__key/CommunityServer.Blogs.Components.WeblogFiles/staff/0042.david_2D00_honan_2D00_san_2D00_francisco_2D00_2.jpg">
                </div>
            </div>
            <div class="col-md-6 col-sm-6">
                <div class="info-right">
                    <h2> The Company </h2>
                    <p> As the leading worldwide distributor of European rail products, Rail Europe is the only one-stop-shop for planning and booking European train travel and sightseeing products.
                        From rail passes to train tickets and reservations, we provide unparalleled access to an extensive array of rail products from over 50 European train companies.
                        Catering to travellers and travel agents from the Americas, Asia, Oceania, the Middle East, and Africa, Rail Europe makes discovering Europe by train easy, seamless, and memorable
                    </p>
                    <br>
                    <a class="btn btn-outline-secondary"> Read More </a>
                </div>
            </div>
        </div>
    </div>

</section>


<section id="contact">
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-sm-5">
                <form>
                    <div class="form-group">
                        <label for="exampleUsernameInput">Username: </label>
                        <input type="text" class="form-control" id="exampleUsernameInput" placeholder="Username: ">
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlInput1">Email address: </label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1"> Message: </label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Message: "></textarea>
                    </div>

                </form>

            </div>
            <div class="col-md-7 col-sm-7">
                <div class="sideText">
                    <h1 class="cover-heading">Contact Us .</h1>
                    <p class="lead">Thank you for using our San Fransisco Train. Please complete the form , so we can provide quick and efficient service. If this is an urgent matter please contact Customer Support </p>
                    <p class="phone"> US: 813-753-5248 <br> Monday-Friday 7:30 AM - 10:30 PM EST </p>
                    <p class="phone"> International: 732-987-3669 <br> Monday-Thursday 1:15 AM - 10:30 PM EST <br> and Friday 7:30 AM to 10:30 PM EST </p>
                </div>
            </div>
        </div>
    </div>
</section>













<?php
render('footer');
?>

