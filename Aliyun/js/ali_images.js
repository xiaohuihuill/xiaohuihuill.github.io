/**
 * Created by Forever on 2017/6/4.
 */
//鼠标移入图片放大
    $(function () {
        var picWidth = $('.shareContent_img_area img').width();
        var picHeight = $('.shareContent_img_area img').height();
        $('#img_box1,#img_box2,#img_box3').on('mouseenter', function () {
            $(this).find('img').animate({
                    width:picWidth+20,
                    height:picHeight+20
                },300)
        })
        $('#img_box1,#img_box2,#img_box3').on('mouseleave', function () {
            $(this).find('img').animate({
                width:picWidth,
                height:picHeight
            },300)
        })
    })
