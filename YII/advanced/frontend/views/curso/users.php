<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $searchModel common\models\CursoSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Alunos Cadastrados';
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->nome, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $alunos,
        'rowOptions' => function ($m, $key, $index, $grid) {
            return [
                'data-user-href' => Url::to(['user/view']) . '&id=' . $m->id
            ];
        },
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'username',
            'email:email',
            'created_at',
        ],
    ]);

    // Adicionar tag `a` para cada nome de usuário:
    $this->registerJs("
        $('tbody tr[data-user-href] > td:nth-child(2)').each(function (e) {
            const linkToUser = $(this).parent().attr('data-user-href');
            $(this).html('<a title=\'ver perfil\' href='+linkToUser+'>'+$(this).text()+'</a>');
        });
    ");
    ?>
</div>
