<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Teste</title>
  </head>
  <body>
    <?php 
      if (isset($_COOKIE['teste'])) {
        echo "você JÁ passou por aqui";
      } else {
        echo "você NUNCA passou por aqui";
        // adiciona no RESPONSE HEADER: `Set-Cookie`
        setcookie('teste', 'valor', time() + 1, '/');
        //                                   ^ 1 segundo
      }
    ?>
  </body>
</html>