; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.stselect = factory(root.$)
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
        selector: 'select'    // jquery选择器
    };

    function ctor() {
        this.el = null;  // jquery元素
        this.selectedId;  // 当前正选中的id
        this.selectedName;  // 当前正选中的name
        this.changeHandler;  // 选择事件的处理函数
        this.options = defOptions;
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
        return this;
    }

    // 初始化（jquery元素创建、事件绑定）
    ctor.prototype.init = function () {

        var that = this;

        // jquery元素创建
        this.el = $(this.options.selector);

        // 事件绑定
        this.el.change(function (e) {
            var selectedItem = $(this);
            var id = selectedItem.val();
            var name = selectedItem.html();
            that.selectedId = id;
            that.selectedName = name;

            if (typeof that.changeHandler === 'function') {
                that.changeHandler(id, name);
            }
        })

        var firstOption = $("option:first", this.el);
        if (firstOption) {
            that.selectedId = firstOption.attr('value');
            that.selectedName = firstOption.html();
        }

        return this;
    }

    ctor.prototype.selectFirst = function () {
        $("option:first", this.el).prop("selected", 'selected');

        return this;
    }

    ctor.prototype.val = function (value) {
        if (typeof text === 'string' || typeof text === 'number') {
            this.el.val(value);
            return this;
        }        

        return this.el.val();
    }

    // 选择事件处理函数的绑定
    ctor.prototype.change = function (func) {
        this.changeHandler = func;

        return this;
    }

    return manager.fac(ctor);
}))