<?php 

$usuario = "??"; // criar um usuário com menos prioridades
$senha = "icomp123";

try {
  $con = new PDO("mysql:host=localhost;dbname=skifree", $usuario, $senha);
  $con->exec("SET NAMES UTF8");

  $stmt = $con->prepare("SELECT * FROM curso");

  $stmt->execute();

  while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
    print($row->nome . "<br>");
  }
  /*
  while ($row = $stmt->fetch()) {
    print($row['nome'] . "<br>");
  }
  */

  // $con = NULL;
} catch (PDOException $e) {
  echo $e->getMessage();
}

?>