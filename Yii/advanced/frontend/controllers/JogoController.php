<?php

namespace frontend\controllers;

use Yii;
use common\models\Jogada;
use yii\data\ActiveDataProvider;

class JogoController extends \yii\web\Controller
{
    const SKIFREE_PATHS = [
        'css' => '@web/skifree/css/',

        'lib' => '@web/skifree/js/lib/',
        'models' => '@web/skifree/js/models/',
        'root' => '@web/skifree/js/'
    ];

    public function actionIndex()
    {
        $generatedCSRFToken = Yii::$app->request->csrfToken;

        return $this->render('index', [
            'skifreepaths' => self::SKIFREE_PATHS,
            'generatedCSRFToken' => $generatedCSRFToken
        ]);
    }

    public function actionRanking()
    {
        $qtdMaxima = 5;
        $jogadas = new ActiveDataProvider([
            'pagination' => false,
            'query' => Jogada::find()
                              ->orderBy(['pontuacao' => SORT_DESC])
                              ->limit($qtdMaxima)
        ]);

        return $this->render('ranking', [
            'jogadas' => $jogadas,
            'qtdMaxima' => $qtdMaxima
        ]);
    }

    /**
     * Salva a pontuação na tabela `jogada` do BD.
     * @param integer $pontuacao
     * @return integer
     */
    public function actionSave($pontuacao)
    {
        if (Yii::$app->user->isGuest
         || !isset($_GET['_csrf-app'])) return 0;

        $jogada = new Jogada();
        $jogada->id_user = Yii::$app->user->id; // classe \yii\web\User
        $jogada->pontuacao = $pontuacao;

        if (!$jogada->save()) {
            var_dump($jogada->errors);
            die();
        }

        return 1;
    }

}
