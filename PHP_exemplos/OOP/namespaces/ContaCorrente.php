<?php

namespace ContaCorrente;

include 'Conta.php';
use \Conta\Conta as Conta;

class ContaCorrente extends Conta {
  private $limite_cheque_especial;
}