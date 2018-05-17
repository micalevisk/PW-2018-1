<?php

session_start();

if (isset($_SESSION)
 && $_SESSION['logado']) {
  header("Location:logado.html");
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tela de Login</title>
  </head>
  <body>
    <form action="interna.php" method="post">
      <input type="text" name="username"> <br>
      <input type="password" name="senha"> <br>
      <input type="submit" value="entrar">
    </form>
  </body>
</html>
