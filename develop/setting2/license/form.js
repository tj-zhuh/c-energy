
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // 单位
    var nameText = mtext(); // 介质名称输入框
    var codeText = mtext();  // 数值精度输入框
    var Ename = mtext();//  企业名称
    var mID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#EMEDIUMID' }).init();
        businessSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#ENERGYCODE' }).init();
        codeText.config({ selector: '#DATAPRECISION' }).init();
        Ename.config({ selector: '#ENTERPRISENAME' }).init();

        dao.getUnitOptions(function (data) {
            businessSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        nameText.clear();
        codeText.clear();
        Ename.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.EMEDIUMID);
        businessSelect.val(record.UNITID);
        nameText.val(record.ENERGYCODE);
        codeText.val(record.DATAPRECISION);
        Ename.val(record.ENTERPRISENAME);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            EMEDIUMID:mID.val(),
            UNITID: businessSelect.val(),
            ENTERPRISENAME: Ename.val(),
            ENERGYCODE: nameText.val(),
            DATAPRECISION: codeText.val()
        };
    }

    return ret;
})