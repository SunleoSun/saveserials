<?php
namespace Saveserials\Form;

 use Zend\Form\Form;

 class RegisterForm extends Form
 {
     public function __construct($name = null)
     {
         parent::__construct('registerform');
         $this->add(
             array(
                  'name'       => 'type',
                  'type'       => 'hidden',
                  'attributes' => array(
                      'value'       => 'register',
                  ),
             )
         );
         $this->add(array(
             'name' => 'nick',
             'type' => 'text',
             'attributes' => array(
                 'id' => 'registerNick',
                 'required'  => true,
                 'class' => 'text-area inputs'
             ),
         ));
         
         $this->add(array(
             'name' => 'pass',
             'type' => 'password',
             'attributes' => array(
                 'id' => 'registerPass',
                 'required'  => true,
                 'class' => 'text-area inputs' 
                 ),
         ));
         
         $this->add(array(
             'name' => 'pass2',
             'type' => 'password',
             'attributes' => array( 
                 'id' => 'registerPass2',
                 'required'  => true,
                 'class' => 'text-area inputs'
                 ),
         ));



         $this->add(array(
             'name' => 'submit',
             'type' => 'submit',
             'attributes' => array(
                 'value' => 'Регистрация',
                 'id' => 'registerSubmit',
                 'class' => 'btn btns-register'
             ),
         ));
         $this->add(array(
             'name' => 'cancel',
             'type' => 'Button',
             'attributes' => array(
                 'id' => 'cancel',
                 'class' => 'btn btns-register',
                 'href' => '#global-div'
             ),
         ));
     }
 }
