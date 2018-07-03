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
        return $this->render('index', [
            'skifreepaths' => self::SKIFREE_PATHS
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
        if (Yii::$app->user->isGuest) return 0;
        // return "Deu certo " . Yii::$app->user->identity->username;

        $user_id = Yii::$app->user->id; // classe \yii\web\User
        $jogada = Jogada::findOne(['id_user' => $user_id]);

        if ($jogada !== null) {
            // manter apenas a pontuação mais alta do usuário
            if ($pontuacao > $jogada->pontuacao) {
                $jogada->pontuacao = $pontuacao;
                $jogada->created_at = time();

                if (!$jogada->update()) {
                    var_dump($jogada->errors);
                    die();
                }
            }
        } else {
            $jogada = new Jogada();
            $jogada->id_user = $user_id;
            $jogada->pontuacao = $pontuacao;

            if (!$jogada->save()) {
                var_dump($jogada->errors);
                die();
            }
        }

        // return "Pontuação " . $jogada->pontuacao;
        return "deu certo";
    }

}
