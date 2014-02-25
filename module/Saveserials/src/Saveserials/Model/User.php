<?php
namespace Saveserials\Model;
class User
{
    public $id;
    public $login;
    public $pass;

    public function exchangeArray($data)
    {
        $this->id = $data['User_ID'];
        $this->login = $data['Login'];
        $this->pass = $data['Pass'];
    }

    public function toArray()
    {
        return array('login'=> $this->login, 'pass' => $this->pass);
    }
} 