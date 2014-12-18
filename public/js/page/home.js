/*
首页js
*/

$(document).ready(function(){



    //scroll
    var scfaaa=0;
    var scfbbb=$(".banner").length-1;
    function scroll_es_kv(){
        if(scfaaa<scfbbb&&scfaaa>-1){
            $(".banner").removeClass("seliaop");
            $(".kv_tips li").removeClass("selected").eq(scfaaa+1).addClass("selected");
            $(".banner").eq(scfaaa).animate({left:"-100%"},1000,"easeOutQuad");
            $(".banner").eq(scfaaa+1).addClass("seliaop").animate({left:"0"},1000,"easeOutQuad",function(){$(".banner").not(".seliaop").css("left","100%");});
            scfaaa=scfaaa+1;
        }
        else{
            scfaaa=-1;
            $(".banner").removeClass("seliaop");
            $(".kv_tips li").removeClass("selected").eq(scfaaa+1).addClass("selected");
            $(".banner").eq(scfbbb).animate({left:"-100%"},1000,"easeOutQuad");
            $(".banner").eq(scfaaa+1).addClass("seliaop").animate({left:"0"},1000,"easeOutQuad",function(){$(".banner").not(".seliaop").css("left","100%");});
            scfaaa=scfaaa+1;
        }
    }
    essss=setInterval(scroll_es_kv,4000);
    $(".kv_tips li,.banner a img").hover(
        function(){
            clearInterval(essss);
        },
        function(){
            essss=setInterval(scroll_es_kv,4000);
        }
    );
    $(".kv_tips li").click(
        function(e){
            if($(this).hasClass("selected"))
            {
                return;
            }
            else
            {
                var scfindex=$(".kv_tips li").index($(this));

                clearInterval(essss);



                if($(".kv").hasClass("kv_click"))
                {
                    $(".kv").removeClass("kv_click");
                    $(".banner").removeClass("seliaop");
                    $(".kv_tips li").removeClass("selected").eq(scfindex).addClass("selected");
                    $(".banner").eq(scfaaa).animate({left:"-100%"},1000,"easeOutQuad");

                    $(".banner").eq(scfindex).addClass("seliaop").animate({left:"0"},1000,"easeOutQuad",function(){$(".banner").not(".seliaop").css("left","100%");$(".kv").addClass("kv_click");});

                    scfaaa=scfindex;
                }
                else{}
            }
        }
    );
    //scroll_end

});


$(window).load(function(){
    $(".kv").css("height",$(".banner img").height());
    $(".kv_tips li span").each(function(){
        $(this).css("width",parseInt($(this).parent("li").width())+30);
    });

    $(window).resize(function(){
        $(".kv").css("height",$(".banner img").height());
        $(".kv_tips li span").each(function(){
            $(this).css("width",parseInt($(this).parent("li").width())+30);
        });
    });
});