
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // 行业下拉框
    var areaSelect = mselect();   // 地区类别下拉框
    var sourceSelect = mselect();  // 排放源名称下拉框
    var unitSelect = mselect();  // 单位称下拉框
    var coefficientSelect = mselect();//排放因子下拉框
    var valueText = mtext(); // 国标值输入框
    var typeSourceSelect = mselect();//来源下拉框
    var versionText = mtext();      //版本输入框
    var factorconID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        factorconID.config({ selector: '#FACTORCONID' }).init();
        areaSelect.config({ selector: '#ZONETYPE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        sourceSelect.config({ selector: '#EEMISSIONID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        coefficientSelect.config({ selector: '#EFACTORID' }).init();
        valueText.config({ selector: '#FACTORVALUE' }).init();
        typeSourceSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        versionText.config({ selector: '#GBCODE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        businessSelect.change(function () {
            var condition = { BUSINESSID: businessSelect.selectedId,ofs:0,ps:9999}
            dao.getcoeffientOptions2(condition, function (data) {
                coefficientSelect.bindSource(data)
            })
        })

        dao.getAreaOptions(function (data) {
            areaSelect.bindSource(data);
        })

        dao.getTypeSourceOptions(function (data) {
            typeSourceSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getout_SourceOptions(function (data) {
            sourceSelect.bindSource(data);
        })

        dao.getcoeffientOptions(function (data) {
            coefficientSelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        sourceSelect.selectFirst();
        unitSelect.selectFirst();
        coefficientSelect.selectFirst();
        valueText.clear();
        typeSourceSelect.selectFirst();
        versionText.val('V1.0');
        factorconID.clear();
    }

    // 加载数据
    ret.load = function (record) {

        factorconID.val(record.FACTORCONID);
        areaSelect.val(record.ZONETYPE);
        businessSelect.val(record.BUSINESSID);
        sourceSelect.val(record.EEMISSIONID);
        coefficientSelect.val(record.EFACTORID);
        valueText.val(record.FACTORVALUE);
        unitSelect.val(record.UNITID);
        typeSourceSelect.val(record.EMISSIONTYPESOURCE);
        versionText.val(record.GBCODE);

    }

    // 获得数据
    ret.serialize = function () {

        return {

            FACTORCONID: factorconID.val(),
            ZONETYPE: areaSelect.val(),
            BUSINESSID: businessSelect.val(),
            EEMISSIONID: sourceSelect.val(),
            EFACTORID: coefficientSelect.val(),
            FACTORVALUE: valueText.val(),
            UNITID: unitSelect.val(),
            EMISSIONTYPESOURCE: typeSourceSelect.val(),
            GBCODE: versionText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            FACTORVALUE: valueText.val(),

        }
    }

    return ret;
})