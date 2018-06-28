<?php

namespace common\models;

use Yii;

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
            'descricao' => 'Descrição',
        ];
    }


    /**
     *
     * @return bool
     */
    public function getUsers()
    {
      return $this->hasMany(
        Users::className(), ['id_curso' => 'id']
      );
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
}
