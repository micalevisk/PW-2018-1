<?php

use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $generatedCSRFToken string */
/* @var $skifreepaths */

$this->title = 'Skifree';

// função global para executar via AJAX a action `save` do Jogo:
$this->registerJs("
function registrarPontuacao(pontuacao) {
  if (typeof pontuacao !== 'number') {
    throw Error('argumento com tipo inválido, deveria ser Number');
  }

  function onError(err) {
    console.error('[ERRO AO SALVAR PONTUAÇÃO]', err);
  }

  function onSuccess(status) {
    console.log('[STATUS DO SERVER]', status);
  }

  return $.ajax({
    type: 'GET',
    data: {'pontuacao': pontuacao, '_csrf-app': '" . $generatedCSRFToken . "'},
    error: onError,
    success: onSuccess,
    url: '" . Url::to(['jogo/save']) . "'
  });
}
", $this::POS_BEGIN);

?>

<h1 class="text-center"><?= $this->title ?></h1>

<div class="container-fluid">
  <div class="row">
    <div class="col-sm-4 col-sm-push-8" style="padding:0%;">

      <div class="panel panel-primary caixa" id="infoBox">
        <div class="panel-body">
          <p class="infolabel" data-identifier="FPS" id="fps"></p>
          <p class="infolabel" data-identifier="Andou" data-sufix="m" id="andado"></p>
          <p class="infolabel" data-identifier="Vidas Restantes" id="vidas"></p>
        </div>
        <div class="panel-footer">
          <code>
          &copy; <a href="https://github.com/micalevisk/ProgWeb" target="_blank" rel="noopener">Micael Levi</a>
          </code>
        </div>
      </div>

    </div>
    <div class="col-sm-8 col-sm-pull-4">

    <div class="panel panel-primary caixa" id="tabuleiro">

      <div id="container-jogo">
        <div id="skier"></div>
      </div>

      <div id="container-splash">
        <div>
          <panel class="info-box">
            <p>Use a tecla <kbd>ESPAÇO</kbd> para (des)pausar o jogo.</p>
            <p>Use o <kbd>F</kbd> para aumentar ou diminuir a velocidade do esquiador.</p>
            <p>Use as setas ou <kbd>A</kbd> e <kbd>D</kbd> para controlar o esquiador.</p>
          </panel>
        </div>
      </div>

    </div>

    </div>
  </div>
</div>

<?php

$this->registerCssFile( $skifreepaths['css'] . 'layout.css' );
$this->registerCssFile( $skifreepaths['css'] . 'skier.css' );
$this->registerCssFile( $skifreepaths['css'] . 'obstacles.css' );

$this->registerJsFile( $skifreepaths['lib'] . 'utils.js');
$this->registerJsFile( $skifreepaths['models'] . 'ObjectPool.js');
$this->registerJsFile( $skifreepaths['models'] . 'Obstaculo.js');
$this->registerJsFile( $skifreepaths['models'] . 'Yeti.js');
$this->registerJsFile( $skifreepaths['models'] . 'Skier.js');
$this->registerJsFile( $skifreepaths['models'] . 'Tabuleiro.js');
$this->registerJsFile( $skifreepaths['root'] . 'skifree.js');

?>
