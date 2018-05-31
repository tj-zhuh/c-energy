; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.mcheck = factory(root.$)
    }
}(this, function ($) {

    if (typeof $ !== 'function')
        throw new Error('模块$获取失败');

    var manager = (function ($) {
        return {
            privates: [],
            instances: [],
            ctor: null,
            create: function () {
                if (typeof ctor !== 'function')
                    throw new Error('ctor不是函数');

                var obj = new ctor();
                this.privates.push({});
                this.instances.push(obj);
                return obj;

            },
            getp: function (obj, key) {
                if (!obj || typeof key !== 'string')
                    throw new Error('getp函数参数不正确');

                for (var i = 0; i < this.instances.length; i++) {
                    if (this.instances[i] === obj) {
                        return this.privates[i][key];
                    }
                }

            },
            setp: function (obj, key, value) {

                if (!obj || typeof key !== 'string')
                    throw new Error('getp函数参数不正确');

                for (var i = 0; i < this.instances.length; i++) {
                    if (this.instances[i] === obj) {
                        this.privates[i][key] = value;
                    }
                }
            },
            fac: function (ctor) {
                var that = this;
                this.ctor = ctor;
                var dfObj = this.create();
                function ret() {
                    return that.create();
                };
                $.extend(ret, dfObj);
                ret.version = typeof version === 'string' ? version : undefined;
                this.instances[0] = ret;
                return ret;
            }
        };
    })($);

    var defOptions = {
        selector: '.mcheck',    // jquery选择器
    };

    function ctor() {
        this.el = null;  // jquery元素        
        this.changeHandler;  // 选择事件的处理函数        
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
    }

    // 初始化（jquery元素创建、事件绑定）
    ctor.prototype.init = function () {

        var that = this;

        // jquery元素创建
        this.el = $(this.options.selector);        

        // 事件绑定
        this.el.on('click', 'li', function (e) {

            if (that.el.hasClass('disabled')) return;

            var li = $(this);
            var id = li.attr('itemId');
            var name = $('i', li).html();

            if (li.hasClass('active')) {
                li.removeClass('active');
            } else {
                li.addClass('active');
            }

            if (typeof that.changeHandler === 'function') {
                that.changeHandler();
            } 
        })
    }

    ctor.prototype.getSelections = function () {
        var arr = [];
        $('li', this.el).each(function () {
            var li = $(this);
            if (li.hasClass('active')) {
                arr.push({
                    id: li.attr('itemId'),
                    name: $('i', li).html()
                });
            }
        });
        return arr;
    }
    
    // 选择事件处理函数的绑定
    ctor.prototype.change = function (func) {
        this.changeHandler = func;
    }

    // 设置是否为disabled
    ctor.prototype.setDisabled = function (flag) {
        flag ? this.el.addClass('disabled') : this.el.removeClass('disabled');
    }

    return manager.fac(ctor);
}))