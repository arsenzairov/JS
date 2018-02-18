<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/15/18
 * Time: 9:42 AM
 */

function render($template, $data = array())
{
    $path = __DIR__ . '/../view/' . $template . '.php';
    if (file_exists($path))
    {
        extract($data);
        require($path);
    }
}

?>