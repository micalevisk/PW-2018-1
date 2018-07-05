<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $jogadas yii\data\ActiveDataProvider */

$this->title = 'Placar dos ' . $qtdMaxima . ' Melhores';

$this->params['breadcrumbs'][] = ['label' => 'Skifree', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>

<h1><?= $this->title ?></h1>

<div class="ranking-index">

  <?= GridView::widget([
      'dataProvider' => $jogadas,
      'columns' => [
        ['class' => 'yii\grid\SerialColumn'],

        [
          'attribute' => 'id_user',
          'class' => 'yii\grid\DataColumn',
          'value' => function ($jogada) {
              return $jogada->user->username;
          }
        ],
        'pontuacao',
        'created_at',
      ],
  ]); ?>

</div>
