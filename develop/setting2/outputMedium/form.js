
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');


    var businessSelect = mselect();   // 行业下拉框
    var areaSelect = mselect();
    var enterpriseSelect = mselect();


    var ret = {};

    // 初始化
    ret.init = function () {

        businessSelect.config({ selector: '#BUSINESSID' }).init();
        areaSelect.config({ selector: '#BUSINESSID' }).init();
        enterpriseSelect.config({ selector: '#BUSINESSID' }).init();


        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })
        dao.getBusinessOptions(function (data) {
            areaSelect.bindSource(data);
        })
        dao.getBusinessOptions(function (data) {
            enterpriseSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        enterpriseSelect.selectFirst();


    }

    // 加载数据
    ret.load = function (record) {

        businessSelect.val(record.BUSINESSID);
        areaSelect.val(record.BUSINESSID);
        enterpriseSelect.val(record.BUSINESSID);

    }

    // 获得数据
    ret.serialize = function () {

        return {
            BUSINESSID: businessSelect.val(),
            BUSINESSID: areaSelect.val(),
            BUSINESSID: enterpriseSelect.val(),

        };
    }

    return ret;
})