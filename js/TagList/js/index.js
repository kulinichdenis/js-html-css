'use strict';
(function() {
    function TagList(contant, startArray){
        this.deleteAll;
        this.divTarget;
        this.submit;
        this.divEdit;
        this.input;
        this.content = contant;
        this.array = startArray || [];
        this.creatDOM(contant);
        this.start();
    }

    TagList.prototype.start = function(){
        var _that = this;
        $(this.divEdit).find('.check:eq(1)').hide().addClass('active'); //Просмотр
        $(this.divTarget).find('.close').hide();

        $(this.divTarget).on('click', function (event) {
//            debugger
            if (event.target.className === "close") {
//                debugger
                $(event.target).parent().parent().remove();
                var forDelete = $(event.target).parent()[0].childNodes[0].nodeValue;
                _that.array.splice(_that.array.indexOf(forDelete),1);
//                debugger
            }
        })

        $(this.submit).on('click', function (event) {
            _that.addElement();
        })
        $( this.input).keyup(function(e){
            if(e.keyCode == 13){
                _that.addElement();
            }
        });

        $(this.divEdit).on('click', function(event){

            if (event.target.classList[0] === "check") {
                $(this).find('.check').toggle().toggleClass('active');

                if(event.target.classList[1] === 'on'){
                    $(_that.divTarget).find('.close').show();
                }else{
                    $(_that.divTarget).find('.close').hide();
                }
            }
        })
        $(this.deleteAll).on('click', function(event){
            if($(_that.divEdit).find('.active').hasClass('on')){
                $(_that.divTarget).children().remove();
                _that.array.length = 0;
            }
        })

    }
    TagList.prototype.addElement = function(){
        debugger
        if($(this.divEdit).find('.active').hasClass('on')){
            var inputValue = $(this.input).val();
            if(inputValue.length !== 0){
                if(this.array.indexOf(inputValue) === -1){
                    $('<div><samp>'+ inputValue +'<a href="#" class="close">X</a></div>').appendTo(this.divTarget);
                    this.array.push(inputValue);
                }
                $(this.input).val("");
            }
        }
    }

    TagList.prototype.creatDOM = function(contant){
        var _that = this;
        var divOuter = $('<div id="outer">').appendTo(contant);
        this.divEdit = $('<div class="edit">').appendTo(divOuter);
        this.check = $('<a href="#" class="check on">Редактировать</a>').appendTo(this.divEdit);
        this.check = $('<a href="#" class="check off">Просмотр</a>').appendTo(this.divEdit);
        this.divTarget = $('<div id="target">').appendTo(divOuter);
        this.array.forEach(function(element){
            $('<div><samp>'+element+'<a href="#" class="close">X</a></div>').appendTo(_that.divTarget);
        })

        var divInputBox = $('<div class="inputBox">').appendTo(divOuter);


        this.input = $('<input type="text" class="form-control">').appendTo(divInputBox);
        this.submit = $('<input name="Submit" type="submit" class="btn btn-default" value="Submit" />').appendTo(divInputBox);
        this.deleteAll = $('<div><a href="#" class="deleteAll">Delete All</a></div>').appendTo(divOuter);

    }
    new TagList($('body'),['mama','mila','ramu']);
    new TagList($('body'),['mama1','mila1','ramu1']);
})()