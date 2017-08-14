/**
 * Created by Administrator on 2017/6/4.
 */
$(function () {
  //使用jQuery制作无缝轮播循环
  function moveLess(){
    $(".ali_cloud_one").animate({'top':'-=476'},8000).delay(1000)
        .animate({'top':'+=476'},8000,function(){
          setTimeout(moveLess(),1000);
        });
  };
  moveLess();

//统计拦截攻击次数，使用正则表达式给number添加千分位分位符
  var str_count = $("#serve_count").text();
  var arr_count = str_count.split(",");
  var str_num = +arr_count.join("");
  //console.log(str_num);
  function addCommas(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
  var timerId_num = setInterval(function () {
    var num_step = parseInt(Math.random()*1000+1000);
        var count_num = 0;
    var timerId_count = setInterval(function () {
          str_num += 6;
          count_num +=6;
          if(count_num > num_step){
            clearInterval(timerId_count);
          }
          var str_Ecount = addCommas(str_num);
          $("#serve_count").text(str_Ecount);
    },1)
  },5000)


  //----固定侧边栏部分特效
  $("#ask_side").hover(function () {
    $("#ask_side img")[0].src = "images/side_hover.png";
  }, function () {
    $("#ask_side img")[0].src = "images/click_side.png"
  })

  $("#tele_side").hover(function () {
    $("#tele_side img")[0].src = "images/tele_before.png";
    $("#side_img").css("display","block");
  }, function () {
    $("#tele_side img")[0].src = "images/tele_side.gif";
    $("#side_img").css("display","none");
  })

  //------新增二维码效果-------
  var Deg = 0;
  var timer2 = null;

  $("#phone_side").hover(function () {

    clearInterval(timer2);
    timer2 = setInterval(function(){
      Deg+=15;
      $("#erweima_side").css({
        transform: "rotate("+Deg+"deg)"
      })
    },10);

    $("#erweima_side").stop().animate({//不断改变二维码大小，定位，透明度
      width:100,
      height:100,
      left:-110,
      top:25,
      opacity:1
    },1000,"swing",function(){
      clearInterval(timer2);//到达目标位置清空计时器二维码停止旋转，并让二维码摆正
      $("#erweima_side").css({
        transform: "rotate(0deg)"
      });
    });

    $("#phone_side img")[0 ].src = "images/phone_hover.png";
    //$("#erweima_side").css("display","block");
  }, function () {
    $("#phone_side img")[0 ].src = "images/phone_side.jpg";
    $("#erweima_side").stop().animate({
      width:0,
      height:0,
      left:-650,
      top:0,
      opacity:0
    },1000,"swing",function () {
      $("#erweima_side").css('display','none');
    })
  })

  $("#show_side").hover(function () {
    $("#show_side img")[0 ].src = "images/hover_show.png";
  }, function () {
    $("#show_side img")[0 ].src = "images/show_normal.jpg";
  })

  window.onscroll = function () {
    //console.log (typeof ($ (window).scrollTop ()));
    if($(window).scrollTop() > 300){
      $("#show_side img").css("display","block");
    }
    else{
      $("#show_side img").css("display","none");
    }
  }



//map部分圆圈扩散特效
function dotCircle($ele) {
  $ele.animate({
    'width':'80',
    'height':'80',
    'opacity':'0'
  },2000,function () {
    $ele.css({
      'width':"10",
      'height':'10',
      'opacity':'1'
    })
    setTimeout(dotCircle($ele),1000)
  });
}
setTimeout(dotCircle($(".circle_one")),10)
setTimeout(dotCircle($(".circle_two")),2500)
setTimeout(dotCircle($(".circle_three")),5000)

















})






