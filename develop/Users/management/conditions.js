/* 查询条件模块 */

define(function (require) {

    var $ = require('jquery');
    //dao.js: 数据传输模块，负责与后台通信或是展示仿真数据
    var dao = require('dao');
    //mtext: 文本框模块
    var mtext = require('mtext');

    //定义返回值
    var ret = {};

    //定义实例
    var textUserName = mtext();

    // 初始化
    ret.init = function () {

        //文本输入框模块初始化
        textUserName.config({
            selector: '#search-name',
            selectAll: true,
        });
        textUserName.init();
    };

    //整合条件序列
    ret.serialize = function () {
        return {
            //文本框返回序列
            UserName: textUserName.val() || '',
        };
    };
    return ret;
})