
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // 行业下拉框
    var typeSelect = mselect();   // 类别类型下拉框
    var nameText = mtext(); // 名称输入框
    var mID = mhidden();
    var mCode = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#MCATEGORYID' }).init();
        mCode.config({ selector: '#CATEGORYCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        typeSelect.config({ selector: '#CATEGORYTYPE' }).init();
        nameText.config({ selector: '#CATEGORYDESC' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        typeSelect.selectFirst();
        nameText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.MCATEGORYID);
        mCode.val(record.CATEGORYCODE);
        businessSelect.val(record.BUSINESSID);
        typeSelect.val(record.CATEGORYTYPE);
        nameText.val(record.CATEGORYDESC);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            MCATEGORYID:mID.val(),
            CATEGORYCODE: mCode.val(),
            BUSINESSID: businessSelect.val(),
            CATEGORYTYPE: typeSelect.val(),
            CATEGORYDESC: nameText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            CATEGORYDESC: nameText.val(),
        }
    }

    return ret;
})