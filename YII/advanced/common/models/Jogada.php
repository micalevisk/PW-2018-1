<?php
namespace common\models;

use Yii;

/**
 * This is the model class for table "jogada".
 *
 * @property integer $id
 * @property integer $id_user
 * @property float   $pontuacao
 * @property integer $created_at
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
            [['id_user', 'pontuacao'], 'required'],
            [['id_user', 'created_at'], 'integer'],
            // [['created_at'], 'safe'],
            [['id_user'], 'exist',
                          'skipOnError' => true,
                          'targetClass' => User::className(),
                          'targetAttribute' => ['id_user' => 'id']]
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
            'pontuacao' => 'Pontuação',
            'created_at' => 'Adicionado em',
        ];
    }
}
