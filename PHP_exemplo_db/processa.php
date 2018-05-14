<?php 

$usuario = "??"; // criar um usuário com menos prioridades
$senha = "icomp123";

try {
  $con = new PDO("mysql:host=localhost;dbname=skifree", $usuario, $senha);
  $con->exec("SET NAMES UTF8");

  $stmt = $con->prepare("INSERT INTO curso (sigla, nome, descricao) VALUES (:sigla, :nome, :descricao)");

  $stmt->bindValue(':sigla', $_POST['sigla']);
  $stmt->bindValue(':nome', $_POST['nome']);
  $stmt->bindValue(':descricao', $_POST['descricao']);

  $stmt->execute();
  $echo "OK";

  include 'lista.php';

  // $con = NULL;
} catch (PDOException $e) {
  echo $e->getMessage();
}

?>