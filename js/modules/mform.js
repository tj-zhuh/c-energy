; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.mform = factory(root.$)
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
        selector: 'form',    // jquery选择器
    };

    function ctor() {
        this.options = defOptions;
        this.el = null;  // jquery元素
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
    }

    // 初始化（jquery元素创建、事件绑定）
    ctor.prototype.init = function () {

        var that = this;

        // jquery元素创建
        this.el = $(this.options.selector);
    }

    ctor.prototype.clear = function () {
        $('input[type=hidden]', this.el).val('');
        $('input[type=text]', this.el).val('');
        $('select', this.el).val('');
    }

    ctor.prototype.load = function (data) {

        this.clear();

        for (var property in data) {
            if (typeof data[property] == 'string' || typeof data[property] == 'number') {
                $('#' + property, this.form).val(data[property]);
            }
        }

    }

    ctor.prototype.serialize = function () {

        var data = this.el.serialize();
        data = data.replace(/\+/g, " ");

        var formData = decodeURIComponent(data);

        var ret = {};

        if (formData) {
            var ret = {};
            var arr = formData.split('&');

            for (var i = 0; i < arr.length; i++) {
                if (!arr[i]) continue;
                s = arr[i].split('=');
                ret[s[0]] = s[1];
            }
        }

        $('select', this.form).each(function () {
            var select = this;
            var id = $(select).attr('id');
            if (typeof ret[id] == 'undefined') {
                ret[id] = '';
            }
        })

        return ret;
    }

    return manager.fac(ctor);
}))