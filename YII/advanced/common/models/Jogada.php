<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "jogada".
 *
 * @property int $id
 * @property int $id_user
 * @property int $pontuacao
 * @property string $data_hora
 */
class Jogada extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jogada';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_user', 'data_hora'], 'required'],
            [['id_user', 'pontuacao'], 'integer'],
            [['data_hora'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_user' => 'Id User',
            'pontuacao' => 'Pontuacao',
            'data_hora' => 'Data Hora',
        ];
    }
}
