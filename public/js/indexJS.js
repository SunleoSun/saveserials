
$(function () {
    slideContext = slideContextDiv;
    var contextDiv = $('#global-context-div');
    contextDiv.css({position: 'relative', display: 'none', left: '100%'});
    $.ajax({
        type: 'POST',
        url: '/translate',
        success: function(data){
            document._lang = data['language'];
            changeLanguage(data['language']);
        },
        error: function( jqXHR, textStatus, errorThrown){
            alert(textStatus + " " + errorThrown);
        }
    });
    
    $('#registerform').submit(function (e) {
        e = e || window.event;
        e.preventDefault();
        var postData = $('#registerform').serialize();
        postData = decodeURIComponent(postData);
        postData = passEncr('pass', postData);
        postData = passEncr('pass2', postData);
        showLoader();
        $.ajax({
            type: 'POST',
            url: '/register',
            data: postData,
            success: function(data){
                hideLoader();
                if(!checkRegisterData(data)){
                    return;
                }
                hideMessageBoxes();
                $('.list-el').remove();
                hideButtons(false);
                var serialData = createDefaultSerialsData(3);
                createUserSerials(serialData, $('.serial-list'));
                slideContextDiv();
                greeting(data['userName']);
                createUserIDHidden(data['userID']);
            },
            
            error: function( jqXHR, textStatus, errorThrown){
                $('body').html(jqXHR.responseText);
            }
        });
    });

    $('#loginform').submit(function (e) {
        e = e || window.event;
        e.preventDefault();

        var postData = $('#loginform').serialize();
        postData = decodeURIComponent(postData);
        postData = passEncr('pass', postData);
        showLoader();
        $.ajax({
            type: 'POST',
            url: '/login',
            data: postData,
            success: function(data){
                hideLoader();
                if(!checkLoginData(data)){
                    return;
                }
                hideMessageBoxes();
                createUserSerials(data, $('.serial-list'));
                hideButtons(false);
                updateHeightPage();
                slideContextDiv();
                greeting(data['userName']);
                createUserIDHidden(data['userID']);
            },
            error: function( jqXHR, textStatus, errorThrown){
                $('body').html(jqXHR.responseText);
            }
        });

        function checkLoginData(data){
            removeErrorMessages($('#border-login'));
            var res = true;
            if(document._lang === 'ru'){
                if(realFalse(data['login'])){
                    addErrorMessage('Такого логина не существует!', $('#loginNick'), $('#border-login'));
                    res = false;
                }else if(realFalse(data['pass'])){
                    addErrorMessage('Пароль не верен!', $('#loginPass'), $('#border-login'));
                    res = false;
                }
            }
            if(document._lang == 'en'){
                if(realFalse(data['login'])){
                    addErrorMessage(translate('Такого логина не существует!'), $('#loginNick'), $('#border-login'));
                    res = false;
                }else if(realFalse(data['pass'])){
                    addErrorMessage(translate('Пароль не верен!'), $('#loginPass'), $('#border-login'));
                    res = false;
                }
            }
            return res;
        }
    });

    $('#btn-demo').click(function(){
        var data = createDefaultSerialsData(30);
        createUserSerials(data, $('.serial-list'));
        hideButtons(true);
        emptyGreeting();
        updateHeightPage();
        scrollToTop();
        slideContextDiv();
    });


    $('.btn-right').mousedown(function () {
            $(this).addClass('btn-index-down');
        }
    );

    $('.btn-right').mouseup(function () {
            $(this).removeClass('btn-index-down');
        }
    );

    $('#loginSubmit, #registerSubmit, #cancel').mousedown(function () {
            $(this).addClass('btn-form-down');
        }
    );

    $('#loginSubmit, #registerSubmit, #cancel').mouseup(function () {
            $(this).removeClass('btn-form-down');
        }
    );

    $('#btn-register').click(function () {
        scrollToTop();
        $('#backgroundShadow,#border-register').css({'display': 'block'});
    });

    $('#btn-login').click(function () {
        scrollToTop();
        $('#backgroundShadow, #border-login').css({'display': 'block'});
    });

    $('#backgroundShadow, #cancel').click(function () {
        removeErrorMessages($('#border-login'));
        removeErrorMessages($('#border-register'));
        hideMessageBoxes();
    });

    $('#btn-logout').click(function(){
        showLoader();
        $.ajax({
            type: 'POST',
            url: '/logout',
            success: function(){
                hideLoader();
                slideIndexDiv(function(){
                    $('.list-el').remove();
                    emptyGreeting();
                    deleteUserIDHidden();
                    updateHeightPage();
                });
            }
        });
    });



    $('#btn-create').click(function (){
        var data = [];
        data['Name'] = 'New Serial';
        data['Season'] = 1;
        data['Episode'] = 1;
        $('.serial-list').append(createSerial(data, true));
        addHandlersToSerials($('.list-el').last());

        updateHeightPage();
        var el = $('.list-el').first();
        var heightEl =
            parseInt(el.css('height')) +
            parseInt(el.css('marginTop')) +
            parseInt(el.css('marginBottom'));
        var lastSerialPosition = $('.serial-list input').last().offset().top + heightEl;
        var serialNotVisible =
            lastSerialPosition < $('html').scrollTop() ||
                lastSerialPosition > $('html').scrollTop() + $(window).height();
        if(serialNotVisible){
            $('html').animate(
                {scrollTop :  lastSerialPosition - $(window).height()},
                500
            );
        }
    });

    $('#btn-save').click(function (){

        function errorMessagePopup(el, message){
            var div = '<div class="error-message-popup">' + message +'</div><div class="arrow"></div>';
            var offset = el.offset();
            el.after(div);
            var errMessage = $('.error-message-popup');
            var topPopupCoor = offset.top - parseInt(errMessage.css('height')) - 45;
            errMessage.css({
                left : offset.left - 10,
                top : topPopupCoor,
                opacity : 0
            });
            $('.arrow').css({
                left : offset.left + 20,
                top : offset.top - 23,
                opacity : 0
            });
            var popup = $('.error-message-popup, .arrow');
            popup.animate(
                {opacity : 1},
                {duration : 1000}
            );
            setTimeout(function(){
                popup.animate(
                    {opacity : 0},
                    {duration : 3000}
                );}
                , 5000);
            var popupNotVisible =
                offset.top < $('html').scrollTop() ||
                offset.top > $('html').scrollTop() + $(window).height();
            if(popupNotVisible){
                $('html').animate({scrollTop : topPopupCoor}, 200);
            }
        }

        $('.error-message-popup, .arrow').remove();
        var serials = [],
            serialsDivs = $('.list-el'),
            objData = {data : serials, userID : $('[name="userID"]')[0].value};
        for(var x = 0; x < serialsDivs.length; x++){
            var curSerialDiv = serialsDivs[x];
            var serial = {
                id : curSerialDiv.childNodes[0].value,
                name : curSerialDiv.childNodes[1].value,
                season : curSerialDiv.childNodes[2].value,
                episode : curSerialDiv.childNodes[4].value
            }
            var incorrectSeason = !isNumeric(serial.season),
                incorrectEpisode = !isNumeric(serial.episode);

            if(incorrectSeason || incorrectEpisode){
                if (incorrectSeason) {
                    errorMessagePopup(
                        serialsDivs.eq(x).find('[name="season"]'),
                        'Введите корректный номер сезона'
                    );
                    return;
                }
                if (incorrectEpisode) {
                    errorMessagePopup(
                        serialsDivs.eq(x).find('[name="episode"]'),
                        'Введите корректный номер эпизода'
                    );
                    return;
                }
            }
            serials[x] = serial;
        }
        showLoader();
        $.ajax({
            type: 'POST',
            url: '/save',
            data : objData,
            success: function(){
                hideLoader();
                var popup = $('.save-popup');
                if (document._lang === 'ru') {
                    popup.text('Данные сохранены!');
                }else{
                    popup.text(translate('Данные сохранены!'));
                }
                $('.save-popup').css({display: 'block'});
                $('.save-popup').animate({opacity: 1},{duration:1000, complete: function (){
                    $('.save-popup')
                            .animate(
                                {opacity:0}, 
                                {duration:2000, easing:'easeInExpo', complete:function (){
                                    $('.save-popup').css({display: 'none'});
                    }});
                }});
            },
            
            error: function( jqXHR, textStatus, errorThrown){
                $('body').html(jqXHR.responseText);
            }
            
        });
    });

    $('#btn-back').click(function(){
        slideIndexDiv(function(){
            $('.list-el').remove();
            updateHeightPage();
        });
    });

    $('.trig').click(function(){
        var lang;
        if (document._lang === 'en') {
            lang = 'ru';
        } else {
            lang = 'en';
        }
        showLoader();
        $.ajax({
            type: 'POST',
            url: '/translate',
            data: {'language': lang},
            success: function(data){
                hideLoader();
                document._lang = data['language'];
                changeLanguage(data['language']);
            }
        });
    });

    function createDefaultSerialsData(count){
        var data = [];
        var userData = [];
        for(var x = 0; x < count; x++){
            var serialData = [];
            serialData['Name'] = 'My Serial ' + x;
            serialData['Season'] = 1;
            serialData['Episode'] = 1;
            userData[x] = serialData;
        }
        data['userData'] = userData;
        return data;
    }

    function addErrorMessage(message, el, border) {
        var div = '<div class="error-message">'+ message +'</div>';
        el.before(div);
        border.css({height: '+=34px'});
    }

    function removeErrorMessages(border){
        var errors = border.find('.error-message');
        var countMessages = errors.length;
        if(countMessages>0){
            errors.remove();
            border.css({height: '-='+ 34 * countMessages +'px'});
        }
    }

    function realFalse(el){
        return el !== undefined && el === false;
    }

    function checkRegisterData(data){
        var borderRegister = $('#border-register');
        removeErrorMessages(borderRegister);
        var res = true;
        if(document._lang == 'ru'){
            if(realFalse(data['login'])){
                addErrorMessage('Такой логин уже существует!',$('#registerNick'), borderRegister);
                res = false;
            }
            if(realFalse(data['pass'])){
                addErrorMessage('Пароли не совпадают!',$('#registerPass2'), borderRegister);
                res = false;
            }
            if(realFalse(data['captcha'])){
                addErrorMessage('Проверочный код не верен!',$('#captcha'), borderRegister);
                res = false;
            }
        }
        if(document._lang == 'en'){
            if(realFalse(data['login'])){
                addErrorMessage(translate('Такой логин уже существует!'), $('#registerNick'), borderRegister);
                res = false;
            }
            if(realFalse(data['pass'])){
                addErrorMessage(translate('Пароли не совпадают!'), $('#registerPass2'), borderRegister);
                res = false;
            }
            if(realFalse(data['captcha'])){
                addErrorMessage(translate('Проверочный код не верен!'), $('#captcha'), borderRegister);
                res = false;
            }
        }
        if( data['login']== undefined ||
            data['pass'] == undefined ||
            data['captcha'] == undefined){
            res = false;
        }
        return res;
    }

    function passEncr(passKey, sting){
        var indexPassKey = sting.indexOf(passKey);
        var indexStartValue = indexPassKey + passKey.length + 1;
        var indexAmpersand = sting.indexOf('&',indexPassKey);
        if(indexAmpersand == -1){
            indexAmpersand = sting.length;
        }
        var value = sting.substring(indexStartValue, indexAmpersand);
        var passEncr = $.md5(value);
        var newString = sting.replace(
            new RegExp(passKey + '=' + value),
            passKey + '=' + passEncr);
        return newString;
    }


    function hideMessageBoxes(){
        $('#backgroundShadow,#border-register,#border-login').css({'display': 'none'});
    }

    function slideContextAndIndex(indexPosition,contextPosition,firstIndexAnimate, complete) {
        if(firstIndexAnimate){
            $('#global-index-div')
                .css({position: 'absolute'})
                .animate({left: indexPosition}, {duration: 1300,
                    complete: function () {
                        $('#global-index-div').css({display: 'none'});

                    }
                });
            contextDiv
                .css({display: 'block'})
                .animate({left: contextPosition}, {duration: 1300,
                    complete: function () {
                        contextDiv.css({position: 'relative', top:'-20px'});
                        if(complete){
                            complete();
                        }
                    }
            });
        }else{
            contextDiv
                .css({position: 'absolute',top:'0px'})
                .animate({left: contextPosition}, {duration: 1300,
                    complete: function () {
                        contextDiv.css({display: 'none'});
                    }
            });
            $('#global-index-div')
                .css({display: 'block'})
                .animate({left: indexPosition}, {duration: 1300,
                    complete: function () {
                        $('#global-index-div').css({position: 'relative'});
                        if(complete){
                            complete();
                        }
                    }
            });
        }
    }

    function slideContextDiv(complete) {
        slideContextAndIndex('-100%','0%',true, complete);
    }
    function slideIndexDiv(complete) {
        slideContextAndIndex('0%','100%',false, complete);
    }
});

function changeLanguage(lang){
    switch (lang){
        case 'ru':
            $('.save-popup').text('Данные сохранены!');
            $('#greeting').children().first().text('Добро пожаловать, ');
            if (islteIE8()) {
                $('.trig').css({filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="../img/trig-ru_cr.png", sizingMethod="scale")'});
            }else{
                $('.trig').css({backgroundImage: 'url(img/trig-ru_cr.png)'});
            }
            $('form[id="loginform"]').children()
                .eq(1).text('Введите ваш логин:')
                .parent().children().eq(3).text('Введите пароль:')
                .parent().children().eq(5).html('<input type="checkbox" name="saveNick" id="savenick" value="1">Автоматический вход')
                .parent().children().eq(-2).val('Вход')
                .parent().children().last().text('Отмена');
            $('form[id="registerform"]').children()
                .eq(1).text('Введите ваш логин:')
                .parent().children().eq(3).text('Введите пароль:')
                .parent().children().eq(5).text('Повторите пароль:')
                .parent().children().eq(-2).val('Регистрация')
                .parent().children().last().text('Отмена');
            $('#btn-logout').text('Выйти');
            $('#btn-save').text('Сохранить');
            $('#btn-create').text('Создать');
            $('#btn-back').text('Назад');
            $('#table-label-name').text('Название сериала');
            $('#table-label-season').text('Номер сезона');
            $('#table-label-episode').text('Номер серии');
            $('#table-label-delete').text('Удалить сериал');
            $('#btn-demo').text('Демо');
            $('#btn-login').text('Вход');
            $('#btn-register').text('Регистрация');
            $('#text').children()
                .first().text('Для кого этот сайт?')
                .next().text('Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.')
                .next().text('Как работает этот сайт?')
                .next().text('Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку "Демо".')
                .next().text('Возможности сайта')
                .next().text('Здесь, на сайте, вы сможете сохранять:')
                .next().children().first().text('Названия ваших сериалов')
                .next().text('Номера текущих просматриваемых сезонов')
                .next().text('Номера последних просмотренных серий')
                .parent().next().text('Как зарегистрироваться?')
                .next().text('Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку "Регистрация", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)');
            break;
        case 'en':
            $('.save-popup').text(translate('Данные сохранены!'));
            $('#greeting').children().first().text(translate('Добро пожаловать, '));
            if (islteIE8()) {
                $('.trig').css({filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="../img/trig-en_cr.png", sizingMethod="scale")'});
            }else{
                $('.trig').css({backgroundImage: 'url(img/trig-en_cr.png)'});
            }
            $('form[id="loginform"]').children()
                .eq(1).text(translate('Введите ваш логин:'))
                .parent().children().eq(3).text(translate('Введите пароль:'))
                .parent().children().eq(5).html('<input type="checkbox" name="saveNick" id="savenick" value="1">'+translate('Автоматический вход'))
                .parent().children().eq(-2).val(translate('Вход'))
                .parent().children().last().text(translate('Отмена'));
            $('form[id="registerform"]').children()
                .eq(1).text(translate('Введите ваш логин:'))
                .parent().children().eq(3).text(translate('Введите пароль:'))
                .parent().children().eq(5).text(translate('Повторите пароль:'))
                .parent().children().eq(-2).val(translate('Регистрация'))
                .parent().children().last().text(translate('Отмена'));
            $('#btn-logout').text(translate('Выйти'));
            $('#btn-save').text(translate('Сохранить'));
            $('#btn-create').text(translate('Создать'));
            $('#btn-back').text(translate('Назад'));
            $('#table-label-name').text(translate('Название сериала'));
            $('#table-label-season').text(translate('Номер сезона'));
            $('#table-label-episode').text(translate('Номер серии'));
            $('#table-label-delete').text(translate('Удалить сериал'));
            $('#btn-demo').text(translate('Демо'));
            $('#btn-login').text(translate('Вход'));
            $('#btn-register').text(translate('Регистрация'));
            $('#text').children()
                .first().text(translate('Для кого этот сайт?'))
                .next().text(translate('Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.'))
                .next().text(translate('Как работает этот сайт?'))
                .next().text(translate('Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку "Демо".'))
                .next().text(translate('Возможности сайта'))
                .next().text(translate('Здесь, на сайте, вы сможете сохранять:'))
                .next().children().first().text(translate('Названия ваших сериалов'))
                .next().text(translate('Номера текущих просматриваемых сезонов'))
                .next().text(translate('Номера последних просмотренных серий'))
                .parent().next().text(translate('Как зарегистрироваться?'))
                .next().text(translate('Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку "Регистрация", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)'));
            break;
        default :
            return;
    }
}

function translate(text){
    var dictionary = {
        'Проверочный код не верен!' : 'Verification code is not correct!',
        'Пароли не совпадают!' : 'Passwords are not equal!',
        'Такой логин уже существует!': 'This login already exist!',
        'Такого логина не существует!' : 'This login does not exist!',
        'Пароль не верен!' : 'Password is incorrect!',
        'Данные сохранены!' : 'Data saved!',
        'Добро пожаловать, ' : 'Welcome, ',
        'Автоматический вход' : 'Autologin',
        'Введите ваш логин:' : 'Enter your login:',
        'Введите пароль:' : 'Enter password',
        'Повторите пароль:' : 'Repeate password',
        'Отмена' : 'Cancel',
        'Демо': 'Demo',
        'Вход' : 'Login',
        'Регистрация': 'Register',
        'Выйти': 'Logout',
        'Сохранить' : 'Save',
        'Создать' : 'Create',
        'Назад' : 'Back',
        'Название сериала' : 'Serial name',
        'Номер сезона' : 'Season number',
        'Номер серии' : 'Episode number',
        'Удалить сериал' : 'Delete serial',
        'Для кого этот сайт?': 'For who is this site?',
        'Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.' : 'This site was created for people who constantly forget in what series they stopped when watching their favorite TV serials.',
        'Как работает этот сайт?' : 'How works this site?',
        'Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку "Демо".' : 'To see an example of how works this site, click "Demo".',
        'Возможности сайта' : 'Site features',
        'Здесь, на сайте, вы сможете сохранять:' : 'Here on the website, you can save:',
        'Названия ваших сериалов' : 'Names of your serials',
        'Номера текущих просматриваемых сезонов' : 'Numbers of current watching seasons',
        'Номера последних просмотренных серий' : 'Numbers of recently viewed episodes',
        'Как зарегистрироваться?' : 'How to register?',
        'Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку "Регистрация", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)' : 'If you decide to use this site to store your lists of serials, click "Register", enter data your account and use nazdorove. :)'
    }
    return dictionary[text];
}

$(window).load(function () {
    if(!islteIE8()){
        //Начинаем анимации
        $('.logo-img').show({effect: 'fade', duration: 1500,
            complete: function () {
                animBtnAppear($('#btn-demo'));
                setTimeout(
                    function (){
                        animBtnAppear($('#btn-login'))
                        setTimeout(
                            function (){
                                animBtnAppear($('#btn-register'));
                                setTimeout(
                                    function (){
                                        $.ajax({
                                            type: 'POST',
                                            url: '/autologin',
                                            success: function(data){
                                                if(!data['userName']){
                                                    return;
                                                }
                                                createUserSerials(data, $('.serial-list'));
                                                hideButtons(false);
                                                updateHeightPage();
                                                slideContext();
                                                greeting(data['userName']);
                                                createUserIDHidden(data['userID']);
                                            }
                                        });
                                    }
                                    , 1500);
                            }
                            , 300);
                    },
                    300
                );


        }});
    }
});

function scrollToTop(){      
    $('html').animate({scrollTop: '0'},{duration:500});
}

function animBtnAppear(el) {
        el.animate(
            {'marginLeft': '0'},
            {duration: 1500, 'easing': 'easeInOutBack', complete: function(){
                //el.removeAttr('style');
            }}
        );

}

function greeting(name){
    $('#greeting').css({display:'block'});
    $('#greeting b').text(name);
}

function emptyGreeting(){
    $('#greeting').css({display:'none'});
}

function islteIE8(){
    var isIE = (document.querySelector || window.XMLHttpRequest ||
        document.compatMode);
    var isIE9orBigger = document.addEventListener;
    return isIE && !isIE9orBigger;
}

function hideButtons(isDemo){
    if(isDemo){
        $('#btn-logout').css({display:'none'});
        $('#btn-save').css({display:'none'});
        $('#btn-create').css({display:'none'});
        $('#btn-back').css({display:'block'});
    }else{
        $('#btn-logout').css({display:'block'});
        $('#btn-save').css({display:'block'});
        $('#btn-create').css({display:'block'});
        $('#btn-back').css({display:'none'});
    }

}

var slideContext;

function createInput(name,type,_class, value){
    value = value ? " value=\""+ value + '\"' : "";
    return '<input name=\"'+ name +
        '\" type=\"' + type +
        '\" class=\"' + _class +
        '\"' +  value +' >';
}

function createSerial(serialData, isNew){
    var hidden = '';
    if(isNew){
        hidden = createInput('serial-id','hidden','', 'undefined');
    }else{
        hidden = createInput('serial-id','hidden','', serialData['Serial_ID']);
    }
    var listItem =
            hidden +
            createInput('name', 'text', 'list-text name-text', serialData['Name']) +
            createInput('season', 'text', 'list-text number-text', serialData['Season'])  +
            '<div class="updown">' +
            createInput('seasonUp', 'button', 'buttonUp','')  +
            createInput('seasonDown', 'button', 'buttonDown','')  +
            '</div>' +
            createInput('episode', 'text', 'list-text number-text', serialData['Episode'])  +
            '<div class="updown">' +
            createInput('episodeUp', 'button', 'buttonUp','')  +
            createInput('episodeDown', 'button', 'buttonDown','')  +
            '</div>' +
            createInput('delete', 'button', 'buttonDelete','');
    var res = '<div class="list-el">' + listItem + '</div>';
    return res;
}

function createUserSerials(data,intoEl){
    var userData = data['userData'];
    for(var x = 0; x < userData.length; x++){
        intoEl.append(createSerial(userData[x]));
        addHandlersToSerials($('.list-el').last());
    }
}

function addHandlersToSerials(el){

    function addNumber(elem, number) {
        if(!isNumeric(elem.value)) {
            elem.value = 1;
        }else{
            var resValue = parseInt(elem.value) + number;
            if (resValue < 1) {
                resValue = 1;
            }
            elem.value = resValue;
        }
    }
    
    function getEventTarget(e){
        e = e || window.event;
        return e.target || e.srcElement;
    }

    el.find('.buttonUp').click(function (e){
        addNumber(getEventTarget(e).parentNode.previousSibling, 1);
    });
    el.find('.buttonDown').click(function (e){
        addNumber(getEventTarget(e).parentNode.previousSibling, -1);
    });
    el.find('.buttonDelete').click(function(e){
        var target = getEventTarget(e).parentNode;
        target.parentNode.removeChild(target);
        updateHeightPage();
    });
}

function createUserIDHidden(id){
    var hidden = createInput(
        'userID',
        'hidden',
        'userID',
        id);
    $('.serial-list').after(hidden);
}

function deleteUserIDHidden(){
    $('.userID').remove();
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

function updateHeightPage() {
    var contextDefault = 1324;
    var tableDefault = 1125;
    var menuDefault = 1120;
    var numberSerialExists = $('.list-el').length;
    var el = $('.list-el').first();
    var heightEl =
        parseInt(el.height()) +
        parseInt(el.css('marginTop')) +
        parseInt(el.css('marginBottom'))+ 10;
    var maxCapacityElements = 15;
    if (numberSerialExists > maxCapacityElements) {
        var addedPixels = heightEl * (numberSerialExists - maxCapacityElements);
        defaultHeight();
        $('#global-context-div').height(contextDefault+addedPixels);
        $('.table').height(tableDefault + addedPixels);
        $('.menu-container').height(menuDefault + addedPixels);
    }else{
        defaultHeight();
    }

    function defaultHeight() {
        $('#global-context-div').height(contextDefault);
        $('.table').height(tableDefault);
        $('.menu-container').height(menuDefault);
    }
}

function showLoader() {
    $('.loader').css({display: 'block'});
}

function hideLoader(){
    $('.loader').css({display: 'none'});
}