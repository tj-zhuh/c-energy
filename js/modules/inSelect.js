//***************注意事项(重要)******************/
//开发者:zbc
//由于zbc技术有限，凡使用此模块的用户请避免使用的Id如下：



//***********************************************/

; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) { var jquery = require('jquery');return factory(jquery);})
    }
    else {root.inSelect = factory(root.$)}
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
        autoSelectFirst: false   // 是否默认选中第一项
    };



    function ctor() {
        this.el = null;  // jquery元素
        this.box = null;
        this.selectedId;  // 当前正选中的id
        this.selectedName;  // 当前正选中的name
        this.changeHandler;  // 选择事件的处理函数
        this.loadHandler; // 数据源绑定完成的处理函数
        this.options = defOptions;
    }

    ctor.prototype.init = function (config) {

        var that = this;
        this.el = $(config.id);
        this.box = $(config.box);
   
        var img = $('<img src="/images2/icon-choice.png" style="float:right;margin-top:0.05rem">');
        img.hover(function(){
            $(this).css('cursor','pointer')
        })
        img.click(function () {
            if (1) {
                that.box.attr('style','margin-left:0rem')
            }

            else if (0) {

            }
        })
        this.el.append(img);






    }
    


    return manager.fac(ctor);
}))