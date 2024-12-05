<?php

function check_login($con)
{
    if(isset($_SESSION['faculty_id']))
    {

        $id = $_SESSION['faculty_id'];
        $query = "select * from users where faculty_id = '$id' limit 1";

        $result = mysqli_query($con, $query);
        if($result && mysqli_num_rows($result) > 0)
        {

            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    }
    //redirect to login
    header("Location: signin.php");
    die;
}