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
            'id_user' => 'Usuário',
            'pontuacao' => 'Pontuação',
            'created_at' => 'Registrado em',
        ];
    }

    public function getPontuacao()
    {
        return $this->pontuacao;
    }

    public function getUser()
    {
        return $this->hasOne(
            User::className(), ['id' => 'id_user']
        );
    }

    public function beforeSave($tipo)
    {
        // $this->created_at = (new DateTime())->getTimestamp();
        $this->created_at = time();
        return parent::beforeSave($tipo);
    }

    public function afterFind()
    {
      $this->created_at = date('d-m-Y H:i:s', $this->created_at);
    }
}
