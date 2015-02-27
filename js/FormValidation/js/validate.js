'use strict';
(function test(){
    function addEvent(obj, eventName, handler) {
        var handlerWrapper = function (event) {
            event = event || window.event;
            if (!event.target && event.srcElement) {
                event.target = event.srcElement;
            }
            return handler.call(obj, event);
        };

        if (obj.addEventListener) {
            obj.addEventListener(eventName, handlerWrapper, false);
        } else if (obj.attachEvent) {
            obj.attachEvent('on' + eventName, handlerWrapper);
        }
        return handlerWrapper;
    }

    function dangerAlert(eventTarget, event, message){
        var parent = eventTarget.parentNode;
        var alertTarget = parent.children[parent.children.length-1];
        alertTarget.style.display = event;
        if(message){
            alertTarget.firstChild.nodeValue = message;
        }
    }

    function disableButton(buttonClass, status){
        var button = document.querySelector(buttonClass);

        if(status){
            if(!button.classList.contains('disabled')){
                button.classList.add('disabled');
                button.disabled = true;
            }
        } else {
            if(button.classList.contains('disabled')){
                button.classList.remove('disabled');
                button.disabled = false;
            }
        }
    }

    function chechEmail(value, parent, errorFlag, messageIncorrect, timer, event){
        var obj;
        var messageSimple = "";
        var request = new XMLHttpRequest();
        var STATE_READY = 4;
        request.open('get', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email='+value+'', true);
        request.onreadystatechange = function() {
            //console.log('request.onreadystatechange', request.readystate)
            if(request.readyState === STATE_READY) {
                obj = JSON.parse(request.responseText);
                if(obj.used) {
                    if (!parent.classList.contains('has-error')) {
                        parent.className += " has-error";
                    }
                    messageSimple = "Email is already in use";
                    errorFlag = true;
                    disableButton('.btn-primary', true);
                }
                    var errorMessage = messageSimple + messageIncorrect;
                    if(errorFlag){
                        timer = setTimeout(function(){
                            dangerAlert(event, 'block', errorMessage);
                        },1000)
                    }
            }
        }
        request.send();
    }

//    window.usersEmail = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

    var timer;

    addEvent(document.querySelector("form"), 'keyup', function(event){

        var hasError = document.querySelectorAll('.has-error');
        var countError = hasError.length;

        var value;
        var parent;
        var alertDanger;
        var errorFlag;
        var regExpr;
        var messageLength = "";
        var messageSimple = "";
        var messageIncorrect = "";

        if(event.target.id === 'email'){

            parent = event.target.parentNode;
            alertDanger = event.target.nextElementSibling;
            value = event.target.value;

            if(timer){
                clearTimeout(timer);
            }

            alertDanger.style.display = 'none';

            regExpr = /^(\w){2,15}@(\w)+\.([a-z]){2,3}$/gi;


            if(!regExpr.test(value.trim())&& value.length !== 0){

                if(!parent.classList.contains('has-error')){
                    parent.className += " has-error";
                }

                errorFlag = true;

                messageIncorrect = "Format email usermail@mail.com";

                if(countError === 0){
                    disableButton('.btn-primary', true);
                }

            } else {
                if(parent.classList.contains('has-error')){
                    parent.classList.remove("has-error");
                    if(countError === 1){
                        disableButton('.btn-primary', false);
                    }
                }
            }
//ajax validation
            chechEmail(value, parent, errorFlag, messageIncorrect,timer,event.target)
//ajax validation

        }

//Password
        if(event.target.id === 'password'){

            parent = event.target.parentNode;
            value = event.target.value;
            alertDanger = event.target.nextElementSibling;
            alertDanger.style.display = 'none';

            if(timer){
                clearTimeout(timer);
            }

            if(value.length < 5 && value.length > 1){
                errorFlag = true;
                messageLength = "Fewer letters than needed ";
            }

            regExpr = /^([a-z])+$|^([0-9])+$/g;

            if(regExpr.test(value)){
                errorFlag=true;
                messageSimple = "Simple password";
            }

            regExpr = /\W+/g;

            if(regExpr.test(value)){
                errorFlag=true;
                messageIncorrect = "Incorrect symbol";
            }

            if(errorFlag){

                if(!parent.classList.contains('has-error')){
                    parent.className += " has-error";
                }

                if(countError === 0){
                    disableButton('.btn-primary', true);
                }

            } else {
                if(parent.classList.contains('has-error')){
                    parent.classList.remove("has-error");
                    if(countError === 1){
                        disableButton('.btn-primary', false);
                    }
                }
            }
            var errorMessage  = messageLength +" "+ messageSimple+" "+messageIncorrect;
            if(errorFlag){
                timer = setTimeout(function(){
                    dangerAlert(event.target, 'block', errorMessage);
                },1000)
            }
        }

//  City
        if(event.target.id === 'city'){

            value = event.target.value;
            parent = event.target.parentNode;

            if(timer){
                clearTimeout(timer);
            }
            dangerAlert(event.target, 'none');

            if(value.length === 1){
                errorFlag = true;
                messageLength = "Fewer letters than needed ";
            }

            regExpr = /([^A-Za-z])+/g;
            if(regExpr.test(value)){
                errorFlag=true;
                messageIncorrect = "Only latin characters";
            }

            if(errorFlag){
                if(!parent.classList.contains('has-error')){
                    parent.className += " has-error";
                }
                if(countError === 0){
                    disableButton('.btn-primary', true);
                }

            } else {
                if(parent.classList.contains('has-error')){
                    parent.classList.remove("has-error");
                    if(countError === 1){
                        disableButton('.btn-primary', false);
                    }
                }
            }
            var errorMessage = messageLength+" "+messageIncorrect;

            if(errorFlag){
                timer = setTimeout(function(){
                    dangerAlert(event.target, 'block', errorMessage);
                },1000)
            }
        }
//Phone
        if(event.target.id === 'phone'){

            if(timer){
                clearTimeout(timer);
            }

            value = event.target.value;
            parent = event.target.parentNode;
            dangerAlert(event.target, 'none');

            regExpr = /^\+380([0-9]){9}$|^$/g;

            if(!(regExpr.test(value))){
                errorFlag = true;
                messageIncorrect = "Format number +380XXXXXXXXX";
            }

            if(errorFlag){
                if(!parent.classList.contains('has-error')){
                    parent.className += " has-error";
                }
                if(countError === 0){
                    disableButton('.btn-primary', true);
                }

            } else {
                if(parent.classList.contains('has-error')){
                    parent.classList.remove("has-error");
                    if(countError === 1){
                        disableButton('.btn-primary', false);
                    }
                }
            }
            if(errorFlag){
                timer = setTimeout(function(){
                    dangerAlert(event.target, 'block', messageIncorrect);
                },1500)
            }
        }
    });

//    Event button
    addEvent(document.querySelector("button"), 'click', function(event){
            var email = document.querySelector('#email');
            var password = document.querySelector('#password');
            var check = document.querySelector('input[type=checkbox]');
            var hasError;

//      email
        if(email.value.length === 0){
            dangerAlert(email, 'block', "Field is required");
            hasError = true;
        }
//        else{
//            if(window.usersEmail.indexOf(email.value) === -1){
//            }else{
//                dangerAlert(email, 'block', "Email is already in use");
//                hasError = true;
//            }
//        }

//      password
        if(password.value.length === 0){
            dangerAlert(password, 'block', "Field is required");
            hasError = true;
        }

//      checkbox
        if(!check.checked){
            dangerAlert(check, 'block', "Field is required");
            hasError = true;
        }else{
            dangerAlert(check, 'none');
        }
//        console.log(new Date()+"Button");
        if(hasError){
            event.preventDefault();
        }
    });

})()
