
/*
header和navigation部分的js
*/

$(document).ready(function(){
    // $("a").focus(function(){$(this).blur();});

    //header
    $(".menu_myaccount").mouseover(
        function(e){
            e.stopPropagation();
            if($(".menu_myaccount_extent").hasClass("mmemouseclick")){

            }
            else{
                $(".menu_myaccount_extent").addClass("mmemouseover");
                $(".mmemouseover").show();
            }

        }
    );

    $(".menu_myaccount_extent").mouseleave(
        function(){
            if($(this).hasClass("mmemouseover")){
                $(this).hide().removeClass("mmemouseover");
            }
            else{}
        }
    );

    $(".menu_myaccount,.menu_myaccount_extent").click(
        function(e){
            e.stopPropagation();
            $(".menu_myaccount_extent").removeClass("mmemouseover").addClass("mmemouseclick");
            $(".mmemouseclick").show();
        }
    );

    $(document).click(function(){
        if($(".menu_myaccount_extent").hasClass("mmemouseclick")){
            $(".menu_myaccount_extent").hide().removeClass("mmemouseclick");
        }
        else{}
    });
    //header_end


    //nav
    $(".nav_title").hover(
        function(){
            if($(".nav_title").hasClass("nav_title_click")){}
            else{
                $(this).addClass("nav_title_move");
                $(".nav p,.nav ul").stop(true,true).hide();
                $(this).siblings("p").stop(true,true).show();
                $(this).siblings("ul").stop(true,true).show();
            }
        },
        function(){

        }
    );
    $(".nav_title").click(
        function(e){
            e.stopPropagation();
            $(this).removeClass("nav_title_move").addClass("nav_title_click");
            $(".nav p,.nav ul").stop(true,true).hide();
            $(this).siblings("p").stop(true,true).show();
            $(this).siblings("ul").stop(true,true).show();
        }
    );
    $(document).click(function(){
        $(".nav p,.nav ul").stop(true,true).hide();
        $(".nav_title").removeClass("nav_title_click");
    });


    $(".nav ul").mouseleave(
        function(){
            if($(".nav_title").hasClass("nav_title_click")){}
            else{
                $(this).siblings(".nav_title").removeClass("nav_title_move");
                $(this).siblings("p").stop(true,true).hide();
                $(this).stop(true,true).hide();
            }
        }
    );
    //nav_end


    $(window).scroll(function(){
        var windowtop=parseInt($(window).scrollTop());

        if(windowtop>115){
            $(".nav").css({"position":"fixed","top":"0"});
        }
        else
        {
            $(".nav").css({"position":"relative"});
        }
    });

});

$(window).load(function(){
    var topheight=parseInt($(".header").outerHeight())+parseInt($(".right").outerHeight())+parseInt($(".footer").outerHeight())+30;
    if(topheight<parseInt($(window).height())){
        $(".footer").addClass("footer-bottom");
    }
    else{}


    /*text*/
    $(".default-text").each(function(){
        var thisoi=$(this).attr("ori_value");

        if($(this).next("input").attr("type")=="password"){
            if($(this).val()==""){
                $(this).val(thisoi);
            } else {}

            $(this).focus(function(){
                $(this).hide();
                $(this).next("input[type='password']").show().focus();
            });

            $(this).siblings("input[type='password']").blur(function(){
                if($(this).val()==''){
                    $(this).hide();
                    $(this).prev("input[type='text']").val(thisoi).show();
                }
            });
        }

        else{
            if($(this).val()==""){
                $(this).val(thisoi);
            } else {}

            $(this).focus(function(){
                if($(this).val()==thisoi){
                    $(this).val("");
                }
            });

            $(this).blur(function(){
                if($(this).val()==''){
                    $(this).val(thisoi);
                }
            });
        }
    });
    /*text-end*/
});
