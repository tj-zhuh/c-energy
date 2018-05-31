/* 表单 */

define(function (require) {
    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');  // mhidden：input hidden 模块

    var mediumSelect = mselect();
    var businessSelect = mselect();
    var sourceSelect = mselect();
    var factorValueText = mtext();
    var unitSelect = mselect();
    var factorGbText = mtext();
    var mID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {
        mediumSelect.config({ selector: '#EMEDIUMID' }).init();
        factorValueText.config({ selector: '#FACTORVALUE' }).init();
        factorGbText.config({ selector: '#FACTORGBCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        sourceSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        mID.config({ selector: '#EFACTORID' }).init();


        dao.getEMediumSelectOptions(function (data) {
            mediumSelect.bindSource(data);
        })

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getSourceOptions(function (data) {
            sourceSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {
        mediumSelect.selectFirst();
        businessSelect.selectFirst();
        sourceSelect.selectFirst();
        unitSelect.selectFirst();
        factorValueText.clear();
        factorGbText.clear();
        mID.clear();
    }

    // 加载数据
    ret.load = function (record) {
        mediumSelect.val(record.EMEDIUMID);
        businessSelect.val(record.BUSINESSID);
        sourceSelect.val(record.EMISSIONTYPESOURCE);
        unitSelect.val(record.UNITID);
        factorValueText.val(record.FACTORVALUE);
        factorGbText.val(record.FACTORGBCODE);
        mID.val(record.EFACTORID);
    }

    // 获得数据
    ret.serialize = function () {
        return {
            EMEDIUMID: mediumSelect.val(),
            BUSINESSID: businessSelect.val(),//
            EMISSIONTYPESOURCE: sourceSelect.val(),
            UNITID: unitSelect.val(),
            FACTORVALUE: factorValueText.val(),
            FACTORGBCODE: factorGbText.val(),
            EFACTORID: mID.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            FACTORGBCODE: factorGbText.val(),
            FACTORVALUE: factorValueText.val()
        }
    }

    return ret;
})