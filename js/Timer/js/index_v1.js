//Work verstion 1.0

'use strict';
(function () {
    //events function
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

    function Timer() {
        this.hours = 0;
        this.minute = 0;
        this.second = 0;
        this.milSec = 0;
        this.timer;
        this._build();
    }
    Timer.prototype._build = function(){
        var _this = this;
        this._createTimer();
        addEvent(this.col_xs_4_stopwatch, 'click', this.events.bind(this));

        addEvent(this.stopwatch, 'click', function(event){
            if(event.target.classList[1] === 'label-danger'){
                this.removeChild(event.target.parentNode);
            }

        });

        addEvent(this.row, 'mouseleave', function(event){
                window.currentTimer = _this;
            }
        );

        addEvent(document.documentElement, 'keyup', function(event){
            if(_this === window.currentTimer){
                _this.events();
            }
        });
    }

    Timer.prototype._createTimer = function() {
//  create menu
        this.row = document.createElement('div');
        this.row.className += 'row';
        this.col_xs_4 = document.createElement('div');
        this.col_xs_4.className = 'col-xs-4';
        this.h2 = document.createElement('h2');
        this.h2.className += 'stopwatch-current';
        this.spanHour = document.createElement('span');
        this.spanHour.id = 'hour';
        this.spanHour.innerText = '00';
        this.spanMin = document.createElement('span');
        this.spanMin.id = 'min';
        this.spanMin.innerText = ':' + '00';
        this.spanSec = document.createElement('span');
        this.spanSec.id = 'sec';
        this.spanSec.innerText = ':' + '00';
        this.spanMilSec = document.createElement('span');
        this.spanMilSec.id = 'milSec';
        this.spanMilSec.innerText = ':' + '00';

        this.h2.appendChild(this.spanHour);
        this.h2.appendChild(this.spanMin);
        this.h2.appendChild(this.spanSec);
        this.h2.appendChild(this.spanMilSec);
        this.col_xs_4.appendChild(this.h2);
        this.stopwatch = document.createElement('div');
        this.stopwatch.className += 'stopwatch-laps';
        this.col_xs_4.appendChild(this.stopwatch);
        this.row.appendChild(this.col_xs_4);
        this.col_xs_4_stopwatch = document.createElement('div');
        this.col_xs_4_stopwatch.className += 'col-xs-4 stopwatch-controls';
        this.btn_group = document.createElement('div');
        this.btn_group.className += 'btn-group btn-group-lg';

        this.button = document.createElement('button');
        this.button.className += 'btn btn-primary';
        this.button.innerText += 'Start';
        this.btn_group.appendChild(this.button);
        this.button = document.createElement('button');
        this.button.className += 'btn btn-info';
        this.button.innerText += 'Lap';
        this.btn_group.appendChild(this.button);
        this.button = document.createElement('button');
        this.button.className += 'btn btn-danger btn-sm';
        this.button.innerText += 'Reset';
        this.col_xs_4_stopwatch.appendChild(this.btn_group);
        this.col_xs_4_stopwatch.appendChild(this.button);
        this.row.appendChild(this.col_xs_4_stopwatch);
        this.cont = document.querySelector('.container');
        this.cont.appendChild(this.row);
// end create menu
    }

    Timer.prototype.events = function(){
            if (event.target.classList[1] === 'btn-primary' || event.keyCode === 83) {
//     start
                if(this.timer){
                    clearTimeout(this.timer);
                    this.timer = undefined;
                    return;
                }
                this.innerTimer();
            }
            if (event.target.classList[1] === 'btn-info' || event.keyCode === 76) {
//      lap
                var divItem = document.createElement('div');
                divItem.className += "alert alert-info";
                divItem.innerHTML +=  this.spanHour.innerText + this.spanMin.innerText + this.spanSec.innerText + this.spanMilSec.innerText;
                divItem.innerHTML += '<span class="label label-danger">X</span>';
                this.stopwatch.insertBefore(divItem, this.stopwatch.firstChild);
            }
            if (event.target.classList[2] === 'btn-sm' || event.keyCode === 82) {
//      reset
                this.milSec = 0;
                this.second = 0;
                this.minute = 0;
                this.hours = 0;

                this.spanHour.innerText =  '00';
                this.spanMin.innerText = ':00';
                this.spanSec.innerText = ':00';
                this.spanMilSec.innerText = ':00';

                if(this.timer){
                    clearTimeout(this.timer);
                    this.timer = undefined;

                }
                // delete all children
                while (this.stopwatch.firstChild) {
                    this.stopwatch.removeChild(this.stopwatch.firstChild);
                }
            }
        }

Timer.prototype.innerTimer = function() {

        function run(){
            this.milSec += 100;
            if (this.milSec / 1000 === 1) {
                this.second += 1;
                this.milSec = 0;
            }
            if (this.second / 60 === 1) {
                this.second = 0;
                this.minute += 1;
            }
            if (this.minute / 60 === 1) {
                this.minute = 0;
                this.hours += 1;
            }

            this.spanHour.innerText = this.hours > 10 ? this.hours : '0'+ this.hours;
            this.spanMin.innerText =  this.minute > 10 ?  ':' + this.minute : ':0' + this.minute;
            this.spanSec.innerText =  this.second > 10 ? ':' + this.second : ':0' + this.second;
            this.spanMilSec.innerText = this.milSec === 0 ? ':00' : ':'+ this.milSec;
            this.timer = setTimeout(run.bind(this), 100);
        }
        this.timer = setTimeout( run.bind(this), 100)
    }

    var timer1 = new Timer();
}())