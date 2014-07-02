<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2013 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Saveserials\Controller;

use Saveserials\Model\Serial;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Storage\ArrayStorage;
use Zend\View\Model\JsonModel;
use Zend\View\Model\ViewModel;
use Saveserials\Form\RegisterForm;
use Saveserials\Form\LoginForm;
use ZendService\ReCaptcha\ReCaptcha;
use Saveserials\Model\User;
use Zend\Session\SessionManager;
use Zend\Session\Storage\SessionArrayStorage;
use Zend\Http\Header\SetCookie;
use Zend\Session\Config\StandardConfig;

class SaveserialsController extends AbstractActionController
{
    public function indexAction()
    {
        $formLogin = new LoginForm();
        $formRegister = new RegisterForm();
        $recaptcha = $this->createRecaptcha();

        return array(
            'formLogin' => $formLogin,
            'formRegister' => $formRegister,
            'recaptcha' => $recaptcha
        );
    }

    public function translateAction()
    {
        $this->startSessionIfNone();
        $post = $this->getRequest()->getPost();
        if($post->get('language') != null) {
            $language = $post->get('language');
            $_SESSION['language'] = $language;
            return new JsonModel(array('language' => $language));
        }else{
            if(isset($_SESSION['language'])){
                return new JsonModel(array('language' => $_SESSION['language']));
            }else{
                $_SESSION['language'] = 'ru';
                return new JsonModel(array('language' => 'ru'));
            }
        }
    }

    public function autologinAction()
    {
        $this->startSessionIfNone();
        if(!isset($_SESSION['login'])) {
            return;
        }
        $post = $this->getRequest()->getPost();
        $userTable = $this->getServiceLocator()->get('UserTable');
        $user = $userTable->getUserByLogin($_SESSION['login']);
        $post->set('nick', $user->login);
        $post->set('pass', $user->pass);
        $post->set('sessionStart', true);
        $this->forward()->dispatch('Saveserials\Controller',array('action'=>'login' ));
        return new JsonModel($post->get('responseData'));
    }

    public function loginAction()
    {
        $this->startSessionIfNone();
        $request = $this->getRequest();
        $post = $request->getPost();
        $serviceManager = $this->getServiceLocator();
        $userTable = $serviceManager->get('UserTable');
        $pass = null;
        $user = null;
        $sessionStarted = false;
        if(isset($_SESSION['login'])){
            $user = $userTable->getUserByLogin($_SESSION['login']);
            $pass = $user->pass;
            $sessionStarted = true;
        }else{
            $login = $post->get('nick');
            $user = $userTable->getUserByLogin($login);
            $pass = $post->get('pass');
        }
        $responseData = array();
        if($user) {
            $responseData['login'] = true;
            $responseData['userName'] = $user->login;
            $responseData['userID'] = $user->id;
            if($user->pass !== $pass) {
                $responseData['pass'] = false;
            }else{
                $responseData['pass'] = true;
                $serailTable = $serviceManager->get('SerialTable');
                $userSerials = $serailTable->getUserData($user->id);
                $responseData['userData'] = $userSerials->toArray();
                $autoLogin = $post->get('saveNick');
                $notAutoLogin = !$sessionStarted && $autoLogin === "1";
                if($notAutoLogin){
                    $_SESSION['login'] = $user->login;
                }elseif($sessionStarted){
                    $post->set('responseData',$responseData);
                }
            }
        }else{
            $responseData['login'] = false;
        }
        return new JsonModel($responseData);
    }


    public function logoutAction()
    {
        $this->sessionDestroy();
        return new JsonModel();
    }

    public function saveAction()
    {
        $reguest = $this->getRequest();
        $post = $reguest->getPost();
        $serialsArray = $post->get('data');

        $serials = array();
        for($x=0; $x < count($serialsArray); $x++){
            $curSerial = $serialsArray[$x];
            $serial = new Serial();
            $serial->userID = $post->get('userID');
            $serial->serialID = $curSerial['id'];
            $serial->name = $curSerial['name'];
            $serial->season = $curSerial['season'];
            $serial->episode = $curSerial['episode'];
            $serials[] = $serial;  
        }
        $serialTable = $this->getServiceLocator()->get('SerialTable');
        $serialTable->updateAllUserData($serials, $post->get('userID'));
        return new JsonModel();
    }

    public function registerAction()
    {
        $reguest = $this->getRequest();
        $post = $reguest->getPost();
        $userTable = $this->getServiceLocator()->get('UserTable');
        $recaptcha = $this->createRecaptcha();
        $login = $post->get('nick');
        $pass = $post->get('pass');
        $pass2 = $post->get('pass2');       
        $captchaRes = $recaptcha->verify(
            $post->get('recaptcha_challenge_field'),
            $post->get('recaptcha_response_field')
        );
        $captchaValid = $captchaRes->isValid();
        $correctLogin = false;
        $correctCaptcha = false;
        $correctPassword = false;
        if(!$userTable->userExists($login) && $login!= null){
            $correctLogin = true;
        }
        if($pass === $pass2) {
            $correctPassword = true;
        }
        if($captchaValid) {
            $correctCaptcha = true;
        }
        $responseData = array(
            'userName' => $login,
            'login'=>$correctLogin,
            'pass' =>$correctPassword,
            'captcha'=>$correctCaptcha
        );
        if($this->correctAllData($responseData)){
            $user = new User();
            $user->login = $login;
            $user->pass = $pass;
            $userTable->addUser($user);
            $responseData['userID'] = $userTable->getUserByLogin($login)->id;
            $this->sessionDestroy();
            $this->startSessionIfNone();
            $_SESSION['login'] = $login;
        }
        return new JsonModel($responseData);
    }

    public function testAction()
    {
        return array('text' => 'Ура заработало!');
    }

    public function demoAction()
    {
        return array('text' => 'Ура заработало!');
    }

    public function createRecaptcha()
    {
        $pubKey = '6LciaewSAAAAACxUG19X7S8FY4LbKXKYWsxYrhrC';
        $privKey = '6LciaewSAAAAADV0ZOGcy9_Tf1tfcYaGHrGZZGeH ';
        $recaptcha = new ReCaptcha($pubKey, $privKey);
        $recaptcha->setOption('theme', 'white');
        return $recaptcha;
    }

    public function correctAllData($array)
    {
        foreach ($array as $el) {
            if(!$el){
                return false;
            }
        }
        return true;
    }

    public function startUserSession($data, $newSession)
    {
        if($newSession){
            $this->sessionDestroy();
        }

        $week = 3600 * 24 * 7;
        $config = new StandardConfig();
        $config->setOptions(
            array('remember_me_seconds' => $week,)
        );
        $session = new SessionManager(
            $config,
            new ArrayStorage($data));
        $session->start();

    }

    public function sessionDestroy()
    {
        session_start();
        session_unset();
        session_destroy();
    }

    public function startSessionIfNone(){
        if(session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }
}
    