<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/9/18
 * Time: 2:21 PM
 */




require_once('./includes/helper.php');


$dsn = 'mysql:host='.DB_HOST.';dbname='.DB_DATABASE;
$dbh = new PDO($dsn, DB_USER, DB_PASSWORD);

// GET THE USER ID
$results = $dbh->prepare('SELECT * FROM users WHERE username=:username AND password=:password');

$results->bindValue(':username','arsenzairov',PDO::PARAM_STR);
$results->bindValue(':password','fg',PDO::PARAM_STR);

$results->execute();

$result = $results->fetch();





$new = $dbh->prepare('SELECT * FROM users WHERE username=:username AND password=:password');

$new->bindValue(':username','asdasdasdasdasdaaa',PDO::PARAM_STR);
$new->bindValue(':password','asdas',PDO::PARAM_STR);

$results->execute();

$result = $result->fetch();

echo "Email: ". $result['email'];


