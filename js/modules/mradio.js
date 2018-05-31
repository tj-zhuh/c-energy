; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.mradio = factory(root.$)
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
        selector: '.radio',    // jquery选择器
    };

    function ctor() {
        this.el = null;  // jquery元素
        this.selectedId;  // 当前正选中的id
        this.selectedName;  // 当前正选中的name
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

        var activeLi = $('li.active', this.ul);
        var id = activeLi.attr('itemId');
        var name = $('li', activeLi).html();
        this.selectedId = id;
        this.selectedName = name;

        // 事件绑定
        this.el.on('click', 'li', function (e) {

            if (that.el.hasClass('disabled')) return;

            var id = $(this).attr('itemId');
            var name = $('i', $(this)).html();

            if (that.selectedId != id) {
                $('li', that.el).removeClass('active');
                $(this).addClass('active');

                that.selectedId = id;
                that.selectedName = name;
                if (typeof that.changeHandler === 'function') {
                    that.changeHandler(id, name);
                }
            }
        })
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