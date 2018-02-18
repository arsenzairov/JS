
var map="";
var marker=[];
var coords = [];
var msg="";
var polylinePath="";



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(37.775362, -122.417564),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-section"),
        mapOptions);
}

function addMarker() {

    setMapOnAll(map);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < marker.length; i++) {
        marker[i].setMap(map);
    }
}

function removeMarker() {
    setMapOnAll(null);
}

function deleteMarker() {
    removeMarker();
    marker = [];
}

function addPolyline(coords) {



    polylinePath = new google.maps.Polyline({
        path: coords,
        strokeColor: getRandomColor(),
        strokeOpacity: 1.0,
        strokeWeight: 4
    });

    polylinePath.setMap(map);
}

function removeLine() {
    polylinePath.setMap(null);
}

function addInfoWindow(abbr,marker) {

    var infoWindow = new google.maps.InfoWindow({
    });

    google.maps.event.addListener(marker, 'click', function () {
        get(abbr);
        infoWindow.setContent(msg);
        infoWindow.open(map, marker);
    });

}

function get(abbr) {
    $(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: "info.php",
            data: {
                abbr: abbr
            },
            success: function (data) {
                msg = data;
            }
        });
        return false;
    });
}




$(document).ready(function() {
    $(".custom-select").change(function () {


        coords = [];
        deleteMarker();
        var index = $(this).children('option:selected').index();

        $.ajax({
            type : 'POST',
            url: "../controller/ajax.php",
            data: {
                index: index
            },
            success: function(data) {

                var jsonData = JSON.parse(data);

                deleteMarker();
                if(polylinePath != "") removeLine();

                for(i=0; i<jsonData.length; i=i+1) {
                    var counter = jsonData[i];
                    marker[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(counter.lat, counter.lng),
                        title: "I am a marker!"
                    });
                    coords.push(new google.maps.LatLng(counter.lat,counter.lng));
                    addInfoWindow(counter.abbr,marker[i]);
                }

                addMarker();
                addPolyline(coords);
            }


        });



    });
});



