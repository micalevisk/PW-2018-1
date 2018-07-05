<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Curso */

$this->title = $model->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->nome, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Atualizar';
?>
<div class="curso-update">

    <h1><?= Html::encode('Atualizar o Curso "' . $model->nome . '"') ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
