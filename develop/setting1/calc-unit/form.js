
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');  // mhidden：input hidden 模块



    var nameText = mtext(); // 名称输入框
    var codeText = mtext();  // 编码输入框
    var changeText = mtext();  // 换算关系输入框
    var gbCodeSelect = mselect();   //国际标准编码下拉框
    var unitId = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        unitId.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#UNITDESC' }).init();
        codeText.config({ selector: '#UNITCODE' }).init();
        changeText.config({ selector: '#GBUNITCHANGE' }).init();
        gbCodeSelect.config({ selector: '#GBUNITDESC'}).init();

        dao.getGbCodeOptions(function (data) {
            gbCodeSelect.bindSource(data);
        });


    }

    // 清空数据
    ret.clear = function () {

        unitId.clear();
        nameText.clear();
        codeText.clear();
        changeText.clear();
        gbCodeSelect.val('');
    }

    // 加载数据
    ret.load = function (record) {
        gbCodeSelect.val(record.GBUNITDESC);
        unitId.val(record.UNITID);
        nameText.val(record.UNITDESC);
        codeText.val(record.UNITCODE);
        changeText.val(record.GBUNITCHANGE);
    }

    // 获得数据
    ret.serialize = function () {

        return {
            UNITID: unitId.val(),
            UNITDESC: nameText.val(),
            UNITCODE: codeText.val(),
            GBUNITCHANGE: changeText.val(),
            GBUNITDESC: gbCodeSelect.selectedName
        }; 
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            UNITDESC: nameText.val(),
            UNITCODE: codeText.val(),
            GBUNITCHANGE: changeText.val()
        }
    }

    return ret;
})