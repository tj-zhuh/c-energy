
/*
    该文件定义对象MyForm
    封装form元素，具体包含以下功能    
    1. 将一行数据加载到form中
    2. 从form获得序列化的数据
    3. 提供一些常用方法

    作者 Zhu Hui
    ※ 有问题请联系作者，不要修改该文件

    <<<--- 配置项 --->>>
    selector  window元素的jquery选择器，默认是.window
    type    类型，默认是default，支提供基础的弹出框功能，其它包括select、grid

    <<<--- 接口函数 --->>>
    show  打开
    hide  关闭


    <<<--- type：select --->>>



    <<<--- type：grid --->>>



    
*/

function MyWindow(page, config) {    

    // 配置
    this.config = null;

    // 指向页面对象
    this.page = page;

    // 操作window元素的jquery元素
    this.el;

    this.init(config);

    this.dialog;
}

// 默认配置
MyWindow.prototype.config_defaults = {
    selector: '.window-container',
    type: 'default',
};

// 初始化
MyWindow.prototype.init = function (config) {
    var that = this;

    // 使用默认配置和自定义配置，组成最终使用的配置
    this.config = $.extend(true, {}, this.config_defaults, config);

    this.el = $(this.config.selector);

    var html = $(this.el).html();


    this.dialog = new Dialog();    
    this.dialog.Width = 300;
    this.dialog.Height = 100;
    this.dialog.Title = "内容页为html代码的窗口";
    this.dialog.InnerHtml = html;
    this.dialog.OKEvent = function () {
        that.dialog.close();
    };//点击确定后调用的方法    
}


MyWindow.prototype.show = function () {
    this.dialog.show();
}


MyWindow.prototype.hide = function () {
    this.dialog.close();
}
















MyForm.prototype.call_page_method = function (method_name) {

    if (typeof method_name != 'string')
    {
        console.log('MyForm.call_page_method中，method_name不是字符串，其值如下');
        console.log(method_name);
        return;
    }
    
    var page = this.page;
    
    var func = page[method_name];

    if (typeof func != 'function') {
        console.log('MyForm.call_page_method中，找不到调用的方法，方法名如下');
        console.log(method_name);
        return;
    }

    var args = [];

    for (var i in arguments) {
        if (i > 0) {
            args.push(arguments[i]);
        }
    }    

    func.apply(this.page, args)
}





