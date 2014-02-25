<?php
namespace Saveserials;

use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Saveserials\Model\User;
use Saveserials\Model\UserTable;
use Saveserials\Model\Serial;
use Saveserials\Model\SerialTable;

 class Module implements AutoloaderProviderInterface, ConfigProviderInterface
 {
     public function getAutoloaderConfig()
     {
         return array(
             'Zend\Loader\ClassMapAutoloader' => array(
                 __DIR__ . '/autoload_classmap.php',
             ),
             'Zend\Loader\StandardAutoloader' => array(
                 'namespaces' => array(
                     __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                 ),
             ),
         );
     }

     public function getConfig()
     {
         return include __DIR__ . '/config/module.config.php';
     }

     public function getServiceConfig()
     {
         return array(
             'factories' => array(
                 'UserTable' => function($sm){
                         $gateway = $sm->get('UserTableGateway');
                         return new UserTable($gateway);
                     },
                 'UserTableGateway' => function($sm){
                         $adapter = $sm->get('Zend\Db\Adapter\Adapter');
                         $defaultResultSet = new ResultSet();
                         $defaultResultSet->setArrayObjectPrototype(new User);
                         return new TableGateway('user', $adapter, null, $defaultResultSet);
                     },
                 'SerialTable' => function($sm){
                         $gateway = $sm->get('SerialTableGateway');
                         return new SerialTable($gateway);
                     },
                 'SerialTableGateway' => function($sm){
                         $adapter = $sm->get('Zend\Db\Adapter\Adapter');
                         $defaultResultSet = new ResultSet();
                         $defaultResultSet->setArrayObjectPrototype(new Serial);
                         return new TableGateway('serial', $adapter, null, $defaultResultSet);
                     }
             )
         );
     }
 }
