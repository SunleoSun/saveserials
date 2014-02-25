<?php
return array(
     'controllers' => array(
         'invokables' => array(
             'Saveserials\Controller' =>'Saveserials\Controller\SaveserialsController',
         ),
     ),
     'router' => array(
         'routes' => array(
             'index' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/',
                     'constraints' => array(
                         'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                         'id'     => '[0-9]+',
                     ),
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'index',
                     ),
                 ),
             ),  
             'test' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/test',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'test',
                     ),
                 ),
             ),
             'demo' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/demo',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'demo',
                     ),
                 ),
             ),
             'login' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/login',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'login',
                     ),
                 ),
             ),
             'logout' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/logout',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'logout',
                     ),
                 ),
             ),
             'save' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/save',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'save',
                     ),
                 ),
             ),
             'autologin' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/autologin',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'autologin',
                     ),
                 ),
             ),
             'register' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/register',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'register',
                     ),
                 ),
             ),
             'translate' => array(
                 'type'    => 'segment',
                 'options' => array(
                     'route'    => '/translate',
                     'defaults' => array(
                         'controller' => 'Saveserials\Controller',
                         'action'     => 'translate',
                     ),
                 ),
             ),
         ),
     ),

     'view_manager' => array(
	'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
         'template_path_stack' => array(
             'Saveserials' => __DIR__ . '/../view',
             'Saveserials\Saveserials' => __DIR__ . '/../view/Saveserials/Saveserials',
         ),
         'template_map' => array(
            'saveserials/saveserials/index' => __DIR__ . '/../view/Saveserials/Saveserials/index.phtml' ,
            'Saveserials\Saveserials\context.phtml' => __DIR__ . '/../view/Saveserials/Saveserials/context.phtml',
            'Saveserials\Saveserials\register.phtml' => __DIR__ . '/../view/Saveserials/Saveserials/register.phtml',
            'Saveserials\Saveserials\login.phtml'=> __DIR__ . '/../view/Saveserials/Saveserials/login.phtml',
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
         ),
         'strategies' => array(
             'ViewJsonStrategy',
         ),
     ),
    
    'translator' => array(
        'locale' => 'en_US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
 );

