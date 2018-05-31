; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.mselect = factory(root.$)
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
        selector: 'select',    // jquery选择器
        idField: 'itemId',   // id字段
        nameField: 'itemName',   // name字段
        selectAll: false,  // 是否添加全选选项
        autoSelectFirst: false,   // 是否默认选中第一项
        changeTrigger: false   // 通过代码（而非用户鼠标操作）导致下拉选项变化时，是否触发change事件
    };

    function ctor() {
        this.el = null;  // jquery元素
        this.selectedId;  // 当前正选中的id
        this.selectedName;  // 当前正选中的name
        this.changeHandler;  // 选择事件的处理函数
        this.loadHandler; // 数据源绑定完成的处理函数
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
            that.invokeChangeEvent('user');
        })

        return this;
    }

    // 绑定下拉数据
    ctor.prototype.bindSource = function (source) {

        var that = this;

        var idField = this.options.idField;
        var nameField = this.options.nameField;

        // 先删除之前的
        $('option', this.el).remove();

        var selectAll = this.options.selectAll;
        if (selectAll) {
            var option = $('<option>').val('').html('全部');
            this.el.append(option);
            this.selectedId = '';
            this.selectedName = '全部';
        }

        // 创建option
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            var option = $('<option>').val(item[idField]).html(item[nameField]);
            this.el.append(option);

            // 默认选中第一个
            if (i == 0 && !selectAll) {
                this.selectedId = item[idField];
                this.selectedName = item[nameField];
            }
        }

        // 关于默认选择第一项
        if (this.options.autoSelectFirst == false) {
            this.el.val('');
            this.selectedId = '';
            this.selectedName = '';
        } else {
            this.invokeChangeEvent();
        }

        if (typeof that.loadHandler === 'function') {
            that.loadHandler();
        }

        return this;
    }

    ctor.prototype.selectFirst = function () {
        $("option:first", this.el).prop("selected", 'selected');
        var selectedItem = this.el.find("option:selected");
        this.selectedId = selectedItem.val();
        this.selectedName = selectedItem.text();
        this.invokeChangeEvent();
        return this;
    }

    ctor.prototype.val = function (value) {
        if (typeof value === 'string') {
            this.el.val(value);
            var selectedItem = this.el.find("option:selected");
            this.selectedId = selectedItem.val();
            this.selectedName = selectedItem.text();
            this.invokeChangeEvent();
            return this;
        }        

        return this.el.val();
    }

    ctor.prototype.valname = function (value) {
        var that = this;
        if (typeof value === 'string') {
            $("option", this.el).each(function () {
                var option = $(this);
                if (option.text() === value) {
                    option.prop("selected", 'selected');
                    that.selectedId = option.val();
                    that.selectedName = option.text();
                    that.invokeChangeEvent();
                    return that;
                }
            })

            return that;
        }

        return this.selectedName;
    }

    // 选择事件处理函数的绑定
    ctor.prototype.change = function (func) {
        this.changeHandler = func;

        return this;
    }

    ctor.prototype.load = function (func) {
        this.loadHandler = func;
        return this;
    }

    ctor.prototype.setDisabled = function (flag) {
        flag ? this.el.attr('disabled', 'disabled') : this.el.removeAttr('disabled');
    }

    ctor.prototype.invokeChangeEvent = function (reason) {

        var that = this;

        // 由于用户鼠标点击造成的change，始终进行处理
        // 由于代码造成的change，如果配置项changeTrigger为true，则进行处理
        if (reason == 'user' || this.options.changeTrigger) {

            var selectedItem = this.el.find("option:selected");
            var id = selectedItem.val();
            var name = selectedItem.text();
            that.selectedId = id;
            that.selectedName = name;

            if (typeof that.changeHandler === 'function') {
                that.changeHandler(id, name);
            }
        }

        
    }

    return manager.fac(ctor);
}))