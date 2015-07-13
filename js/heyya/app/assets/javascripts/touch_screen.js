$(document).ready(function(){

  var mc = new Hammer($('.carousel-inner')[0]);
  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  mc.on("panleft panright", function(ev) {

    if(ev.type === 'panleft'){
      $('.carousel').carousel('next');
    }

    if(ev.type === 'panright'){
      $('.carousel').carousel('prev');
    }
  });

})