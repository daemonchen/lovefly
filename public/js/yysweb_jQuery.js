$(document).ready(function(){

//旗下品牌
$('#top_navigation li').mousemove(function(){
    $(this).find('dl').slideDown();
    $(this).find('a').addClass('active');
  });
  $('#top_navigation li').mouseleave(function(){
    $(this).find('dl').stop(true,false).slideUp("fast");
	$(this).find('a').removeClass('active');

  });
  $('#top_navigation li').mouseleave(function(){
    $(this).find('dl').stop(true,false).slideUp("fast");
	$(this).find('a').removeClass('active');

  });




//menu
  $('#Navigation li').mousemove(function(){
    $(this).find('dl').slideDown();
    $(this).find('a').addClass('active');
  });
  $('#Navigation li').mouseleave(function(){
    $(this).find('dl').stop(true,false).slideUp("fast");
	$(this).find('a').removeClass('active');

  });
  $('#Navigation li').mouseleave(function(){
    $(this).find('dl').stop(true,false).slideUp("fast");
	$(this).find('a').removeClass('active');

  });




//首页经典案例
$(".wrap div").hover(function() {
	$(this).animate({"top": "-195px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
  });


//内页经典案例
$(".case-wrap div").hover(function() {
	$(this).animate({"top": "-247px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
  });


//详细页右侧相关案例
$(".xg-case-wrap div").hover(function() {
	$(this).animate({"top": "-21px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
  });




//合作伙伴
$(".hz-list-wrap div").hover(function() {
	$(this).animate({"top": "-21px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
  });


$(function(){
		$(".floor-maskItem").mouseover(function(){
			$(this).addClass("qq").parent().addClass("hover");
		}).mouseout(function(){
			$(this).removeClass("qq").parent().removeClass("hover");
		});
})




});