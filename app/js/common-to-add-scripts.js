$(document).ready(function() {
  popupsShow();


  /*________Липкое меню________*/
  var navPos = $(".category-list-main").offset().top, //растояние между меню и верхней граицей
      navHeight = $(".header").outerHeight(true),//верхний текущий блок
      winPos;

  $('<div class="clone-nav"></div>').insertBefore('.category-list-main').css("height", navHeight).hide();//добавить перед/до елементом

  $(window).scroll(function(){
    winPos = $(window).scrollTop();
    if (winPos>=navHeight) {
      $(".category-list-main").addClass('fixed-nw box-shadow-nw');
      $(".clone-nav").show();
    } else {
      $(".category-list-main").removeClass('fixed-nw box-shadow-nw');
      $(".clone-nav").hide();
    }
  });

  $(window).resize(function(){
    navPos = $(".category-list-main").offset().top;//растояние между меню и верхней граицей
    navHeight = $(".header").outerHeight();
    if($('<div class="clone-nav"></div>').lenght==0){
      $('<div class="clone-nav"></div>').insertBefore('.category-list-main').css("height", navHeight).hide();//добавить перед/до елементом
    }
  });
  /*________End Липкое меню________*/


  /*________MatchHeight________*/
    if($(window).width()>768){
      $('.item').matchHeight();
    }

    $(window).resize(function() {
     if($(window).width()>768){
        $('.item').matchHeight();
      }
    });
  /*________End MatchHeight________*/

  /*________ Mask ________*/
  $("input[type='tel']").mask("+99-999-999-99-9?9");
  /*________End ________*/

  /*________ PopupsShow ________*/
  function popupsShow(){
    $(document).on('click', '.show_popup', function(event) {
      event.preventDefault();
      var target = $(this).data('target');
      $(target).fadeIn();
      $("body").css("overflow", "hidden");
    });
  }
  /*________ End PopupsShow ________*/


  /*________TABS________*/
  $(".main-container-tabs .tab:first").show();

  $(".nav-tabs li").click(function(event) {
    $(".nav-tabs li").removeClass('selected');
    $(this).addClass('selected');

    $(".main-container-tabs .tab").hide();
    $(".main-container-tabs .tab").eq($(this).index()).fadeIn("slow");
  });
  /*________End TABS________*/

  /*________Checked________*/
  $(".wpProQuiz_questionInput").on('click', function(){
    if($(this).is(":checked")){
      $(this).closest("ul").find("label").removeClass('active');
      $(this).parent("label").addClass('active');
    }
  });
  /*________End Checked________*/

  

});/*________End Document________*/



