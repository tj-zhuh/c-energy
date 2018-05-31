; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.demohelper = factory()
    }
}(this, function () {
 
    function ret() { }

    // 获得随机数    参数：最小值、最大值、小数点后位数(可选，默认为0)
    ret.getRandom = function (min, max, precision) {

    }   

    ret.getRandomList = function (number, min, max, precision, smooth) {

    }

    return ret;
}))