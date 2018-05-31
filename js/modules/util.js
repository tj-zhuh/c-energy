///*********util主接口函数***************/
//; (function (root, factory) {
//    if (typeof define == 'function' && define.amd) {
//        define(function (require) {
//            var jquery = require('jquery');
//            var msg = require('msg');
//            var auth = require('auth');
//            return factory(jquery, msg, auth);
//        })
//    }
//    else { root.util = factory(root.$, root.msg) }
//}(this, function ($, msg, auth) {

//    if (typeof $ !== 'function')
//        throw new Error('模块$获取失败');

//    if (typeof msg !== 'function')
//        throw new Error('msg模块没获取进来');

//    if (typeof auth !== 'function')
//        throw new Error('auth模块没获取进来');

    
//}))


define(function (require) {
    var jquery = require('jquery');
    var msg = require('msg');
    var auth = require('auth');

    function ret() { }

    //绑定新方法专区
    ret.alert = function (context, callback) {
        msg.alert(context, callback);
    }

    ret.confirm = function (context, callback) {
        msg.confirm(context, callback);
    }

    ret.preload = function () {
        var images = new Array()

        for (i = 0; i < arguments.length; i++) {
            images[i] = new Image()
            images[i].src = arguments[i]
        }
    }

    ret.auth = function (pageCode) {
        auth.config({
            pageCode: pageCode
        }).init();
    }

    return ret;

})