<?php
/**
 * Created by PhpStorm.
 * User: Sun
 * Date: 16.01.14
 * Time: 15:54
 */
namespace Saveserials\Model;
class UserTable
{
    private $tableGateway;

    public function __construct($tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }


    public function getUserByID($id)
    {
        $resultSet = $this->tableGateway->select(array('id'=>$id));
        return $resultSet->current();
    }


    public function getUserByLogin($login)
    {
        $resultSet = $this->tableGateway->select(array('Login'=>$login));
        return $resultSet->current();
    }

    public function userExists($login)
    {
        $resultSet = $this->tableGateway->select(array('Login'=>$login));
        return $resultSet->count() != 0;
    }

    public function addUser($user)
    {
        $this->tableGateway->insert($user->toArray());
    }

    public function saveUser($user)
    {

    }

    public function deleteUser($id)
    {

    }


}