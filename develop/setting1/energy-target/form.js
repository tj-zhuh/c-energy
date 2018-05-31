
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect(); //行业下拉框
    var provinceSelect = mselect();     //地区下拉框
    var yearSelect = mselect();   // 年份下拉框
    var unitSelect = mselect();  // 单位下拉框
    var nameText = mselect(); // 类别输入框
    var codeText = mtext();  // 指标值输入框
    var mID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#ESAVINGINDEXID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        provinceSelect.config({ selector: '#PROVINCEID' }).init();
        yearSelect.config({ selector: '#ENERGYYEAR' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#ENTERPRISEID' }).init();
        codeText.config({ selector: '#SAVINGVALUE' }).init();

        provinceSelect.change(function () {
            var condition = { PROVINCEIDLIST: provinceSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId||'' }
            dao.getEnterpriseList2(condition, function (data) {
                nameText.bindSource(data)
            })
        })

        businessSelect.change(function () {
            var condition = { PROVINCEIDLIST: provinceSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList2(condition, function (data) {
                nameText.bindSource(data)
            })
        })



        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getProvinceOptions(function (data) {
            provinceSelect.bindSource(data);
        })

        dao.getYearOptions(function (data) {
            yearSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getEnterpriseOptions(function (data) {
            nameText.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        provinceSelect.selectFirst();
        yearSelect.selectFirst();
        unitSelect.selectFirst();
        nameText.selectFirst();
        codeText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.ESAVINGINDEXID);
        businessSelect.val(record.BUSINESSID);
        provinceSelect.val(record.PROVINCEID);
        yearSelect.val(record.ENERGYYEAR);
        unitSelect.val(record.UNITID);
        nameText.val(record.ENTERPRISEID);
        codeText.val(record.SAVINGVALUE);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            ESAVINGINDEXID: mID.val(),
            BUSINESSID: businessSelect.val(),
            PROVINCEID: provinceSelect.val(),
            ENERGYYEAR: yearSelect.val(),
            UNITID: unitSelect.val(),
            ENTERPRISEID: nameText.val(),
            SAVINGVALUE: codeText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            SAVINGVALUE: codeText.val()
        }
    }

    return ret;
})