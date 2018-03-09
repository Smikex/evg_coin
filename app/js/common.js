$(document).ready(function() {

	ScrollBar();

	$("#user-plan").on('click', function(event) {
		event.preventDefault();
		$(this).closest(".user-balans").toggleClass('active');
	});

	var currencyLi = $("#currency-view li");
	currencyLi.on('click', function(event) {
		event.preventDefault();
		currencyLi.removeClass("selected");
		$(this).addClass("selected");
	});

	var panelRatioLi = $("#panel-ratio li");
	panelRatioLi.on('click', function(event) {
		event.preventDefault();
		panelRatioLi.removeClass("active");
		$(this).addClass("active");
	});


  /*________TABS________*/
  $(".view-sidebar .main-container-tabs .tab:first").show();

  $(".view-sidebar .nav-tabs li").click(function(event) {

    $(".view-sidebar .nav-tabs li").removeClass('selected');
    $(this).addClass('selected');
    $(".view-sidebar .main-container-tabs .tab").hide();
    $(".view-sidebar .main-container-tabs .tab").eq($(this).index()).show();

   	if($(".view-sidebar .nav-tabs li:first").hasClass("selected")){
   		$(".view-sidebar .nav-tabs").addClass('before');
   	}else{
			$(".view-sidebar .nav-tabs").removeClass('before');
   	}
  });

  $(".orders-shell .main-container-tabs .tab:first").show();
  $(".orders-shell .nav-tabs li").click(function(event) {
    $(".orders-shell .nav-tabs li").removeClass('selected');
    $(this).addClass('selected');
    $(".orders-shell .main-container-tabs .tab").hide();
    $(".orders-shell .main-container-tabs .tab").eq($(this).index()).show();
  });
  /*________End TABS________*/

  function	ScrollBar(){
  	var balance  = $(".balance-block .data-view")
  	balance.mCustomScrollbar({
  		axis:"y",
			scrollButtons:{enable:true},
			scrollbarPosition:"outside"
  	});
  	var orderTable = $(".panel-order .table-wrapper .tbodys");
  	orderTable.mCustomScrollbar({
  		axis:"y",
			scrollButtons:{enable:true},
			scrollbarPosition:"outside"
  	});
  }

});/*________End Document________*/



