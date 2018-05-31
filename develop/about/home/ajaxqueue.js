
/* ajax队列
 * 解决同一个api多次请求，回调次序无法确定的问题
 */

; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.ajaxqueue = factory(root.$)
    }
}(this, function ($) {

    if (typeof $ !== 'function')
        throw new Error('模块$获取失败');

    function F(fn) {
        this.fn = fn;
        this.busy = false;
        this.requestQueue = [];
    }

    F.prototype.exe = function (args) {

        if (this.busy) {
            this.requestQueue.push(args);
        } else {
            this.busy = true;
            this.fn.apply({}, args);
        }
    }

    F.prototype.complete = function () {
        if (this.requestQueue.length > 0) {
            var obj = this.requestQueue.shift();
            this.fn.apply({}, obj);
        } else {
            this.busy = false;
        }
    }

    function ret() { }

    var pool = {};

    ret.execute = function (name, fn) {
        if (!pool[name]) {
            pool[name] = new F(fn);
        }

        var args = Array.prototype.slice.call(arguments, 2);
        pool[name].exe(args);
    }

    ret.complete = function (name) {
        if (!pool[name]) {
            pool[name] = new F(fn);
        }

        pool[name].complete(); 
    }

    return ret;
}))