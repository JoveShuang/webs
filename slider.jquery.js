// var s = new Slider('banner_img', 300);
// s.setWidth(548);
// console.log(s);
// s.init().start();
function Slider(id, delay) {

    var _this = this;

    this.id = '#' + id; // 图片承包div的id
    this.imgWidth = $(this.id).width();
    this.queryImgs = this.id + ' img';
    this.delay = delay; // 动画时间
    this.imgs = $(this.queryImgs);
    this.imgsLength = this.imgs.length;

    this.init = function() {
        // 将最后的图移至开头,并在视图区显示第一张图
        $(this.id).prepend(this.imgs[this.imgsLength-1]);
        $(this.id).css("transform","translateX(-"+ this.imgWidth +"px)");
        this.imgs = $(this.queryImgs);

        return this;
    }

    this.setWidth = function(width){
        this.imgWidth = width;
        return this;
    }

    this.start = function() {
        // 执行事件
        $('.'+ id +'-arrow-right').on("click",function(){

            // 调整位置
            $(_this.id).css({
                "transform": "translateX(-"+ (_this.imgWidth * 2) +"px)",
                "transition": "ease "+ _this.delay +"ms"
            });

            // 位置调整完 将首尾的图换位置
            setTimeout(function() {
                $(_this.id).css("transition","initial");
                $(_this.id).append(_this.imgs[0]);
                $(_this.id).css("transform","translateX(-"+ _this.imgWidth +"px)");
                _this.imgs = $(_this.queryImgs);
            }, _this.delay);

        })

        // 执行事件
        $('.'+ id +'-arrow-left').on('click',function(){

            // 调整位置
            $(_this.id).css({
                "transform": "translateX(0)",
                "transition": "ease "+ _this.delay +"ms"
            });

            // 位置调整完 将首尾的图换位置
            setTimeout(function() {
                $(_this.id).css("transition","initial");
                $(_this.id).prepend(_this.imgs[_this.imgsLength - 1]);
                $(_this.id).css("transform","translateX(-"+ _this.imgWidth +"px)");
                _this.imgs = $(_this.queryImgs);
            }, _this.delay);
        })
    }
}

$.fn.extend({
    slider: function(){
        var container = '#' + this[0].id;
        var imgWidth = $(container).width();
        var queryImgs = $(container + " img") ;
        var imgs = queryImgs;
        this.init =  function(){
            $(container).prepend(imgs[imgs.length - 1]);
            $(container).css("transform","translateX(-"+ imgWidth +"px)");
            imgs = queryImgs;
            return this;
        }
        

        this.setWidth = function(width){
            imgWidth = width;
            return this;
        }

        this.start = function() {
        // 执行事件
            $('.'+ id +'-arrow-right').on("click",function(){

                // 调整位置
                $(_this.id).css({
                    "transform": "translateX(-"+ (_this.imgWidth * 2) +"px)",
                    "transition": "ease "+ _this.delay +"ms"
                });

                // 位置调整完 将首尾的图换位置
                setTimeout(function() {
                    $(_this.id).css("transition","initial");
                    $(_this.id).append(_this.imgs[0]);
                    $(_this.id).css("transform","translateX(-"+ _this.imgWidth +"px)");
                    _this.imgs = $(_this.queryImgs);
                }, _this.delay);

            })

            // 执行事件
            $('.'+ id +'-arrow-left').on('click',function(){

                // 调整位置
                $(_this.id).css({
                    "transform": "translateX(0)",
                    "transition": "ease "+ _this.delay +"ms"
                });

                // 位置调整完 将首尾的图换位置
                setTimeout(function() {
                    $(_this.id).css("transition","initial");
                    $(_this.id).prepend(_this.imgs[_this.imgsLength - 1]);
                    $(_this.id).css("transform","translateX(-"+ _this.imgWidth +"px)");
                    _this.imgs = $(_this.queryImgs);
                }, _this.delay);
            })
        }
    }
})

$('#banner_img').slider(delay);