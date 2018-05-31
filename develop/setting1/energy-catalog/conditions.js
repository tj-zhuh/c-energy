
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var selectBusiness = mselect();  // 行业选择下拉框
    var selectUnit = mselect();

    var ret = {};

    // 初始化
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-name',
            selectAll: true
        });
        selectBusiness.init();

        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
        };
    }

    return ret;
})