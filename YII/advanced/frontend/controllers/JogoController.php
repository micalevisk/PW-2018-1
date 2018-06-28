<?php

namespace frontend\controllers;

use Yii;
use common\models\Jogada;


class JogoController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionRanking()
    {
        return $this->render('ranking');
    }

    /**
     * @param integer $pontuacao
     */
    public function actionSave($pontuacao)
    {
        // $jogada = new Jogada();
        // $jogada->id_user = Yii::$app->user->id;
        // $jogada->pontuacao = $pontuacao;
        // $jogada->save();
        // return "Deu certo " . Yii::$app->user->getCurso->nome;
        return "Deu certo " . Yii::$app->user->id;

        // return $this->render('save');
    }

}
