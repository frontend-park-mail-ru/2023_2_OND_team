!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e["Auth.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){return'<div class="auth-page">\n    <button class="cancel-button">\n        <img src="./static/svg/cancel.svg" alt="Cancel">\n    </button>\n    <img class="ibackground" src="static/img/image_2.png" alt="Background Image">\n    <div class="form-container">\n        <form class="input-container">\n            <h4 class="auth-title">Войти в PinSpire</h4>\n            <div class="input-username">\n                <label for="username" class="labeled-input">Имя пользователя</label>\n                <input type="text" id="username" placeholder="username">\n                <span class="username-error-message"></span>\n            </div>\n            <div class="input-password">\n                <label for="password" class="labeled-input">Пароль</label>\n                <input type="password" id="password" placeholder="●●●●●●●●●●●●">\n                <span class="password-error-message"></span>\n                <span class="wrong-data-error-message"></span>\n            </div>\n            <button class="button" type="submit">Войти</button>\n            <p class="already-registered">Все еще нет аккаунта? <a href="#">Регистрация</a></p>\n        </form>\n    </div>\n</div>\n'},useData:!0}),e["Feed.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<header id="header">\n    '+(null!=(a=(t(a,"Header")||e&&t(e,"Header")||n.hooks.helperMissing).call(null!=e?e:n.nullContext||{},null!=e?t(e,"headerContext"):e,{name:"Header",hash:{},data:l,loc:{start:{line:2,column:4},end:{line:2,column:30}}}))?a:"")+'\n</header>\n<main id="main">\n    <div class="container">\n        <section id="pins" class="gallery">\n        </section>\n    </div>\n</main>\n'},useData:!0}),e["Header.hbs"]=n({1:function(n,e,a,s,l){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"    "+(null!=(a=(t(a,"UserData")||e&&t(e,"UserData")||n.hooks.helperMissing).call(null!=e?e:n.nullContext||{},null!=e?t(e,"userDataContext"):e,{name:"UserData",hash:{},data:l,loc:{start:{line:34,column:4},end:{line:34,column:34}}}))?a:"")+"\n"},3:function(n,e,a,s,l){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"    "+(null!=(t="function"==typeof(a=null!=(a=t(a,"HeaderNonAuthorized")||(null!=e?t(e,"HeaderNonAuthorized"):e))?a:n.hooks.helperMissing)?a.call(null!=e?e:n.nullContext||{},{name:"HeaderNonAuthorized",hash:{},data:l,loc:{start:{line:36,column:4},end:{line:36,column:29}}}):a)?t:"")+"\n"},compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div class="header-left">\n    <div class="header-logo">\n        <div class="logo-icon">\n            <a href="#top">\n                <img src="static/svg/logo102x74.svg">\n            </a>\n        </div>\n    </div>\n\n    <div class="menu">\n        <nav>\n            <div class="menu-btn">\n                <div class="line line--1"></div>\n                <div class="line line--2"></div>\n                <div class="line line--3"></div>\n            </div>\n\n            <div class="nav-links">\n                <a href="" class="link">Загрузить картинку</a>\n                <a href="" class="link">Создать доску</a>\n            </div>\n        </nav>\n    </div>\n\n</div>\n\n\n'+(null!=(a=t(a,"if").call(null!=e?e:n.nullContext||{},null!=e?t(e,"isAuthorized"):e,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l,loc:{start:{line:33,column:0},end:{line:37,column:7}}}))?a:"")},useData:!0}),e["HeaderNonAuthorized.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){return'<div class="header-buttons">\n    <button class="header-login-button">Вход</button>\n    <button class="header-signup-button">Регистрация</button>\n</div>\n'},useData:!0}),e["Pins.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){var t,r=null!=e?e:n.nullContext||{},i=n.hooks.helperMissing,o="function",c=n.escapeExpression,n=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div id="pin-id-'+c(typeof(t=null!=(t=n(a,"id")||(null!=e?n(e,"id"):e))?t:i)==o?t.call(r,{name:"id",hash:{},data:l,loc:{start:{line:1,column:16},end:{line:1,column:22}}}):t)+'" class="gallery__item">\n    <img src="'+c(typeof(t=null!=(t=n(a,"src")||(null!=e?n(e,"src"):e))?t:i)==o?t.call(r,{name:"src",hash:{},data:l,loc:{start:{line:2,column:14},end:{line:2,column:21}}}):t)+'" width="200"/>\n</div>\n'},useData:!0}),e["Reg.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){return'<div class="page">\n  <button class="cancel-button"><img src="./static/svg/cancel.svg"></button>\n  <img class="ibackground" src="static/img/image_1.png">\n  <div class="form-container">\n    <form class="input-container">\n      <h4 class="registration-title">Регистрация в PinSpire</h4>\n      <div class="input-username">\n        <label for="username" class="labeled-input">Имя пользователя</label>\n        <input type="text" id="username" placeholder="username">\n        <span class="username-error-message"></span>\n      </div>\n      <div class="input-email">\n        <label for="email" class="labeled-input">Почта</label>\n        <input type="email" id="email" placeholder="pinspire@mail.ru">\n        <span class="email-error-message"></span>\n      </div>\n      <div class="input-password">\n        <label for="password" class="labeled-input">Пароль</label>\n        <input type="password" id="password" placeholder="●●●●●●●●●●●●">\n        <span class="password-error-message"></span>\n        <span class="wrong-data-error-message"></span>\n      </div>\n      <button class="button" type="submit">Создать аккаунт</button>\n      <p class="already-registered">\n        Уже есть аккаунт? <a href="#">Войти</a>\n      </p>\n    </form>\n  </div>\n</div>\n'},useData:!0}),e["UserData.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,l){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div class="header-user">\n    <div class="header-user-data">\n        <div class="header-username">\n            '+n.escapeExpression("function"==typeof(a=null!=(a=t(a,"username")||(null!=e?t(e,"username"):e))?a:n.hooks.helperMissing)?a.call(null!=e?e:n.nullContext||{},{name:"username",hash:{},data:l,loc:{start:{line:4,column:12},end:{line:4,column:24}}}):a)+'\n        </div>\n        <div class="header-user-avatar">\n            <img src="./static/svg/icon _profile.svg">\n        </div>\n    </div>\n    <button class="header-logout-button" type="submit">Выход</button>\n</div>\n'},useData:!0})}();