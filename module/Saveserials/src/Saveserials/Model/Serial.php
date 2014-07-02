<?php
/**
 * Created by PhpStorm.
 * User: Sun
 * Date: 16.01.14
 * Time: 15:55
 */
namespace Saveserials\Model;
class Serial
{
    public $serialID;
    public $userID;
    public $name;
    public $season;
    public $episode;

    public function exchangeArray($data)
    {
        $this->serialID = $data['Serial_ID'];
        $this->userID = $data['User_ID'];
        $this->name = $data['Name'];
        $this->season = $data['Season'];
        $this->episode = $data['Episode'];
    }
    public function toArray()
    {
        return array(
            'Serial_ID' => $this->serialID,
            'User_ID' => $this->userID,
            'Name' => $this->name,
            'Season' => $this->season,
            'Episode' => $this->episode,
        );
    }
} 