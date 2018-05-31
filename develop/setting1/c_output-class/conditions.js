
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var mtext=require('mtext')

    var Qcondition = mtext();  // 行业选择下拉框


    var ret = {};

    // 初始化
    ret.init = function () {

        Qcondition.config({
            selector: '#search-name',
            selectAll: true
        });
        Qcondition.init();

  
    }

    ret.serialize = function () {
        return { EMISSIONTYPEDESC: Qcondition.val() || '' };
    }

    return ret;
})