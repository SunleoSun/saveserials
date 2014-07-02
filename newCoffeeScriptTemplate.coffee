changeLanguage = (lang) ->
  switch lang
    when "ru"
      $(".save-popup").text "Данные сохранены!"
      $("#greeting").children().first().text "Добро пожаловать, "
      if islteIE8()
        $(".trig").css filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"../img/trig-ru_cr.png\", sizingMethod=\"scale\")"
      else
        $(".trig").css backgroundImage: "url(img/trig-ru_cr.png)"
      $("form[id=\"loginform\"]").children().eq(1).text("Введите ваш логин:").parent().children().eq(3).text("Введите пароль:").parent().children().eq(5).html("<input type=\"checkbox\" name=\"saveNick\" id=\"savenick\" value=\"1\">Автоматический вход").parent().children().eq(-2).val("Вход").parent().children().last().text "Отмена"
      $("form[id=\"registerform\"]").children().eq(1).text("Введите ваш логин:").parent().children().eq(3).text("Введите пароль:").parent().children().eq(5).text("Повторите пароль:").parent().children().eq(-2).val("Регистрация").parent().children().last().text "Отмена"
      $("#btn-logout").text "Выйти"
      $("#btn-save").text "Сохранить"
      $("#btn-create").text "Создать"
      $("#btn-back").text "Назад"
      $("#table-label-name").text "Название сериала"
      $("#table-label-season").text "Номер сезона"
      $("#table-label-episode").text "Номер серии"
      $("#table-label-delete").text "Удалить сериал"
      $("#btn-demo").text "Демо"
      $("#btn-login").text "Вход"
      $("#btn-register").text "Регистрация"
      $("#text").children().first().text("Для кого этот сайт?").next().text("Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.").next().text("Как работает этот сайт?").next().text("Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку \"Демо\".").next().text("Возможности сайта").next().text("Здесь, на сайте, вы сможете сохранять:").next().children().first().text("Названия ваших сериалов").next().text("Номера текущих просматриваемых сезонов").next().text("Номера последних просмотренных серий").parent().next().text("Как зарегистрироваться?").next().text "Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку \"Регистрация\", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)"
    when "en"
      $(".save-popup").text translate("Данные сохранены!")
      $("#greeting").children().first().text translate("Добро пожаловать, ")
      if islteIE8()
        $(".trig").css filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"../img/trig-en_cr.png\", sizingMethod=\"scale\")"
      else
        $(".trig").css backgroundImage: "url(img/trig-en_cr.png)"
      $("form[id=\"loginform\"]").children().eq(1).text(translate("Введите ваш логин:")).parent().children().eq(3).text(translate("Введите пароль:")).parent().children().eq(5).html("<input type=\"checkbox\" name=\"saveNick\" id=\"savenick\" value=\"1\">" + translate("Автоматический вход")).parent().children().eq(-2).val(translate("Вход")).parent().children().last().text translate("Отмена")
      $("form[id=\"registerform\"]").children().eq(1).text(translate("Введите ваш логин:")).parent().children().eq(3).text(translate("Введите пароль:")).parent().children().eq(5).text(translate("Повторите пароль:")).parent().children().eq(-2).val(translate("Регистрация")).parent().children().last().text translate("Отмена")
      $("#btn-logout").text translate("Выйти")
      $("#btn-save").text translate("Сохранить")
      $("#btn-create").text translate("Создать")
      $("#btn-back").text translate("Назад")
      $("#table-label-name").text translate("Название сериала")
      $("#table-label-season").text translate("Номер сезона")
      $("#table-label-episode").text translate("Номер серии")
      $("#table-label-delete").text translate("Удалить сериал")
      $("#btn-demo").text translate("Демо")
      $("#btn-login").text translate("Вход")
      $("#btn-register").text translate("Регистрация")
      $("#text").children().first().text(translate("Для кого этот сайт?")).
      next().text(translate("Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.")).next().text(translate("Как работает этот сайт?")).next().text(translate("Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку \"Демо\".")).next().text(translate("Возможности сайта")).next().text(translate("Здесь, на сайте, вы сможете сохранять:")).next().children().first().text(translate("Названия ваших сериалов")).next().text(translate("Номера текущих просматриваемых сезонов")).next().text(translate("Номера последних просмотренных серий")).parent().next().text(translate("Как зарегистрироваться?")).next().text translate("Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку \"Регистрация\", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)")
    else
      return
translate = (text) ->
  dictionary =
    "Проверочный код не верен!": "Verification code is not correct!"
    "Пароли не совпадают!": "Passwords are not equal!"
    "Такой логин уже существует!": "This login already exist!"
    "Такого логина не существует!": "This login does not exist!"
    "Пароль не верен!": "Password is incorrect!"
    "Данные сохранены!": "Data saved!"
    "Добро пожаловать, ": "Welcome, "
    "Автоматический вход": "Autologin"
    "Введите ваш логин:": "Enter your login:"
    "Введите пароль:": "Enter password"
    "Повторите пароль:": "Repeate password"
    "Отмена": "Cancel"
    "Демо": "Demo"
    "Вход": "Login"
    "Регистрация": "Register"
    "Выйти": "Logout"
    "Сохранить": "Save"
    "Создать": "Create"
    "Назад": "Back"
    "Название сериала": "Serial name"
    "Номер сезона": "Season number"
    "Номер серии": "Episode number"
    "Удалить сериал": "Delete serial"
    "Для кого этот сайт?": "For who is this site?"
    "Этот сайт создан для людей, которые постоянно забывают на какой серии они остановились при просмотре своего любимого сериала.": "This site was created for people who constantly forget in what series they stopped when watching their favorite TV serials."
    "Как работает этот сайт?": "How works this site?"
    "Для того, чтобы посмотреть пример, как работает данный сайт нажмите кнопку \"Демо\".": "To see an example of how works this site, click \"Demo\"."
    "Возможности сайта": "Site features"
    "Здесь, на сайте, вы сможете сохранять:": "Here on the website, you can save:"
    "Названия ваших сериалов": "Names of your serials"
    "Номера текущих просматриваемых сезонов": "Numbers of current watching seasons"
    "Номера последних просмотренных серий": "Numbers of recently viewed episodes"
    "Как зарегистрироваться?": "How to register?"
    "Если вы решили воспользоваться данным сайтом для хранения списков ваших сериалов, нажмите кнопку \"Регистрация\", введите данные о вашем аккаунте и пользуйтесь наздоровье. :)": "If you decide to use this site to store your lists of serials, click \"Register\", enter data your account and use nazdorove. :)"

  dictionary[text]

#Начинаем анимации
scrollToTop = ->
  $("html").animate
    scrollTop: "0"
  ,
    duration: 500

  return
animBtnAppear = (el) ->
  el.animate
    marginLeft: "0"
  ,
    duration: 1500
    easing: "easeInOutBack"
    complete: ->

  return

#el.removeAttr('style');
greeting = (name) ->
  $("#greeting").css display: "block"
  $("#greeting b").text name
  return
emptyGreeting = ->
  $("#greeting").css display: "none"
  return
islteIE8 = ->
  isIE = (document.querySelector or window.XMLHttpRequest or document.compatMode)
  isIE9orBigger = document.addEventListener
  isIE and not isIE9orBigger
hideButtons = (isDemo) ->
  if isDemo
    $("#btn-logout").css display: "none"
    $("#btn-save").css display: "none"
    $("#btn-create").css display: "none"
    $("#btn-back").css display: "block"
  else
    $("#btn-logout").css display: "block"
    $("#btn-save").css display: "block"
    $("#btn-create").css display: "block"
    $("#btn-back").css display: "none"
  return
createInput = (name, type, _class, value) ->
  value = (if value then " value=\"" + value + "\"" else "")
  "<input name=\"" + name + "\" type=\"" + type + "\" class=\"" + _class + "\"" + value + " >"
createSerial = (serialData, isNew) ->
  hidden = ""
  if isNew
    hidden = createInput("serial-id", "hidden", "", "undefined")
  else
    hidden = createInput("serial-id", "hidden", "", serialData["Serial_ID"])
  listItem = hidden + createInput("name", "text", "list-text name-text", serialData["Name"]) + createInput("season", "text", "list-text number-text", serialData["Season"]) + "<div class=\"updown\">" + createInput("seasonUp", "button", "buttonUp", "") + createInput("seasonDown", "button", "buttonDown", "") + "</div>" + createInput("episode", "text", "list-text number-text", serialData["Episode"]) + "<div class=\"updown\">" + createInput("episodeUp", "button", "buttonUp", "") + createInput("episodeDown", "button", "buttonDown", "") + "</div>" + createInput("delete", "button", "buttonDelete", "")
  res = "<div class=\"list-el\">" + listItem + "</div>"
  res
createUserSerials = (data, intoEl) ->
  userData = data["userData"]
  x = 0

  while x < userData.length
    intoEl.append createSerial(userData[x])
    addHandlersToSerials $(".list-el").last()
    x++
  return
addHandlersToSerials = (el) ->
  addNumber = (elem, number) ->
    unless isNumeric(elem.value)
      elem.value = 1
    else
      resValue = parseInt(elem.value) + number
      resValue = 1  if resValue < 1
      elem.value = resValue
    return
  getEventTarget = (e) ->
    e = e or window.event
    e.target or e.srcElement
  el.find(".buttonUp").click (e) ->
    addNumber getEventTarget(e).parentNode.previousSibling, 1
    return

  el.find(".buttonDown").click (e) ->
    addNumber getEventTarget(e).parentNode.previousSibling, -1
    return

  el.find(".buttonDelete").click (e) ->
    target = getEventTarget(e).parentNode
    target.parentNode.removeChild target
    updateHeightPage()
    return

  return
createUserIDHidden = (id) ->
  hidden = createInput("userID", "hidden", "userID", id)
  $(".serial-list").after hidden
  return
deleteUserIDHidden = ->
  $(".userID").remove()
  return
isNumeric = (n) ->
  not isNaN(parseFloat(n)) and isFinite(n)
updateHeightPage = ->
  defaultHeight = ->
    $("#global-context-div").height contextDefault
    $(".table").height tableDefault
    $(".menu-container").height menuDefault
    return
  contextDefault = 1324
  tableDefault = 1125
  menuDefault = 1120
  numberSerialExists = $(".list-el").length
  el = $(".list-el").first()
  heightEl = parseInt(el.height()) + parseInt(el.css("marginTop")) + parseInt(el.css("marginBottom")) + 10
  maxCapacityElements = 15
  if numberSerialExists > maxCapacityElements
    addedPixels = heightEl * (numberSerialExists - maxCapacityElements)
    defaultHeight()
    $("#global-context-div").height contextDefault + addedPixels
    $(".table").height tableDefault + addedPixels
    $(".menu-container").height menuDefault + addedPixels
  else
    defaultHeight()
  return
showLoader = ->
  $(".loader").css display: "block"
  return
hideLoader = ->
  $(".loader").css display: "none"
  return
$ ->
  createDefaultSerialsData = (count) ->
    data = []
    userData = []
    x = 0

    while x < count
      serialData = []
      serialData["Name"] = "My Serial " + x
      serialData["Season"] = 1
      serialData["Episode"] = 1
      userData[x] = serialData
      x++
    data["userData"] = userData
    data
  addErrorMessage = (message, el, border) ->
    div = "<div class=\"error-message\">" + message + "</div>"
    el.before div
    border.css height: "+=34px"
    return
  removeErrorMessages = (border) ->
    errors = border.find(".error-message")
    countMessages = errors.length
    if countMessages > 0
      errors.remove()
      border.css height: "-=" + 34 * countMessages + "px"
    return
  realFalse = (el) ->
    el isnt `undefined` and el is false
  checkRegisterData = (data) ->
    borderRegister = $("#border-register")
    removeErrorMessages borderRegister
    res = true
    if document._lang is "ru"
      if realFalse(data["login"])
        addErrorMessage "Такой логин уже существует!", $("#registerNick"), borderRegister
        res = false
      if realFalse(data["pass"])
        addErrorMessage "Пароли не совпадают!", $("#registerPass2"), borderRegister
        res = false
      if realFalse(data["captcha"])
        addErrorMessage "Проверочный код не верен!", $("#captcha"), borderRegister
        res = false
    if document._lang is "en"
      if realFalse(data["login"])
        addErrorMessage translate("Такой логин уже существует!"), $("#registerNick"), borderRegister
        res = false
      if realFalse(data["pass"])
        addErrorMessage translate("Пароли не совпадают!"), $("#registerPass2"), borderRegister
        res = false
      if realFalse(data["captcha"])
        addErrorMessage translate("Проверочный код не верен!"), $("#captcha"), borderRegister
        res = false
    res = false  if data["login"] is `undefined` or data["pass"] is `undefined` or data["captcha"] is `undefined`
    res
  passEncr = (passKey, sting) ->
    indexPassKey = sting.indexOf(passKey)
    indexStartValue = indexPassKey + passKey.length + 1
    indexAmpersand = sting.indexOf("&", indexPassKey)
    indexAmpersand = sting.length  if indexAmpersand is -1
    value = sting.substring(indexStartValue, indexAmpersand)
    passEncr = $.md5(value)
    newString = sting.replace(new RegExp(passKey + "=" + value), passKey + "=" + passEncr)
    newString
  hideMessageBoxes = ->
    $("#backgroundShadow,#border-register,#border-login").css display: "none"
    return
  slideContextAndIndex = (indexPosition, contextPosition, firstIndexAnimate, complete) ->
    if firstIndexAnimate
      $("#global-index-div").css(position: "absolute").animate
        left: indexPosition
      ,
        duration: 1300
        complete: ->
          $("#global-index-div").css display: "none"
          return

      contextDiv.css(display: "block").animate
        left: contextPosition
      ,
        duration: 1300
        complete: ->
          contextDiv.css
            position: "relative"
            top: "-20px"

          complete()  if complete
          return

    else
      contextDiv.css(
        position: "absolute"
        top: "0px"
      ).animate
        left: contextPosition
      ,
        duration: 1300
        complete: ->
          contextDiv.css display: "none"
          return

      $("#global-index-div").css(display: "block").animate
        left: indexPosition
      ,
        duration: 1300
        complete: ->
          $("#global-index-div").css position: "relative"
          complete()  if complete
          return

    return
  slideContextDiv = (complete) ->
    slideContextAndIndex "-100%", "0%", true, complete
    return
  slideIndexDiv = (complete) ->
    slideContextAndIndex "0%", "100%", false, complete
    return
  slideContext = slideContextDiv
  contextDiv = $("#global-context-div")
  contextDiv.css
    position: "relative"
    display: "none"
    left: "100%"

  $.ajax
    type: "POST"
    url: "/translate"
    success: (data) ->
      document._lang = data["language"]
      changeLanguage data["language"]
      return

    error: (jqXHR, textStatus, errorThrown) ->
      alert textStatus + " " + errorThrown
      return

  $("#registerform").submit (e) ->
    e = e or window.event
    e.preventDefault()
    postData = $("#registerform").serialize()
    postData = decodeURIComponent(postData)
    postData = passEncr("pass", postData)
    postData = passEncr("pass2", postData)
    showLoader()
    $.ajax
      type: "POST"
      url: "/register"
      data: postData
      success: (data) ->
        hideLoader()
        return  unless checkRegisterData(data)
        hideMessageBoxes()
        $(".list-el").remove()
        hideButtons false
        serialData = createDefaultSerialsData(3)
        createUserSerials serialData, $(".serial-list")
        slideContextDiv()
        greeting data["userName"]
        createUserIDHidden data["userID"]
        return

      error: (jqXHR, textStatus, errorThrown) ->
        $("body").html jqXHR.responseText
        return

    return

  $("#loginform").submit (e) ->
    checkLoginData = (data) ->
      removeErrorMessages $("#border-login")
      res = true
      if document._lang is "ru"
        if realFalse(data["login"])
          addErrorMessage "Такого логина не существует!", $("#loginNick"), $("#border-login")
          res = false
        else if realFalse(data["pass"])
          addErrorMessage "Пароль не верен!", $("#loginPass"), $("#border-login")
          res = false
      if document._lang is "en"
        if realFalse(data["login"])
          addErrorMessage translate("Такого логина не существует!"), $("#loginNick"), $("#border-login")
          res = false
        else if realFalse(data["pass"])
          addErrorMessage translate("Пароль не верен!"), $("#loginPass"), $("#border-login")
          res = false
      res
    e = e or window.event
    e.preventDefault()
    postData = $("#loginform").serialize()
    postData = decodeURIComponent(postData)
    postData = passEncr("pass", postData)
    showLoader()
    $.ajax
      type: "POST"
      url: "/login"
      data: postData
      success: (data) ->
        hideLoader()
        return  unless checkLoginData(data)
        hideMessageBoxes()
        createUserSerials data, $(".serial-list")
        hideButtons false
        updateHeightPage()
        slideContextDiv()
        greeting data["userName"]
        createUserIDHidden data["userID"]
        return

      error: (jqXHR, textStatus, errorThrown) ->
        $("body").html jqXHR.responseText
        return

    return

  $("#btn-demo").click ->
    data = createDefaultSerialsData(30)
    createUserSerials data, $(".serial-list")
    hideButtons true
    emptyGreeting()
    updateHeightPage()
    scrollToTop()
    slideContextDiv()
    return

  $(".btn-right").mousedown ->
    $(this).addClass "btn-index-down"
    return

  $(".btn-right").mouseup ->
    $(this).removeClass "btn-index-down"
    return

  $("#loginSubmit, #registerSubmit, #cancel").mousedown ->
    $(this).addClass "btn-form-down"
    return

  $("#loginSubmit, #registerSubmit, #cancel").mouseup ->
    $(this).removeClass "btn-form-down"
    return

  $("#btn-register").click ->
    scrollToTop()
    $("#backgroundShadow,#border-register").css display: "block"
    return

  $("#btn-login").click ->
    scrollToTop()
    $("#backgroundShadow, #border-login").css display: "block"
    return

  $("#backgroundShadow, #cancel").click ->
    removeErrorMessages $("#border-login")
    removeErrorMessages $("#border-register")
    hideMessageBoxes()
    return

  $("#btn-logout").click ->
    showLoader()
    $.ajax
      type: "POST"
      url: "/logout"
      success: ->
        hideLoader()
        slideIndexDiv ->
          $(".list-el").remove()
          emptyGreeting()
          deleteUserIDHidden()
          updateHeightPage()
          return

        return

    return

  $("#btn-create").click ->
    data = []
    data["Name"] = "New Serial"
    data["Season"] = 1
    data["Episode"] = 1
    $(".serial-list").append createSerial(data, true)
    addHandlersToSerials $(".list-el").last()
    updateHeightPage()
    el = $(".list-el").first()
    heightEl = parseInt(el.css("height")) + parseInt(el.css("marginTop")) + parseInt(el.css("marginBottom"))
    lastSerialPosition = $(".serial-list input").last().offset().top + heightEl
    serialNotVisible = lastSerialPosition < $("html").scrollTop() or lastSerialPosition > $("html").scrollTop() + $(window).height()
    if serialNotVisible
      $("html").animate
        scrollTop: lastSerialPosition - $(window).height()
      , 500
    return

  $("#btn-save").click ->
    errorMessagePopup = (el, message) ->
      div = "<div class=\"error-message-popup\">" + message + "</div><div class=\"arrow\"></div>"
      offset = el.offset()
      el.after div
      errMessage = $(".error-message-popup")
      topPopupCoor = offset.top - parseInt(errMessage.css("height")) - 60
      errMessage.css
        left: offset.left - 10
        top: topPopupCoor
        opacity: 0

      $(".arrow").css
        left: offset.left + 20
        top: offset.top - 38
        opacity: 0

      popup = $(".error-message-popup, .arrow")
      popup.animate
        opacity: 1
      ,
        duration: 1000

      setTimeout (->
        popup.animate
          opacity: 0
        ,
          duration: 3000

        return
      ), 5000
      popupNotVisible = offset.top < $("html").scrollTop() or offset.top > $("html").scrollTop() + $(window).height()
      if popupNotVisible
        $("html").animate
          scrollTop: topPopupCoor
        , 200
      return
    $(".error-message-popup, .arrow").remove()
    serials = []
    serialsDivs = $(".list-el")
    objData =
      data: serials
      userID: $("[name=\"userID\"]")[0].value

    x = 0

    while x < serialsDivs.length
      curSerialDiv = serialsDivs[x]
      serial =
        id: curSerialDiv.childNodes[0].value
        name: curSerialDiv.childNodes[1].value
        season: curSerialDiv.childNodes[2].value
        episode: curSerialDiv.childNodes[4].value

      incorrectSeason = not isNumeric(serial.season)
      incorrectEpisode = not isNumeric(serial.episode)
      if incorrectSeason or incorrectEpisode
        if incorrectSeason
          errorMessagePopup serialsDivs.eq(x).find("[name=\"season\"]"), "Введите корректный номер сезона"
          return
        if incorrectEpisode
          errorMessagePopup serialsDivs.eq(x).find("[name=\"episode\"]"), "Введите корректный номер эпизода"
          return
      serials[x] = serial
      x++
    showLoader()
    $.ajax
      type: "POST"
      url: "/save"
      data: objData
      success: ->
        hideLoader()
        popup = $(".save-popup")
        if document._lang is "ru"
          popup.text "Данные сохранены!"
        else
          popup.text translate("Данные сохранены!")
        $(".save-popup").css display: "block"
        $(".save-popup").animate
          opacity: 1
        ,
          duration: 1000
          complete: ->
            $(".save-popup").animate
              opacity: 0
            ,
              duration: 2000
              easing: "easeInExpo"
              complete: ->
                $(".save-popup").css display: "none"
                return

            return

        return

      error: (jqXHR, textStatus, errorThrown) ->
        $("body").html jqXHR.responseText
        return

    return

  $("#btn-back").click ->
    slideIndexDiv ->
      $(".list-el").remove()
      updateHeightPage()
      return

    return

  $(".trig").click ->
    lang = undefined
    if document._lang is "en"
      lang = "ru"
    else
      lang = "en"
    showLoader()
    $.ajax
      type: "POST"
      url: "/translate"
      data:
        language: lang

      success: (data) ->
        hideLoader()
        document._lang = data["language"]
        changeLanguage data["language"]
        return

    return

  return

$(window).load ->
  unless islteIE8()
    $(".logo-img").show
      effect: "fade"
      duration: 1500
      complete: ->
        animBtnAppear $("#btn-demo")
        setTimeout (->
          animBtnAppear $("#btn-login")
          setTimeout (->
            animBtnAppear $("#btn-register")
            setTimeout (->
              $.ajax
                type: "POST"
                url: "/autologin"
                success: (data) ->
                  return  unless data["userName"]
                  createUserSerials data, $(".serial-list")
                  hideButtons false
                  updateHeightPage()
                  slideContext()
                  greeting data["userName"]
                  createUserIDHidden data["userID"]
                  return

              return
            ), 1500
            return
          ), 300
          return
        ), 300
        return

  return

slideContext = undefined
