<?php 

ini_set("display_erros", 1);

include 'Pessoa.php';

$jose = new Pessoa("José", 123);
// $jose->setNome("José");
$jose->idade = 26;
$jose->imprimir();

var_dump($jose);

echo "<br>";
// unset($jose); // executado ao finalizar o script
// $jose = NULL;

?>