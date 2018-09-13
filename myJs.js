/**
 * Created by QLF on 2018/9/1.
 */

/*
 * 获取游览器的scrollTop,scrollLeft
 * */
function getWinScroll() {
    return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement
            .scrollTop || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement
            .scrollLeft || 0

    }
}
/*
 * 获取行外样式
 * */
function getStyle(ele, arr) {
    return window.getComputedStyle ? window.getComputedStyle(ele, null)[arr] :
        ele.currentStyle[arr] || 0;
}

/*
 * 缓动动画函数
 *ele--->所加动画的元素
 * json--->{"width":target,....}
 * fn----->回调函数，动画结束执行
 * */
function animate(ele, json, fn) {
    //取消之前的定数器
    clearInterval(ele.timeId);
    ele.timeId = setInterval(function () {
        //假设全部到达目标
        var flag = true;
        for (var arr in json) {
            //目标
            var target = json[arr];
            //当前位置
            var current = getStyle(ele, arr);
            //如果是层级
            if (arr == "zIndex") {
                ele.style[arr] = target;
            }
            //如果是透明度
            else if (arr == "opacity") {
                current = current * 100;//0.7*100-->70
                //步数
                var step = (target - current) / 10;
                //步数取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //需移动到的位置
                current += step;
                ele.style[arr] = current / 100;
            }
            //如果是普通的
            else {
                current = parseInt(getStyle(ele, arr));
                //步数
                var step = (target - current) / 10;
                //步数取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //需移动到的位置
                current += step;
                ele.style[arr] = current + "px";
            }
            if (current != target) {
                flag = false
            }
        }
        if (flag) {
            clearInterval(ele.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20)
}


/*事件对象的封装
 * window.event和事件参数对象e的兼容
 * clientX和clientY的兼容代码
 * scrollLeft和scrollTop的兼容代码
 * pageX,pageY;clientX+scrollLeft ,clientY+scrollTop
 * */
var evt = {
    //window.event和事件参数对象e的兼容
    getEvent: function (evt) {
        return evt||window.event;
    },
    //可视区域的横坐标的兼容代码
    getClientX: function (evt) {
        return this.getEvent(evt).clientX;
    },
    //可视区域的纵坐标的兼容代码
    getClientY: function (evt) {
        return this.getEvent(evt).clientY;
    },
    //页面向左卷曲出去的横距离（坐标）
    getScrollLeft:function () {
        return window.pageXOffset||document.body.scrollLeft||
                document.documentElement.scrollLeft||0;
    },
    //页面向上卷曲出去的纵坐标
    getScrollTop:function () {
        return window.pageYOffset||document.body.scrollTop||
                document.documentElement.scrollTop||0;
    },
    //相对于页面的横坐标
    getPageX:function (evt) {
        return this.getEvent(evt).pageX?this.getEvent(evt).pageX:this.
            getClientX(evt)+this.getscrollLeft();
    },
    //相对于页面的纵坐标
    getPageY:function (evt) {
        return this.getEvent(evt).pageY?this.getEvent(evt).pageY:this
                .getClientY(evt)+this.getscrollLeft();
    }
}