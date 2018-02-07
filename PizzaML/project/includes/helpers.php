
<?php
/**
 * Renders template.
 *
 * @param array $data
 *
 * Written by David Malan
 */
function render($template, $data = array())
{
    $path = __DIR__ . '/../' . $template . '.php';
    if (file_exists($path))
    {
        extract($data);
        require($path);
    }
}


?>