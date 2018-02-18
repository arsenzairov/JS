<?php
/**
 * Created by PhpStorm.
 * User: Arsen
 * Date: 2/16/18
 * Time: 11:29 AM
 */


// Create Connection
$conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME1);

// Check Connection
if(mysqli_connect_errno()){
    // Connection Failed
    echo 'Failed to connect to MySQL '. mysqli_connect_errno();
}