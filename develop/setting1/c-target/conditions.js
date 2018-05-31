
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');

    var selectBusiness = mselect();  // 行业选择下拉框
    var selectArea = mselect();     //地区选择下拉框
    var selectEnterprise = mselect(); //企业选择下拉框
    var selectYear = mselect();     //年份选择下拉框

    var ret = {};

    ////在调整行业和地区时自动筛选企业所用的参数
    //ret.business = null;


    //判断方法(动态修改企业内容)
    function judgeEn() {

        var Encondition = {
            PROVINCEID: selectArea.selectedId || '',
            BUSINESSID: selectBusiness.selectedId || ''
        }

        dao.getEnterpriseList(Encondition, function (data) {
            selectEnterprise.bindSource(data)
        })
    }

    //事件
    selectArea.change(function () {
        judgeEn();
    })

    selectBusiness.change(function () {
        judgeEn();
        //ret.business = selectBusiness.selectedId;
    })



    // 初始化
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-business',
            selectAll: true
        });
        selectBusiness.init();
        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })

        selectArea.config({
            selector: '#search-area',
            selectAll: true
        });
        selectArea.init();
        dao.getAreaOptions(function (data) {
            selectArea.bindSource(data);
        })

        selectEnterprise.config({
            selector: '#search-enterprise',
            selectAll: true
        });
        selectEnterprise.init();
        dao.getEnterpriseOptions(function (data) {
            selectEnterprise.bindSource(data);
        })

        selectYear.config({
            selector: '#search-year',
            selectAll: true
        });
        selectYear.init();
        dao.getYearOptions(function (data) {
            selectYear.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            PROVINCEID: selectArea.selectedId || '',
            ENTERPRISEID: selectEnterprise.selectedId || '',
            CHECKYEAR: selectYear.selectedId || '',
        };
    }

    return ret;
})