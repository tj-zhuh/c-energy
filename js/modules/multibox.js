; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.multibox = factory(root.$)
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

    // 一个框 构造函数
    function Choice() {
        this.id;
        this.name;
        this.element; // jquery元素
        this.cite; // cite元素（实现方框）  
        this.state; // 是否选中
    }

    // 设置是否为选中
    Choice.prototype.set = function (flag) {
        if (this.state == flag)
            return;

        this.state = flag;

        if (this.state) {
            this.element.addClass('active');
        } else {
            this.element.removeClass('active');
        }
    }

    // 被点击
    Choice.prototype.toggle = function () {
        this.set(!this.state);
    }

    var defOptions = {
        textSelector: '',    // 文本框的选择器
        boxSelector: '',  // 下拉时出现窗体的选择器  
        idField: 'itemId', // id字段
        nameField: 'itemName' // name字段
    };

    function ctor() {
        this.options = defOptions;
        this.text;  // 文本框元素
        this.box;  // 下拉创奇元素
        this.ul;  // ul元素
        this.choiceAll; // all选项
        this.choices = [];  // ul里面的选项
        this.beforeTextClickHandler;  // 点击text元素之前的事件处理
        this.changeHandler; // 修改事件处理
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
    }

    ctor.prototype.add = function (id, name) {
        var choice = new Choice();
        choice.id = id;
        choice.name = name;

        // 创建li
        var li = $("<li class='choice'>");
        li.attr('itemId', id);
        li.attr('itemName', name);
        this.ul.append(li);

        // 创建选择框
        var cite = $("<cite>");
        li.append(cite);

        // 文字
        li.append(name);

        choice.element = li;
        choice.cite = cite;
        choice.state = false;
        this.choices.push(choice);
    }

    ctor.prototype.init = function () {
        var that = this;
        var text = $(this.options.textSelector);  // 文本框
        var box = $(this.options.boxSelector); // 下拉的窗体


        // 绘制遮挡条
        var mask = $("<div class='mask'>");
        box.append(mask);

        // 绘制全选框
        var all = $("<div class='all choice'>");
        box.append(all);
        var checkbox = $("<cite>");
        all.append(checkbox);
        all.append('全部');
        var choiceAll = new Choice();
        choiceAll.id = '',
        choiceAll.name = '全部',
        choiceAll.element = all;
        choiceAll.cite = checkbox;
        choiceAll.state = false;

        // 创建ul
        var ul = $("<ul>");
        box.append(ul);


        // 点击text事件
        text.click(function (e) {

            if (text.hasClass('disabled')) return;

            var flag = box.hasClass('active');

            if (typeof that.beforeTextClickHandler === 'function') {
                that.beforeTextClickHandler();
            }

            if (flag) {
                box.removeClass('active');
            } else {
                box.addClass('active');
            }

            e.stopPropagation();
        })

        box.click(function (e) {
            e.stopPropagation();
        })

        // choice点击事件
        box.on('click', '.choice', function (e) {

            var element = $(this);
            var itemId = element.attr('itemId');
            var itemName = element.attr('itemName');

            // 找到被点击的框的js对象
            var choice;
            var isAll = false;
            if (element.hasClass('all')) {
                choice = that.choiceAll;
                isAll = true;
            } else {
                for (var i = 0; i < that.choices.length; i++) {
                    if (that.choices[i].id == itemId) {
                        choice = that.choices[i];
                        break;
                    }
                }
            }

            if (!choice) throw new Error('multibox中发生错误：找不到点击的项');

            // 修改这个框的选中状态
            choice.toggle();

            // 如果是点击的全选按钮
            if (isAll) {
                var flag = choice.state;
                for (var i = 0; i < that.choices.length; i++) {
                    that.choices[i].set(flag);
                }
                var str = flag ? '全部' : '';
                that.text.html(str);
            } else {
                var allChecked = true;
                var str = '';
                for (var i = 0; i < that.choices.length; i++) {
                    if (that.choices[i].state == false) {
                        allChecked = false;
                    } else {
                        str += that.choices[i].name + '&nbsp;&nbsp;';
                    }
                }
                that.choiceAll.set(allChecked);
                if (allChecked) {
                    str = '全部';
                }
                that.text.html(str);
            }

            // 触发事件
            if (typeof that.changeHandler === 'function') {
                that.changeHandler(itemId, itemName);
            }

            e.stopPropagation();
        })

        this.text = text;
        this.box = box;
        this.ul = ul;
        this.choiceAll = choiceAll;
    }

    ctor.prototype.bindSource = function (list) {

        // 清空以前的选项
        $('li', this.ul).remove();
        this.choices = [];

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = item[this.options.idField];
            var name = item[this.options.nameField];
            this.add(id, name);
        }
    }

    ctor.prototype.hide = function () {
        this.box.removeClass('active');
    }

    ctor.prototype.beforeTextClick = function (func) {
        this.beforeTextClickHandler = func;
    }

    ctor.prototype.change = function (func) {
        this.changeHandler = func;
    }

    ctor.prototype.getSelections = function () {
        var list = [];
        for (var i = 0; i < this.choices.length; i++) {
            if (this.choices[i].state == true) {
                list.push({
                    id: this.choices[i].id,
                    name: this.choices[i].name
                })
            }
        }
        return list;
    }

    // 设置是否为disabled
    ctor.prototype.setDisabled = function (flag) {

        if (flag) {
            this.text.addClass('disabled');
            this.hide();
        } else {
            this.text.removeClass('disabled')
        }
    }

    return manager.fac(ctor);
}))