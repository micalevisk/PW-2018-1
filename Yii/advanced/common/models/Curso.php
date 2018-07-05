<?php

namespace common\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "curso".
 *
 * @property int $id
 * @property string $nome
 * @property string $sigla
 * @property string $descricao
 */
class Curso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'curso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'sigla', 'descricao'], 'required', 'message'=> 'Este campo é obrigatório'],
            [['descricao'], 'string'],
            [['nome'], 'string', 'max' => 45],
            [['sigla'], 'string', 'max' => 4],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'nome' => 'Nome',
            'sigla' => 'Sigla',
            'descricao' => 'Descrição'
        ];
    }


    public function getUsers()
    {
      return $this->hasMany(
        User::className(), ['id_curso' => 'id']
      );
    }

    public function qtdUsuarios()
    {
        return User::find()
                    ->where(['id_curso' => $this->id])
                    ->count();
    }

    public static function cursos()
    {
        $cursos = Curso::find()->all();
        return ArrayHelper::map($cursos, 'id', 'nome');
    }

    /**
     * Executa antes do modelo ser salvo no banco.
     * Normalizar a sigla do curso.
     *
     * @param bool $insert whether this method called while inserting a record.
     * If `false`, it means the method is called while updating a record.
     * @return bool whether the insertion or updating should continue.
     * If `false`, the insertion or updating will be cancelled.
     */
    public function beforeSave($tipo)
    {
      $this->sigla = strtoupper($this->sigla);
      return parent::beforeSave($tipo); // executar o mesmo método do pai
    }

    public function getPrefixoTitle()
    {
        if (!YII::$app->user->isGuest
          && YII::$app->user->identity->id_curso == $this->id) {
            return  '(seu curso) <br>'; // senão, mostrar indica que é o "seu curso"
        }
    }
}
