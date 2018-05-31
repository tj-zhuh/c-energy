//***************注意事项(重要)******************/
//开发者:zbc
//由于zbc技术有限，凡使用此模块的用户请避免使用的Id如下：
//  #zbczbczbcmembrane
//  #zbczbczbcalertMessage
//  #zbczbczbcerrorTitle
//  #zbczbczbcalert_text
//  #zbczbczbcconfirmBtn
//  #zbczbczbcclose_btn

//  #zbczbczbcmembrane2//
//  #zbczbczbcalertMessage2
//  #zbczbczbcerrorTitle2
//  #zbczbczbcalert_text2
//  #zbczbczbcconfirmBtn2
//  #zbczbczbcclose_btn2


//***********************************************/

; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) { var jquery = require('jquery'); return factory(jquery); })
    }
    else { root.msg = factory(root.$) }
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

    function Drag() {
        this.options = {
            window: 'window',
            head: 'window-head',
            limit: true, //锁定范围
            lock: false, //锁定位置
            lockX: false, //锁定水平位置
            lockY: false, //锁定垂直位置
            maxContainer: document.documentElement || document.body, //指定限制容器,
            width: 600,
            height: 400
        };
    }

    Drag.prototype = {
        config: function (options) {
            this.options = $.extend(false, {}, this.options, options);
        },
        init: function () {
            this.drag = this.iden(this.options.window);
            this.handle = this.iden(this.options.head);

            this._x = this._y = 0;                  //置0
            this._moveDrag = this.bind(this, this.moveDrag);            //绑定方法
            this._stopDrag = this.bind(this, this.stopDrag);


            this.maxContainer = this.iden(this.options.maxContainer);

            this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - (this.options.height + 10);
            this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - (this.options.width + 10);

            this.limit = this.options.limit;
            this.lockX = this.options.lockX;
            this.lockY = this.options.lockY;
            this.lock = this.options.lock;

            this.handle.style.cursor = "move";              //拖动时的鼠标move显示 

            this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))      //添加绑定事件

        },
        startDrag: function (event) {
            var event = event || window.event;

            this._x = event.clientX - this.drag.offsetLeft;         //初始拖拽坐标定位
            this._y = event.clientY - this.drag.offsetTop;

            this.addHandler(document, "mousemove", this._moveDrag);     //绑定鼠标移动事件
            this.addHandler(document, "mouseup", this._stopDrag);       //绑定鼠标松开事件

            event.preventDefault && event.preventDefault();             //阻止事件的默认动作
            this.handle.setCapture && this.handle.setCapture();
        },
        moveDrag: function (event) {
            var event = event || window.event;

            var iTop = event.clientY - this._y;         //现在位置的实时确定
            var iLeft = event.clientX - this._x;

            if (this.lock) return;

            //锁定范围专用
            this.limit && (iTop < 10 && (iTop = 10), iLeft < 10 && (iLeft = 10), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

            this.lockY || (this.drag.style.top = iTop + "px");
            this.lockX || (this.drag.style.left = iLeft + "px");

            event.preventDefault && event.preventDefault();
        },        //
        stopDrag: function () {
            this.removeHandler(document, "mousemove", this._moveDrag);
            this.removeHandler(document, "mouseup", this._stopDrag);

            this.handle.releaseCapture && this.handle.releaseCapture();
        },

        //获取id
        iden: function (id) {
            return typeof id === "string" ? document.getElementById(id) : id
        },
        //添加绑定事件(这里还考虑到了兼容问题)
        addHandler: function (oElement, sEventType, fnHandler) {
            return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
        },
        //删除绑定事件
        removeHandler: function (oElement, sEventType, fnHandler) {
            return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
        },
        //绑定事件到对象
        bind: function (object, fnHandler) {
            return function () {
                return fnHandler.apply(object, arguments)
            }
        }
    };


    function ctor() {
        this.el = null;  // jquery元素
        this.selectedId;  // 当前正选中的id
        this.selectedName;  // 当前正选中的name
        this.changeHandler;  // 选择事件的处理函数
        this.loadHandler; // 数据源绑定完成的处理函数
        this.options = defOptions;
        this.innerhtmlText = null;  //当前提示的内容
        //this.alreadycreated = false;
        this.drag = new Drag();
    }

    ctor.prototype.alert = function (context, callback) {

        if (typeof context !== 'string')
            throw new Error('提示信息应该是一个字符串');


        /*创建纯js的html标签模块*/
        var Theight = document.body.clientHeight;
        //模态薄膜
        var zbczbczbcmembrane = $('<div id="zbczbczbcmembrane"></div>');
        zbczbczbcmembrane.attr('style', 'position:fixed;top:0;right:0;bottom:0;left:0;background:#000000;z-index:1000;opacity:0.5')
        /***********************小窗口******************************/
        //小窗体
        var alertwindow = $('<div id="zbczbczbcalertMessage"></div>');
        alertwindow.attr('style', 'position:fixed;top:25%;left:30%;width:505px;height:283px;z-index:1001;background:white;display:none');

        //标题
        //var theTitle = $('<div id="zbczbczbcerrorTitle"><img src="/images/alert_alert-icon.png" style="float:left;margin-top:7px;margin-left:15px;margin-right:12px"/> <div style="color:white;width:120px;float:left;font-size:18pt">错误信息</div><img id="zbczbczbcclose_btn" src="/images/alert_close_normal.png" style="float:right;margin-right:16px;margin-top:12px;"/></div>');
        var theTitle = $('<div id="zbczbczbcerrorTitle"><img src="/images/alert_alert-icon.png" style="float:left;margin-top:7px;margin-left:15px;margin-right:12px"/> <div style="color:white;width:120px;float:left;font-size:18pt">提示信息</div><img id="zbczbczbcclose_btn" src="/images/alert_close_normal.png" style="float:right;margin-right:16px;margin-top:12px;"/></div>');
        theTitle.attr('style', 'width:99.6%;height:42px;background:#3b9edc;font-size:18pt;font-family:"微软雅黑";text-align:left;color:white;line-height:40px;text-indent:8px;border:1px solid #ccc');
        //theTitle.css('cursor', 'pointer');
        alertwindow.append(theTitle);


        //显示文字区
        var textContent = $('<div id="zbczbczbcalert_text"></div>');
        textContent.attr('style', 'width:100%;height:156px;border-bottom:solid 1px #ececec;text-align:center;font-size:40px;');
        var textShow = $('<div id="zbczbczbcalert_textShow"></div>');
        textShow.attr('style', 'width:300px;height:70px;position:relative;top:72px;margin:auto;word-break:break-all;font-size:14pt;font-family:"微软雅黑";color:#333333');
        textShow.html(context)

        textContent.append(textShow);
        alertwindow.append(textContent)

        //确定按钮
        var zbczbczbcconfirmBtn = $('<div id="zbczbczbcconfirmBtn">确定</div>');
        zbczbczbcconfirmBtn.attr('style', 'width:56px;height:34px;background:#3b9edc;margin:auto;margin-top:25px;border-radius:4px;text-align:center;font-size:14pt;font-family:"微软雅黑";line-height:36.8px;color:white');
        zbczbczbcconfirmBtn.css('cursor', 'pointer');
        alertwindow.append(zbczbczbcconfirmBtn)

        /*****************************************************/

        var Body = $('body');
        Body.append(zbczbczbcmembrane)
        Body.append(alertwindow);
        alertwindow.show();

        /*关于移动*/

        this.drag.config({
            window: 'zbczbczbcalertMessage',
            head: 'zbczbczbcerrorTitle',
            limit: true, //锁定范围
            lock: false, //锁定位置
            lockX: false, //锁定水平位置
            lockY: false, //锁定垂直位置
            maxContainer: document.documentElement || document.body, //指定限制容器,
            width: 0,
            height: 0
        })

        this.drag.init();

        /*****************************/

        //绑定事件
        zbczbczbcmembrane.click(function () {
            $(this).remove();
            alertwindow.remove();
        })
            
        zbczbczbcconfirmBtn.click(function () {
           
            alertwindow.remove();
            
            zbczbczbcmembrane.remove();
        })

        $('#zbczbczbcclose_btn').hover(function () {
            $(this).css('cursor', 'pointer')
            $(this).attr('src', '/images/alert_close_hover.png');
        }, function () {
            $(this).attr('src', '/images/alert_close_normal.png');
        })

        $('#zbczbczbcclose_btn').click(function () {
            $(this).attr('src', '/images/alert_close_click.png');
            alertwindow.remove();
            
            $('#zbczbczbcmembrane').remove();
        })

        //this.alreadycreated = true;

        //回调函数
        if (callback) {
            if (typeof callback !== 'function')
                throw new Error('后续操作不是一个正确的函数');
            else { callback() }
        }
    }

    ctor.prototype.confirm = function (context, callback) {
        if (typeof context !== 'string')
            throw new Error('提示信息应该是一个字符串');


        /*创建纯js的html标签模块*/
        var Theight = document.body.clientHeight;

        //模态薄膜
        var zbczbczbcmembrane = $('<div id="zbczbczbcmembrane"></div>');
        zbczbczbcmembrane.attr('style', 'position:fixed;top:0;right:0;bottom:0;left:0;;background:#000000;z-index:1000;opacity:0.5')
        /***********************小窗口******************************/
        //小窗体
        var alertwindow = $('<div id="zbczbczbcalertMessage2"></div>');
        alertwindow.attr('style', 'position:fixed;top:25%;left:30%;width:505px;height:283px;z-index:1001;background:white;display:none');

        //标题
        var theTitle = $('<div id="zbczbczbcerrorTitle2"><img src="/images/alert_Message-icon.png" style="float:left;margin-top:7px;margin-left:15px;margin-right:12px"/> <div style="color:white;width:120px;float:left;font-size:18pt">提示信息</div><img id="zbczbczbcclose_btn2" src="/images/alert_close_normal.png" style="float:right;margin-right:16px;margin-top:12px;"/></div>');
        theTitle.attr('style', 'width:99.7%;height:42px;background:#3b9edc;font-size:18pt;font-family:"微软雅黑";text-align:left;color:white;line-height:40px;text-indent:8px;border:1px solid #ccc');
        alertwindow.append(theTitle);


        //显示文字区
        var textContent = $('<div id="zbczbczbcalert_text2"></div>');
        textContent.attr('style', 'width:100%;height:156px;border-bottom:solid 1px #ececec;text-align:center;font-size:40px;');
        var textShow = $('<div id="zbczbczbcalert_textShow"></div>');
        textShow.attr('style', 'width:300px;height:70px;position:relative;top:72px;margin:auto;word-break:break-all;font-size:14pt;font-family:"微软雅黑";color:#333333');
        textShow.html(context)

        textContent.append(textShow);
        alertwindow.append(textContent)

        //确定和取消按钮
        var zbczbczbcconfirmBtn = $('<div id="zbczbczbcconfirmBtn2">确定</div>');
        var cancelBtn = $('<div id="cancelBtn">取消</div>');
        zbczbczbcconfirmBtn.attr('style', 'width:56px;height:34px;background:#3b9edc;margin:25.5px 85px 25.5px 154px;float:left;border-radius:4px;text-align:center;font-size:14pt;font-family:"微软雅黑";line-height:36.8px;color:white');
        cancelBtn.attr('style', 'width:56px;height:34px;background:#3b9edc;float:left;margin:25.5px 85px 25.5px 0px;border-radius:4px;text-align:center;font-size:14pt;font-family:"微软雅黑";line-height:36.8px;color:white');
        zbczbczbcconfirmBtn.css('cursor', 'pointer');
        cancelBtn.css('cursor', 'pointer');
        alertwindow.append(zbczbczbcconfirmBtn, cancelBtn);

        /*****************************************************/

        var Body = $('body');
        Body.append(zbczbczbcmembrane)
        Body.append(alertwindow);
        alertwindow.show();

        /*关于移动*/
        this.drag.config({
            window: 'zbczbczbcalertMessage2',
            head: 'zbczbczbcerrorTitle2',
            limit: true, //锁定范围
            lock: false, //锁定位置
            lockX: false, //锁定水平位置
            lockY: false, //锁定垂直位置
            maxContainer: document.documentElement || document.body, //指定限制容器,
            width: 0,
            height: 0
        })

        this.drag.init();

        /*****************************/

        //绑定事件
        zbczbczbcmembrane.click(function () {
            $(this).remove();
            alertwindow.remove();
            
        })

        zbczbczbcconfirmBtn.click(function () {
            alertwindow.remove();
            
            zbczbczbcmembrane.remove();
            //回调函数
            if (callback) {
                if (typeof callback !== 'function')
                {throw new Error('后续操作不是一个正确的函数')}
                else { callback() }
            }
        })

        cancelBtn.click(function () {
            alertwindow.remove();
            
            $('#zbczbczbcmembrane').remove();
        })

        $('#zbczbczbcclose_btn2').hover(function () {
            $(this).css('cursor', 'pointer')
            $(this).attr('src', '/images/alert_close_hover.png');
        }, function () {
            $(this).attr('src', '/images/alert_close_normal.png');
        })

        $('#zbczbczbcclose_btn2').click(function () {
            $(this).attr('src', '/images/alert_close_click.png');
            alertwindow.remove();
            
            $('#zbczbczbcmembrane').remove();
        })

        //this.alreadycreated = true;


    }




    return manager.fac(ctor);
}))