
/* 查询条件 */

define(function (require) {
    var $ = require('jquery');
    var dao=require('dao')
    var mselect = require('mselect');   // 普通下拉框组件
    var multibox = require('multibox');   // 多选下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var mradio = require('mradio');   // 单选框组件
    var mcheck = require('mcheck');

    var areaSelect = multibox();     // 地区选择下拉框
    var businessSelect = mselect();  // 行业选择下拉框
    var targetSelect = mselect();  // 指标选择下拉框
    var companyMultibox = multibox();  // 企业多选下拉框
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框
    //var methodMcheck = mradio();  // 测量方法单选框
    var coeffient = mradio();   //企业国家单选框
    var owncalc = mcheck();
    var standard_en = mselect();//企业标杆
    var standard = mselect(); //对标标准
    var methodMcheck = mcheck(); //测量方法复选框
    var ret = {};

    ret.areaIds = '';
    ret.businessId = null;
    ret.enIds = '';
    ret.functions = null;
    ret.defIds = '';   //自定义多选下拉框

    ret.ifOwn = '';
    ret.selected_func = '';
    ret.standard_type = null;
    ret.standard_en = null;
    ret.ifmethodMcheckMulti = false;

    //工具方法
    function getids(x, y) {
        var temp = '';
        var nums = x.getSelections();

        if (nums.length == 1) {
            y = '';
            y = nums[0].id;
            temp = nums[0].id;
        }
        else {
            y = '';
            for (var i = 0; i < nums.length; i++) {
                
                y += nums[i].id;
                temp += nums[i].id;
                if (i == nums.length - 1) {
                    return temp
                }
                else {
                    y += ',';
                    temp += ',';
                }
            }
        }

        return temp;
    }

    //判断方法(动态修改企业内容)
    function judgeEn(x) {
        var Encondition = { PROVINCEIDLIST: x || '', BUSINESSIDLIST: businessSelect.selectedId || '' }
        dao.getEnterpriseList(Encondition, function (data) {
            companyMultibox.bindSource(data)
        })
    }

    //指标绑定数据
    function judgeTarget() {
        var condition = { BUSINESSID: businessSelect.selectedId || '' };
        dao.getTargetSource(condition, function (data) {
            targetSelect.bindSource(data)
        })
    }

    // 初始化
    ret.init = function (bubble) {

        //地区
        areaSelect.config({
            textSelector: '#areaSelect',    // 文本框的选择器
            boxSelector: '#areaSelectBox',   // 下拉时出现窗体的选择器
            idField: 'areaId',
            nameField: 'areaName'
        })
        areaSelect.init();
        areaSelect.change(function () {            
            var temp = getids(areaSelect, ret.areaIds);
            ret.areaIds = temp;
            judgeEn(temp)
        })
        bubble.addEventHandler(function () { areaSelect.hide(); }) // 添加body点击事件处理函数
        areaSelect.beforeTextClick(function () { bubble.invoke(); })  // 点击文本框时，触发body点击事件
        
        dao.getProvinceList(function (data) {
            areaSelect.bindSource(data);
        })

        // 行业选择下拉框
        businessSelect.config({
            selector: '#businessSelect',
            idField: 'itemId',
            nameField: 'itemName'
        });
        businessSelect.init();
        dao.getBusinessList(function (data) {
            businessSelect.bindSource(data);
        })

        //行业变换事件
        businessSelect.change(function () {
            ret.businessId = businessSelect.selectedId;
            judgeEn(ret.areaIds);
            judgeTarget();

            var Econ = { BUSINESSIDLIST: businessSelect.selectedId, PROVINCEIDLIST: '' };

            dao.getEnterpriseList(Econ, function (data) {
                standard_en.bindSource(data)
            })

        })

        // 指标选择下拉框
        targetSelect.config({
            selector: '#targetSelect',
            idField: 'itemId',
            nameField: 'itemName'
        });
        targetSelect.init();
        targetSelect.change(function () {

            //右面的能不能用
            if (targetSelect.selectedName.indexOf("煤耗") !== -1) {
                methodMcheck.setDisabled(false);
            }
            else {
                methodMcheck.setDisabled(true);
            }
        })

        // 企业多选下拉框
        companyMultibox.config({
            textSelector: '#companySelect',    // 文本框的选择器
            boxSelector: '#companySelectBox',   // 下拉时出现窗体的选择器
            idField: 'companyId',
            nameField: 'companyName'
        })
        companyMultibox.init();

        companyMultibox.change(function () {

            ret.enIds = getids(companyMultibox, ret.enIds);

            //目标值事件
            var goalCondition = {
                ENTERPRISEIDLIST: ret.enIds,
                CHECKDATESTART: mbegin.year,
                CHECKDATEEND: mend.year,
            }
            dao.getGoalValue(goalCondition, function (data) {
                $('#target').html(data)
            })

        })

        //对标标准下拉框
        standard.config({
            selector: '#standard',
            idField: 'targetId',
            nameField: 'targetName'
        })
        standard.init();
        standard.bindSource([
            { targetId: '1', targetName: '国家' },
            { targetId: '2', targetName: '国际' },
            { targetId: '3', targetName: '省市' },
            { targetId: '4', targetName: '企业' }
        ])
        standard.change(function () {
            ret.standard_type = standard.selectedId;
        })

        //标杆企业下拉框
        standard_en.config({
            selector: '#standEnterprise',
            idField: 'companyId',
            nameField: 'companyName'
        })
        standard_en.init();

        standard_en.change(function () {
            ret.standard_en = standard.selectedId;
        })

        bubble.addEventHandler(function () { companyMultibox.hide(); }) // 添加body点击事件处理函数
        companyMultibox.beforeTextClick(function () { bubble.invoke(); })  // 点击文本框时，触发body点击事件

        // 开始月份框
        mbegin.config({
            textSelector: '#beginSequence',    // 文本框的选择器
            boxSelector: '#beginSequenceBox',   // 下拉时出现窗体的选择器
            minYear: '2013', // 最小的年
            minMonth: '5', // 最小的月
            maxYear: '2018', // 最大的年
            maxMonth: '11', // 最大的月
            defYear: '2017', // 默认的年
            defMonth: '1' // 默认的月
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
            defYear: '2017', // 默认的年
            defMonth: '12' // 默认的月
        })
        mend.init();
        mbegin.beforeTextClick(function () { bubble.invoke(); })
        mend.beforeTextClick(function () { bubble.invoke(); })

        mend.change(function () {

            //目标值事件
            var goalCondition = {
                ENTERPRISEIDLIST: ret.enIds,
                CHECKDATESTART: mbegin.year,
                CHECKDATEEND: mend.year,
            }
            dao.getGoalValue(goalCondition, function (data) {
                $('#target').html(data)
            })



        })

        // 测量方法复选框
        methodMcheck.config({
            selector: '#methodMcheck'
        })
        methodMcheck.init();

        methodMcheck.change(function (id, name) {

            if (methodMcheck.getSelections().length > 1) {
                ret.ifmethodMcheckMulti = true;
            }
            else if (methodMcheck.getSelections().length == 1) {
                ret.ifmethodMcheckMulti = false;
            }

            var temp = getids(methodMcheck, ret.functions);
            ret.selected_func = temp;
        })

        coeffient.config({
            selector: '#radio2'
        })
        coeffient.init();

        //事件
        coeffient.change(function () {
            if ($('#li1').hasClass('active')) {
                standard_en.setDisabled(true)
                standard.setDisabled(false)
            }
            else if ($('#li2').hasClass('active')) {
                standard.setDisabled(true)
                standard_en.setDisabled(false)
            }
        })

        owncalc.config({
            selector: '#mcheck1'
        })
        owncalc.init();

        owncalc.change(function () {
            if (!ret.ifOwn) {
                ret.ifOwn = 1;
            }
            else {
                ret.ifOwn = '';
            }
        })
        //初始时企业标杆disable
        standard_en.setDisabled(true)

    }




    // 加载初始化数据
    ret.loadData = function () {
        return{
            ENTERPRISEIDLIST: ret.enIds,
            CHECKDATESTART: mbegin.year + returnmonth(mbegin.month),
            CHECKDATEEND: mend.year + returnmonth(mend.month),
            EINDEXID: targetSelect.selectedId,
            HEATMETHOD: ret.selected_func,
            RESULTFLAG: ret.ifOwn,
            STANDARDTYPE: ret.standard_type,
            STANDARDENTERPRISEID: ret.standard_en
        }
    }
    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else { return x }
    }


    return ret;
})