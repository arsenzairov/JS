
<?

    $dom = simplexml_load_file("/Applications/XAMPP/xamppfiles/htdocs/project/menu.xml");

// iterate over each category
    foreach ($dom->category as $category) {


        echo "<div id=\"". $category["id"] . "\" >";

        if ($category->item->price["choice"] != "") {
            echo "<h2>" . $category["type"] . ":  Sm/Lg" . "</h2>";
        }
        else {
            echo "<h2>" . $category["type"] . "</h2>";
        }



        echo "<br>";

        // iterate over each item inside the category
        foreach ($category->item as $item) {
            echo "<p><span>" . $item["name"] . ":" . "</span>";

            if (isset($item["description"])){
                echo "<label id='description'>" . $item["description"] . "</label>";
            }
            // if choice is not default
            if ($item->price["choice"] != "") {
                foreach ($item->price as $type) {
                    switch ((string)$type['choice']) {
                        case 'small':
                            echo "<span id='small'>";
                            echo  $type;
                            echo "</span>";
                            break;
                        case 'large':
                            echo "<span id='large'>";
                            echo  $type;
                            echo "</span>";
                            break;
                    }
                }
                echo "</p>";
            } else {
                echo "<span id='default'>";
                echo  $item->price;
                echo "</span>";
            }

        }

        echo "</div>";
}
?>
<style>



</style>

