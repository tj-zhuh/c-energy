
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect(); //行业下拉框
    var indexSelect = mselect();   // 限额下拉框
    var unitSelect = mselect();  // 单位下拉框
    var typeSelect = mselect();  // 类型下拉框
    var limitTypeSelect = mselect(); // 限额类型输入框
    var limitMatNameSelect = mselect(); // 项目输入框
    var limitValueText = mtext();  // 限额值输入框
    var mID = mhidden();


    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#ELIMITID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        indexSelect.config({ selector: '#EINDEXID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        typeSelect.config({ selector: '#STANDARDTYPE' }).init();
        limitTypeSelect.config({ selector: '#LIMTTYPE' }).init();
        limitMatNameSelect.config({ selector: '#LIMITMATNAME' }).init();
        limitValueText.config({ selector: '#LIMITVALUE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getLimitTypeOptions(function (data) {
            limitTypeSelect.bindSource(data);
        })

        dao.getLimitMatNameOptions(function (data) {
            limitMatNameSelect.bindSource(data);
        })

        dao.getIndexOptions(function (data) {
            indexSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

        businessSelect.change(function () {

            var condition = { BUSINESSID: businessSelect.selectedId, ofs: 0, ps: 999999 }
            dao.getIndexOptions2(condition, function (data) {
                indexSelect.bindSource(data);
            })

        })
    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        indexSelect.selectFirst();
        unitSelect.selectFirst();
        typeSelect.selectFirst();
        limitTypeSelect.selectFirst();
        limitMatNameSelect.selectFirst();
        limitValueText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.ELIMITID);
        businessSelect.val(record.BUSINESSID);
        indexSelect.val(record.EINDEXID);
        unitSelect.val(record.UNITID);
        typeSelect.val(record.STANDARDTYPE);
        limitTypeSelect.val(record.LIMTTYPE);
        limitMatNameSelect.val(record.LIMITMATNAME);
        limitValueText.val(record.LIMITVALUE);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            ELIMITID: mID.val(),
            BUSINESSID: businessSelect.val(),
            EINDEXID: indexSelect.val()||'',
            UNITID: unitSelect.val(),
            STANDARDTYPE: typeSelect.val() || '',
            LIMTTYPE: limitTypeSelect.val(),
            LIMITMATNAME: limitMatNameSelect.val(),
            LIMITVALUE: limitValueText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            LIMITVALUE: limitValueText.val(),

        }
    }

    return ret;
})