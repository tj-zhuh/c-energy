
/* 负责url相关的处理  */

define(function (require) {
    var $ = require('jquery');


    var ret = {};

    ret.regionName = '';

    // 初始化
    ret.init = function () {

        // 读取url，获得当前的区域名字
        ret.regionName = decodeURI(window.location.search).slice(3, decodeURI(window.location.search).length);

        $('.goback').click(function () {
            window.history.go(-1);
        })
    }

    return ret;
})