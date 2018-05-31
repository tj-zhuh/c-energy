; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.auth = factory(root.$)
    }
}(this, function ($) {

    if (typeof $ !== 'function')
        throw new Error('模块$获取失败');

    var defOptions = {
        pageCode: ''  // 当前页面的编码       
    }; 

    function ret() { }

    ret.options = defOptions;

    ret.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
        return this;
    }

    function showWarningMsg(msg, fn) {
        
        if ($("div.top-warning").length > 0) return;
        var body = $('body');
        var div = $("<div class='top-warning'></div>");
        div.append(msg);
        var cite = $("<cite></cite>");
        div.append(cite);
        div.append('');
        body.prepend(div);
        div.click(fn)
    }

    ret.init = function () {

        var that = this;
        var codeField = 'MENUCODE';
        var isAuthField = 'ISAUTHOR';
        var pageCode = this.options.pageCode;

        $.ajax({
            url: '/api/HomeInns/GetAuthors',
            type: 'get',            
            success: function (data) {
                var list = data.Models || [];

                if (list.length == 0) {

                    showWarningMsg('无法获得用户信息，点击此处返回登录页面', function () {
                        window.location.href = '/login.html';
                    });
                   
                    return;
                }
                
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];

                    if (item[codeField] == pageCode) {
                        if (item[isAuthField] == false) {

                            showWarningMsg('当前用户没有权限访问该页面，点击此处返回登录页面', function () {
                                window.location.href = '/login.html';
                            });

                            return;
                        }
                    }

                    if (item[isAuthField] == false) {
                        $('.auth-' + item[codeField]).hide();
                    }
                }

                // test
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    console.log( i + '    ' + item.MENUID + '   ' + item.MENUNAME + '    ' + item.MENUCODE + '    ' + item.ISAUTHOR)
                }

            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
         
        return this;
    }

    return ret;
}))