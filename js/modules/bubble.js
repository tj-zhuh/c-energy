; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.bubble = factory(root.$)
    }
}(this, function ($) {

    if (typeof $ !== 'function')
        throw new Error('模块$获取失败');    

    var defOptions = {
        selector: '.container'
    };

    var handlers = [];

    function ret() { }

    ret.options = defOptions;    

    ret.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
    }

    ret.init = function () {
        var that = this;
        $(this.options.selector).click(function () {
            that.invoke();
        })
    }

    ret.invoke = function () {
        for (var i = 0; i < handlers.length; i++) {
            var handler = handlers[i];
            if (typeof handler === 'function') {
                handler();
            }
        }
    }

    ret.addEventHandler = function (func) {
        handlers.push(func);
    }

    return ret;
}))