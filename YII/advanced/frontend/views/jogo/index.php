<?php
/* @var $this yii\web\View */

use yii\helpers\Url;

// $this->registerJsFile('arquivo.do.jogo');

$this->registerJs("
var pontuacao = 555;

/*
$.ajax({
  url: '" . Url::to(['jogo/save']) . "',
  type: 'GET',
  data: {
    'pontuacao': pontuacao
  },
  error: (err) => console.error('Erro ao salvar', err),
  success: function (data) {
    console.log('SERVER:', data);
  }
});
*/
");

?>
<h1>jogo/index</h1>

<p>
    You may change the content of this page by modifying
    the file <code><?= __FILE__; ?></code>.
</p>
