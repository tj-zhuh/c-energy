; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.dict = factory(root.$)
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

    var uidIndex = 1;
    function getUid() {
        return 'uid' + uidIndex++;
    }

    // 一个li项目
    function Item() {
        this.id;
        this.name;
        this.el;
        this.elementInput;
        this.elementSpan;
        this.elementDel;
        this.active = false;  // 是否正处于焦点状态
        this.uid;
    }

    // 创建项目
    Item.prototype.create = function (id, name, ul) {

        this.id = id;
        this.name = name;
        this.uid = getUid();

        var li = $("<li></li>");
        li.attr('itemId', id);
        li.attr('itemName', name);
        li.attr('uid', this.uid);
        ul.append(li);

        var span = $("<span></span>");
        span.html(name);
        li.append(span);

        var input = $("<input type='text'></input>");
        input.val(name);
        li.append(input);

        var del = $("<cite></cite>");
        li.append(del);
        
        this.el = li;
        this.elementSpan = span;
        this.elementInput = input;
        this.elementDel = del;
    } 

    // 使当前项目处于焦点
    Item.prototype.focus = function () {

        if (this.active) return;

        this.active = true;

        // 将文本设置到input中
        this.elementInput.val(this.name);
        this.elementInput.width(this.elementSpan.width());       

        // 修改class
        this.el.addClass('active');
        this.elementInput.focus();
    }

    // 使当前项目失去焦点
    Item.prototype.blur = function () {

        if (this.active == false) return;

        this.active = false;

        // 读取input中的文本，并应用到项目
        this.name = this.elementInput.val();
        this.elementSpan.html(this.name);

        // 修改class
        this.el.removeClass('active');
    }

    Item.prototype.remove = function () {
        this.el.remove();
    }
    
    var defOptions = {
        selector: '.dict',    // jquery选择器
    };

    function ctor() {
        this.options = defOptions;
        this.el = null;  // jquery元素      
        this.elementAdd = null; // 添加按钮元素
        this.ul;   // ul元素
        this.allItems = [];  // ul中的所有项目
        this.focusedItem = null; // 处于焦点的项目
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
    }

    ctor.prototype.findByUid = function (uid) {
        for (var i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i].uid == uid)
                return this.allItems[i];
        }
    }

    ctor.prototype.deleteByUid = function (uid) {
        for (var i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i].uid == uid) {
                this.allItems[i].remove();
                this.allItems.splice(i, 1);
                return;
            }            
        }
    }

    // 初始化（jquery元素创建、事件绑定）
    ctor.prototype.init = function () {

        var that = this;

        // jquery元素查询
        this.el = $(this.options.selector);   // 整个dict元素
        this.elementAdd = $('.dict-add', this.el); // 添加按钮
        this.ul = $('ul', this.el);   // ul元素

        // 绑定添加按钮的事件
        this.elementAdd.click(function () {
            that.add();
        })

        // 绑定span的点击事件
        this.el.on('click', 'span', function () {
            var element = $(this);
            var li = element.parent();
            var uid = li.attr('uid');
            var item = that.findByUid(uid);
            item.focus();
        })

        // 绑定input的失去焦点事件
        this.el.on('blur', 'input', function () {
            var element = $(this);
            var li = element.parent();
            var uid = li.attr('uid');
            var item = that.findByUid(uid);
            item.blur();
        })

        // 绑定cite的点击事件
        this.el.on('click', 'cite', function () {
            var element = $(this);
            var li = element.parent();
            var uid = li.attr('uid');
            that.deleteByUid(uid);
        })
    }

    // 添加项目
    ctor.prototype.add = function () {

        var that = this;

        // 使目前焦点项目失去焦点
        if (this.focusedItem) {
            this.focusedItem.blur();
            this.focusedItem = null;
        }

        // 创建项目
        var item = new Item();
        item.create('', '', this.ul);

        // 令项目处于焦点
        item.focus();
        this.focusedItem = item;

        // 将项目添加到列表
        this.allItems.push(item);
    }

    ctor.prototype.clear = function () {
        $('li', this.ul).remove();
        this.allItems = [];
    }

    ctor.prototype.load = function (data) {

        this.clear();

        for (var i = 0; i < data.length; i++) {
            var item = new Item();
            item.create(data[i].itemId, data[i].itemName, this.ul);
            this.allItems.push(item);
        }
    } 

    ctor.prototype.serialize = function () {
          
        var arr = [];

        for (var i = 0; i < this.allItems.length; i++) {
            arr.push({
                itemId: this.allItems[i].id,
                itemName: this.allItems[i].name
            });
        }

        return arr;
    }

    return manager.fac(ctor);
}))