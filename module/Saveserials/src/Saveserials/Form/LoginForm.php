<?php
namespace Saveserials\Form;

use Zend\Form\Element\Checkbox;
use Zend\Form\Form;

class LoginForm extends Form
{
    public function __construct($name = null)
    {
        parent::__construct('loginform');
        $this->add(
            array(
                 'name'       => 'type',
                 'type'       => 'hidden',
                 'attributes' => array(
                     'value'       => 'login',
                 ),
            )
        );
        $this->add(
            array(
                 'name'       => 'nick',
                 'type'       => 'text',
                 'attributes' => array(
                     'id'       => 'loginNick',
                     'required' => true,
                     'class'    => 'text-area inputs'
                 ),
            )
        );

        $this->add(
            array(
                 'name'       => 'pass',
                 'type'       => 'password',
                 'attributes' => array(
                     'id'       => 'loginPass',
                     'required' => true,
                     'class'    => 'text-area inputs'
                 ),
            )
        );
        $this->add(array(
                        'type' => 'Zend\Form\Element\Checkbox',
                        'name' => 'saveNick',
                        'options' => array(
                            'use_hidden_element' => false
                        ),
                        'attributes' => array('id'=>'savenick')
        ));

        $this->add(
            array(
                 'name'       => 'submit',
                 'type'       => 'Submit',
                 'attributes' => array(
                     'value' => 'Вход',
                     'id'    => 'loginSubmit',
                     'class' => 'btn btns-register'
                 ),
            )
        );
        $this->add(
            array(
                 'name'       => 'cancel',
                 'type'       => 'Button',
                 'attributes' => array(
                     'id'    => 'cancel',
                     'class' => 'btn btns-register',
                     'href'  => '#global-div'
                 ),
            )
        );
    }
}
