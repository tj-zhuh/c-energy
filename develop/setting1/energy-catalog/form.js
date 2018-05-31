
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // 行业下拉框
    var unitSelect = mselect();  // 单位下拉框
    var flagSelect = mselect();  // 判断下拉框
    var nameText = mtext(); // 名称输入框
    var mID = mhidden();
    var mCode = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#EINDEXID' }).init();
        mCode.config({ selector: '#INDEXCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        flagSelect.config({ selector: '#INDEXFLAG' }).init();
        nameText.config({ selector: '#INDEXNAME' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getFlagOptions(function (data) {
            flagSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        unitSelect.selectFirst();
        flagSelect.selectFirst();
        nameText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.EINDEXID);
        mCode.val(record.INDEXCODE);
        businessSelect.val(record.BUSINESSID);
        unitSelect.val(record.UNITID);
        flagSelect.val(record.INDEXFLAG);
        nameText.val(record.INDEXNAME);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            EINDEXID: mID.val()||'',
            INDEXCODE: mCode.val() || '',
            BUSINESSID: businessSelect.val(),
            UNITID: unitSelect.val(),
            INDEXNAME: nameText.val(),
            INDEXFLAG: flagSelect.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            INDEXNAME: nameText.val(),
        }
    }

    return ret;
})