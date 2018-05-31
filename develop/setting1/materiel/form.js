
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // 行业下拉框
    var unitSelect = mselect();  // 单位下拉框
    var nameText = mtext(); // 名称输入框
    var codeText = mtext();  // 编码输入框
    var mID = mhidden();
    var McategorySelect = mselect();


    var ret = {};

    // 初始化
    ret.init = function () {


        mID.config({ selector: '#BMATERIALID' }).init();
        McategorySelect.config({ selector: '#MCATEGORYID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#MATERIALDESC' }).init();
        codeText.config({ selector: '#MATERIALCODE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getMcategoryOptions(function (data) {
            McategorySelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {
        mID.clear();
        McategorySelect.selectFirst();
        businessSelect.selectFirst();
        unitSelect.selectFirst();
        nameText.clear();
        codeText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.BMATERIALID)
        McategorySelect.val(record.MCATEGORYID);
        businessSelect.val(record.BUSINESSID);
        unitSelect.val(record.UNITID);
        nameText.val(record.MATERIALDESC);
        codeText.val(record.MATERIALCODE);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            BMATERIALID: mID.val(),
            MCATEGORYID:McategorySelect.val(),
            BUSINESSID: businessSelect.val(),
            UNITID: unitSelect.val(),
            MATERIALDESC: nameText.val(),
            MATERIALCODE: codeText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            MATERIALDESC: nameText.val(),
        }
    }

    return ret;
})