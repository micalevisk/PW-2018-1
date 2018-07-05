<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\Curso */

$this->title = $model->nome;

$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;

$qtdAlunos = $model->qtdUsuarios();
?>
<div class="curso-view">

    <h1><small><?= $model->prefixoTitle ?></small><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Alunos Cadastrados', ['users', 'id' => $model->id], ['class' => ($qtdAlunos > 0 ? 'enabled' : 'disabled') . ' btn btn-info']) ?>
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
            [
                'label' => 'Número de Alunos',
                'value' => $qtdAlunos
            ]
        ],
    ]) ?>

</div>
