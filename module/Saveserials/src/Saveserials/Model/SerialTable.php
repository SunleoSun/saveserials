<?php
/**
 * Created by PhpStorm.
 * User: Sun
 * Date: 16.01.14
 * Time: 15:55
 */
namespace Saveserials\Model;
class SerialTable
{
    private $tableGateway;

    public function __construct($tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function getUserData($userId)
    {
        return $this->tableGateway->select(array('User_ID'=>$userId));
    }

    public function updateSerial($serial)
    {
        $this->tableGateway->update(
            array(
                 'Name'=>$serial->name,
                 'Season'=>$serial->season,
                 'Episode'=>$serial->episode,
            ),
            array('Serial_ID' => $serial->serialID)
        );
    }

    public function addSerial($serial)
    {
        $data = array(
            'User_ID' => $serial->userID,
            'Name' => $serial->name,
            'Season' => $serial->season,
            'Episode' => $serial->episode,
        );
        if(is_numeric($serial->serialID)) {
            $data['Serial_ID'] = $serial->serialID;
        }
        $this->tableGateway->insert($data);
    }

    public function updateAllUserData($arrSerials, $userID)
    {
        $this->tableGateway->delete(array('User_ID'=>$userID));

        foreach($arrSerials as $serial){
            $this->addSerial($serial);
        }
    }
} 