<?php 

echo "<h1>RECUPERADOS:</h1>";
foreach ($_POST as $name => $value) echo "<b>{$name}</b>: {$value} <BR>";

$usuario = "root"; // criar um usuário com menos prioridades
$senha = "icomp123";
$dbname = "php2";

try {
  $con = new PDO("mysql:host=localhost;dbname=" . $dbname, $usuario, $senha);
  $con->exec("SET NAMES UTF8");

  $stmt = $con->prepare("INSERT INTO mensagem (nome, email, website, mensagem) VALUES (:nome, :email, :website, :mensagem)");

  $stmt->bindValue(':nome', $_POST['nome']);
  $stmt->bindValue(':email', $_POST['email']);
  $stmt->bindValue(':website', $_POST['website']);
  $stmt->bindValue(':mensagem', $_POST['mensagem']);

  try {
    $stmt->execute();

    $stmt = $con->prepare("SELECT * FROM mensagem");
    $stmt->execute();
    $qtdLinhasBD = $stmt->rowCount();
    print "<h3>Quantidade de Dados inseridos = $qtdLinhasBD</h3>";
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}

?>