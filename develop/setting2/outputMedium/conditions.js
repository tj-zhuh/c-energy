
/* 查询条件 */


/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var monthbox = require('monthbox');

    var selectArea = mselect();  // 地区选择下拉框
    var selectBusiness = mselect();  // 行业选择下拉框
    var selectEnterprise = mselect();  // 企业选择下拉框
    var mbegin = monthbox();
    var mend = monthbox();

    var ret = {};
    ret.areaId = null;
    ret.businessId = null;
    ret.enterpriseId = null;

    function getEnterPrises() {
        var Econdition = { PROVINCEID: ret.areaId || '', BUSINESSID: ret.businessId || '', }
        dao.getEnterpriseData(Econdition, function (data) {
            selectEnterprise.bindSource(data);
        })
    }
    // 初始化
    ret.init = function (bubble) {

        //地区
        selectArea.config({
            selector: '#areaSelect',
            selectAll: true
        });
        selectArea.init();

        dao.getAreaData(function (data) {
            selectArea.bindSource(data);
        })

        selectArea.change(function () {
            ret.areaId = selectArea.selectedId;
            getEnterPrises();

        })

        //行业
        selectBusiness.config({
            selector: '#businessSelect',
            selectAll: true
        });
        selectBusiness.init();

        dao.getBusinessData(function (data) {
            selectBusiness.bindSource(data);
        })

        selectBusiness.change(function () {
            ret.businessId = selectBusiness.selectedId;
            getEnterPrises();
        })

        //企业
        selectEnterprise.config({
            selector: '#enterpriseSelect',
            selectAll: true
        });
        selectEnterprise.init();
        getEnterPrises();
        selectEnterprise.change(function () {
            ret.enterpriseId = selectEnterprise.selectedId;
        })


        // 开始月份框
        mbegin.config({
            textSelector: '#beginSequence',    // 文本框的选择器
            boxSelector: '#beginSequenceBox',   // 下拉时出现窗体的选择器
            minYear: '2013', // 最小的年
            minMonth: '5', // 最小的月
            maxYear: '2018', // 最大的年
            maxMonth: '11', // 最大的月
            defYear: '2016', // 默认的年
            defMonth: '12' // 默认的月
        })
        mbegin.init();
        bubble.addEventHandler(function () { mbegin.hide(); }) // 添加body点击事件处理函数
        bubble.addEventHandler(function () { mend.hide(); }) // 点击文本框时，触发body点击事件

        // 结束月份框
        mend.config({
            textSelector: '#endSequence',    // 文本框的选择器
            boxSelector: '#endSequenceBox',   // 下拉时出现窗体的选择器
            minYear: '2013', // 最小的年
            minMonth: '5', // 最小的月
            maxYear: '2018', // 最大的年
            maxMonth: '11', // 最大的月
            defYear: '2016', // 默认的年
            defMonth: '12' // 默认的月
        })
        mend.init();
        mbegin.beforeTextClick(function () { bubble.invoke(); })
        mend.beforeTextClick(function () { bubble.invoke(); })

    }


    ret.serialize = function () {
        return {
            PROVINCEID: ret.areaId || '',
            BUSINESSID: ret.businessId || '',
            ENTERPRISEID: ret.enterpriseId || '',
            //CHECKDATEBEGIN: mbegin.year + returnmonth(mbegin.month),
            //CHECKDATEEND: mend.year + returnmonth(mend.month)
        };
    }


    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else { return x }
    }

    return ret;
})