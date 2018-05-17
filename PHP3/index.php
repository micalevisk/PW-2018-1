<?php

session_start();

if (isset($_SESSION)
 && $_SESSION['logado']) {
  header("Location:logado.html");
} else {
  header("Location:login.php");
}

?>
