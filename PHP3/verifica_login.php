<?php

session_start();

if ($_POST['username'] == 'demo'
 && $_POST['senha'] == 'demo') {
  $_SESSION['logado'] = true;
}

// volta para a página de login
if (!isset($_SESSION['logado'])) {
  header("Location:login.php");
}

?>