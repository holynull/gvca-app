
//自适应
function sizeShow(){
    var pic_w=$(window).width();
    var pic_h=pic_w*0.6;
    $(".slide").height(pic_h);
    $(".slide li").width(pic_w).height(pic_h);
    $(".slide ul").width(pic_w*4)
};

function scrollAuto(){
    sizeShow();
    $(window).resize(function(){sizeShow()});
    var oclass=$(".slide");
    var w=oclass.find("li").width();
    var iNow = 0, index = 1, timer = null;
    var touch={
            "s":[],
            "m":[],
            "e":[],
            "d":""
        };
    
    oclass[0].addEventListener('touchstart', function(e){
        touch.s[0] = e.targetTouches[0].pageX;
        touch.s[1] = e.targetTouches[0].pageY;
        touch.s[2] = (new Date()).getTime();
        clearInterval(timer)
    }, false);
    
    oclass[0].addEventListener('touchmove', function(e){
        var a=Math.abs(e.targetTouches[0].pageX-touch.s[0])
        var b=Math.abs(e.targetTouches[0].pageY-touch.s[1]);
        console.log("dMove:"+touch.d)
        if(a>=b && touch.d==""){
            touch.d=1;//左右
            //touch.m[0]=touch.s[0]
        }else if(touch.d==""){
            touch.d=0;//上下或者偏上下
        }
        console.log(a+":::"+b)
        if(touch.d==1){//左右滚动
           e.preventDefault();
            $(".slide ul").css({"left":-iNow*w+e.targetTouches[0].pageX-touch.s[0]});
           // touch.m[0]=e.targetTouches[0].pageX;
            //touch.m[1]=e.targetTouches[0].pageY;
        }
        
    }, false);
    
    oclass[0].addEventListener('touchend', function(e){
        console.log("dEnd:"+touch.d)
        if(touch.d==1){
            if((new Date()).getTime()-touch.s[2]>700){
                if(e.changedTouches[0].pageX-touch.s[0]>w/3){
                    auto("right")
                }else if(touch.s[0]-e.changedTouches[0].pageX>w/3){
                    auto("left")
                }else{
                    auto("reset")
                }
            }else{
                if(e.changedTouches[0].pageX>touch.s[0]){
                    auto("right");
                }else if(touch.s[0]>e.changedTouches[0].pageX){
                    auto("left")
                }
            }
        }
        touch.d="";
        timer=setInterval(function(){
            if(iNow>=$(".slide li").length-1){
                iNow=0;
            }else{
                iNow++
            }
            $(".slide ul").animate({"left":-w*iNow})
            $(".circle em").eq(iNow).addClass("active").siblings().removeClass("active");
            $(".title-box .title").html($(".slide li").eq(iNow).find("a").attr("title"))
        },3000);
        
    }, false);
    
    function auto(c){
        if(c=="left"){
            if(iNow>=$(".slide li").length-1){
                iNow=$(".slide li").length-1
            }else{
                iNow++
            }
            console.log(iNow)
            $(".slide ul").animate({"left":-w*iNow})
        }else if(c=="right"){
            if(iNow<=0){
                iNow=0
            }else{
                iNow--
            }
            $(".slide ul").animate({"left":-w*iNow})
        }else if(c=="reset"){
            $(".slide ul").animate({"left":-w*iNow})
        }
        $(".circle em").eq(iNow).addClass("active").siblings().removeClass("active");
        $(".title-box .title").html($(".slide li").eq(iNow).find("a").attr("title"))
    };
    
    timer=setInterval(function(){
        if(iNow>=$(".slide li").length-1){
            iNow=0;
        }else{
            iNow++
        }
        $(".slide ul").animate({"left":-w*iNow})
        $(".circle em").eq(iNow).addClass("active").siblings().removeClass("active");
        $(".title-box .title").html($(".slide li").eq(iNow).find("a").attr("title"))
    },3000);
    
}
$(function(){
    scrollAuto();
})


