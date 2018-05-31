
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');       //mtext：输入框模块
    var dao = require('dao');
    var textName = mtext();       // 介质名称输入框
    var selectCategory = mselect();   //介质类型选择下拉框


    var ret = {};

    // 初始化
    ret.init = function () {

        textName.config({
            selector: '#search-name',
            selectAll: true
        });
        textName.init();

        selectCategory.config({
            selector: '#search-category',
            selectAll: true
        });
        selectCategory.init();

        dao.getCategoryOptions(function (data) {
            selectCategory.bindSource(data);
        });
    }

    ret.serialize = function () {
        return {
            EMTYPEID: selectCategory.selectedId || '',
            ENERGYDESC: textName.val() || ''        
        };
    }

    return ret;
})