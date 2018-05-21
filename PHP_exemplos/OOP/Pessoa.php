<?php 

class Pessoa {
  protected $nome;
  public $idade;


  function __construct ($nome, $idade) {
    $this->setNome($nome);
    $this->idade = $idade;
  }

  // ao desalocar uma instância
  function __destruct () {
    echo "A pessoa morreu :(";
  }

  function setNome ($nome) {
    $this->nome = $nome;
  }

  public function imprimir () {
    echo "Nome: " . $this->nome . "<br>";
    echo "Idade: " . $this->idade . "<br><br>";
  }
}
