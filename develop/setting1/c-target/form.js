
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden')

    var businessSelect = mselect();   // 行业下拉框
    var areaSelect = mselect();  // 地区下拉框
    var unitSelect = mselect(); //单位
    var yearSelect = mselect(); //年份
    var enterpriseSelect = mselect();  //企业
    var typeSelect = mselect();  //企业

    var _Desciption = mtext();  // 指标描述输入框
    var _Value = mtext();//指标值
    var targetvalueID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        targetvalueID.config({ selector: '#TARGETVALUEID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        areaSelect.config({ selector: '#PROVINCEID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        yearSelect.config({ selector: '#CHECKYEAR' }).init();
        enterpriseSelect.config({ selector: '#ENTERPRISEID' }).init();
        typeSelect.config({ selector: '#CTYPE' }).init();

        _Value.config({ selector: '#CTARGETVALUE' }).init();

        areaSelect.change(function () {
            var condition = { PROVINCEIDLIST: areaSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList(condition, function (data) {
                enterpriseSelect.bindSource(data)
            })
        })

        businessSelect.change(function () {
            var condition = { PROVINCEIDLIST: areaSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList(condition, function (data) {
                enterpriseSelect.bindSource(data)
            })
        })

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getAreaOptions(function (data) {
            areaSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getYearOptions(function (data) {
            yearSelect.bindSource(data);
        })

        dao.getEnterpriseOptions(function (data) {
            enterpriseSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {
        targetvalueID.clear();
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        unitSelect.selectFirst();
        yearSelect.selectFirst();
        enterpriseSelect.selectFirst();
        typeSelect.selectFirst();
        _Value.clear();
    }

    // 加载数据
    ret.load = function (record) {

        businessSelect.val(record.BUSINESSID);
        areaSelect.val(record.PROVINCEID);
        unitSelect.val(record.UNITID);
        yearSelect.val(record.CHECKYEAR);
        enterpriseSelect.val(record.ENTERPRISEID);
        typeSelect.val(record.CTYPE);

        targetvalueID.val(record.TARGETVALUEID)
        _Value.val(record.CTARGETVALUE);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            TARGETVALUEID: targetvalueID.val(),
            BUSINESSID: businessSelect.val(),
            PROVINCEID: areaSelect.val(),
            UNITID: unitSelect.val(),
            CHECKYEAR: yearSelect.val(),
            ENTERPRISEID: enterpriseSelect.val(),
            CTYPE: typeSelect.val(),

            CTARGETVALUE: _Value.val()
    };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            CTARGETVALUE: _Value.val()
        }
    }

    return ret;
})