/* 表单模块 */

define(function (require) {

    var $ = require('jquery');
    var dao = require('dao');
    var mtext = require('mtext');
    var mselect = require('mselect');
    var grid=require('grid');


    //定义返回值
    var ret = {};

    //定义实例
    var textUserName = mtext();
    var selectRole = mselect();

    // 初始化
    ret.init = function () {

        textUserName.config({
            selector: '#USERNAME',
            selectAll: false,
        });
        textUserName.init();

        selectRole.config({
            selector: '#ROLECODE',
            selectAll: false,
        });
        selectRole.init();
        dao.getRoleOptions(function (data) {
            selectRole.bindSource(data);
        });
    }

    // 清空数据
    ret.clear = function () {
        textUserName.clear();

        selectRole.selectFirst();
    }

    // 加载数据
    ret.load = function (record) {
        textUserName.val(record.USERNAME);

        selectRole.val(record.ROLECODE);
    }

    //整合条件序列
    ret.serialize = function () {
        return {

            USERID: grid.UserId || '',

            USERNAME: textUserName.val() || '',
            //单选下拉框返回序列
            ROLECODE: selectRole.selectedId || '',
        };
    }

    //返回输入框所得数据,确认所有需要填充的框都有数据
    //此处无hiddenUserId值，它不用输入
    ret.confirmInputAll = function () {
        return {
            //文本框返回序列
            USERNAME: textUserName.val() || '',

            //单选下拉框返回序列
            ROLECODE: selectRole.selectedId || '',
            //或： SELECTINPUT: selectRole.val(),
        };
    }
    return ret;
})