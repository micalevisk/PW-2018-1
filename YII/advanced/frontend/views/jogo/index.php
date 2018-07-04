<?php

use yii\helpers\Url;

/* @var $this yii\web\View */

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

<div>

  <panel id="infoBox">
      <p><code>
        &copy; <a href="https://github.com/micalevisk/ProgWeb" target="_blank" rel="noopener">Micael Levi</a>
      </code></p><br>
      <p>Use o <kbd>space</kbd> para pausar/despausar/iniciar o jogo.</p>
      <p>Use o <kbd>F</kbd> para aumentar/diminuir a velocidade do esquiador.</p>
      <p>Use <kbd>&larr;</kbd> e <kbd>&rarr;</kbd>  ou <kbd>A</kbd> e <kbd>D</kbd> para controlar o esquiador.</p>
      <br>
      <p class="label" data-identifier="FPS"   data-sufix="" id="fps"></p>
      <p class="label" data-identifier="Andou" data-sufix="m" id="andado"></p>
      <p class="label" data-identifier="Vidas" data-sufix=" restantes" id="vidas"></p>
  </panel>

  <div id="tabuleiro">
    <div id="skier"></div>
  </div>

</div>

<?php

$this->registerCssFile( $skifreepaths['css'] . 'layout.css', ['position' => $this::POS_END] );
$this->registerCssFile( $skifreepaths['css'] . 'skier.css', ['position' => $this::POS_END] );
$this->registerCssFile( $skifreepaths['css'] . 'obstacles.css', ['position' => $this::POS_END] );

$this->registerJsFile( $skifreepaths['lib'] . 'utils.js');
$this->registerJsFile( $skifreepaths['models'] . 'ObjectPool.js');
$this->registerJsFile( $skifreepaths['models'] . 'Obstaculo.js');
$this->registerJsFile( $skifreepaths['models'] . 'Yeti.js');
$this->registerJsFile( $skifreepaths['models'] . 'Skier.js');
$this->registerJsFile( $skifreepaths['models'] . 'Tabuleiro.js');
$this->registerJsFile( $skifreepaths['root'] . 'skifree.js');

?>
