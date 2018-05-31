
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var selectBusiness = mselect();  // 行业选择下拉框
    var selectTypeSource = mselect();  // 类别类型选择下拉框

    var ret = {};

    // 初始化
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-name',
            selectAll: true
        }).init();

        selectTypeSource.config({
            selector: '#search-typesource'
        }).init();

        dao.getIndustryOptions(function (data) {
            selectBusiness.bindSource(data);
        })

        dao.getTypeSourceOptions(function (data) {
            selectTypeSource.bindSource(data);
        })
        selectTypeSource.val('');

    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            EMISSIONTYPESOURCE: selectTypeSource.selectedId || ''
        };
    }

    return ret;
})