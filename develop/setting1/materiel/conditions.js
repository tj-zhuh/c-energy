
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var selectBusiness = mselect();  // 行业选择下拉框
    var selectMcategory = mselect(); //物料类别下拉

    var ret = {};

    // 初始化
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-name1',
            selectAll: true
        });
        selectBusiness.init();
        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })


        selectMcategory.config({
            selector: '#search-name2',
            selectAll: true
        });
        selectMcategory.init();
        dao.getMcategoryOptions(function (data) {
            selectMcategory.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            MCATEGORYID: selectMcategory.selectedId || ''
        };
    }

    return ret;
})