<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "faculty_account";

if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname))
{
    die("failed to connect!");
}