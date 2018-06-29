<?php
use yii\helpers\Html;
use yii\helpers\Url;

/* @var $this yii\web\View */

$this->title = YII::$app->name;
?>
<div class="site-index">

    <div class="jumbotron">
        <?= Html::img('@web/img/logo_icomp.png',['width'=>'400']) ?>
        <p class="lead">O Instituto de Computação (IComp), antigo Departamento de Ciência da Computação (DCC),  é um instituto acadêmico que agrega os professores da área de computação. Como todo instituto acadêmico o IComp atua no ensino, pesquisa e extensão, além de desempenhar atividades administrativas.</p>

        <p><a class="btn btn-lg btn-success" href=" <?= Url::to(['jogo/index']) ?> ">Iniciar Jogo</a></p>
    </div>
</div>
