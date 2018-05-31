
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');  // mhidden：input hidden 模块


    var businessSelect = mselect();   // 行业下拉框
    //var unitSelect = mtext();  // 单位下拉框
    var nameText = mtext(); // 名称输入框
    var codeText = mtext();  // 编码输入框
    var efactorID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        efactorID.config({ selector: '#EFACTORID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        //unitSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#FACTORDESC' }).init();
        codeText.config({ selector: '#FACTORCODE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        //dao.getUnitOptions(function (data) {
        //    unitSelect.bindSource(data);
        //})
    }

    // 清空数据
    ret.clear = function () {

        efactorID.clear();
        businessSelect.selectFirst();
        //unitSelect.clear();
        nameText.clear();
        codeText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        efactorID.val(record.EFACTORID);
        businessSelect.val(record.BUSINESSID);
        //unitSelect.val(record.UNITID);
        nameText.val(record.FACTORDESC);
        codeText.val(record.FACTORCODE);
    }

    // 获得数据
    ret.serialize = function () {

        return {
            EFACTORID:efactorID.val(),
            BUSINESSID: businessSelect.val(),
            //UNITID: unitSelect.val(),
            FACTORDESC: nameText.val(),
            FACTORCODE: codeText.val()
        }; 
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            FACTORDESC: nameText.val(),
        }
    }

    return ret;
})