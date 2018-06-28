<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\Curso */

$this->title = $model->nome;

$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;

// carrega apenas nesta view; inline script
// https://www.yiiframework.com/doc/api/2.0/yii-web-view#registerJs()-detail
$this->registerJs(
  "console.log('opaaaaaa')",
  $this::POS_HEAD
);
?>
<div class="curso-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Atualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Deletar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Apagar o curso "' . $model->nome . '"?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'nome',
            'sigla',
            'descricao:ntext',
        ],
    ]) ?>

</div>
