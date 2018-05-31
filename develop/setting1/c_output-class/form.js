
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var mhidden = require('mhidden');  // mhidden：input hidden 模块
    var dao = require('dao');

    var businessSelect = mselect();   // 行业下拉框
    var typeSelect = mselect();   // 来源下拉框
    var nameText = mtext(); // 名称输入框
    //var codeText = mtext();  // 编码输入框
    var emissionId = mhidden();
    var typeCode = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        emissionId.config({ selector: '#EMISSIONTYPEID' }).init();
        typeCode.config({ selector: '#ETYPECODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        typeSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        nameText.config({ selector: '#EMISSIONTYPEDESC' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

 
    }

    // 清空数据
    ret.clear = function () {

        emissionId.clear()
        typeCode.clear();
        businessSelect.selectFirst();
        typeSelect.selectFirst();
        nameText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        emissionId.val(record.EMISSIONTYPEID);
        typeCode.val(record.ETYPECODE);
        businessSelect.val(record.BUSINESSID);
        typeSelect.val(record.EMISSIONTYPESOURCE);
        nameText.val(record.EMISSIONTYPEDESC);
    }

    // 获得数据
    ret.serialize = function () {

        return {
            EMISSIONTYPEID: emissionId.val(),
            ETYPECODE: typeCode.val(),
            BUSINESSID: businessSelect.val(),
            EMISSIONTYPESOURCE: typeSelect.val(),
            EMISSIONDESC: nameText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            EMISSIONTYPEDESC: nameText.val(),
            //ETYPECODE: codeText.val()
        }
    }

    return ret;
})