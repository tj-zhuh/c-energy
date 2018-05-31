
/* 查询条件 */

define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');
    var mselect = require('mselect');   // 普通下拉框组件
    var multibox = require('multibox');   // 多选下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var areaSelect = mselect();     // 地区选择下拉框
    var businessSelect = mselect();  // 行业选择下拉框
    var companyMultibox = multibox();  // 企业多选下拉框
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框

    var ret = {};

    ret.areaId = null;
    ret.businessId = null;
    ret.companySelections = null;
    ret.dateBegin = null;
    ret.dateEnd = null;

    var mydate = new Date();
    var cYear = mydate.getFullYear();
    var cMonth = mydate.getMonth() + 1;

    //真实数据
    ret.init = function (bubble) {

        // 地区单选下拉框
        areaSelect.config({
            selector: '#areaSelect',
            //autoSelectFirst:true

        });
        areaSelect.init();
        dao.getProvinceList(function (data) {
            areaSelect.bindSource(data);
        })


        // 行业单选下拉框（含全选）
        businessSelect.config({
            selector: '#businessSelect',
            //autoSelectFirst: true
        });
        businessSelect.init();
        dao.getBusinessList(function (data) {
            businessSelect.bindSource(data);
        })

        // 企业多选下拉框
        companyMultibox.config({
            textSelector: '#companySelect',
            boxSelector: '#companySelectBox',   // 下拉时出现窗体的选择器
            idField: 'companyId',
            nameField: 'companyName'
        });
        companyMultibox.init();
        companyMultibox.change(function () {
            getCGoal();

        })

        bubble.addEventHandler(function () { companyMultibox.hide(); }) // 添加body点击事件处理函数
        companyMultibox.beforeTextClick(function () { bubble.invoke(); })  // 点击文本框时，触发body点击事件


        //选择地区
        areaSelect.change(function () {

            ret.areaId = areaSelect.selectedId;
            if (!businessSelect.selectedId) {
                return
            }
            else {
                var condition = {
                    PROVINCEIDLIST: areaSelect.selectedId,
                    BUSINESSIDLIST: businessSelect.selectedId
                }
                //加载企业
                bindData(condition);
            }
        })

        function bindData(condition) {
            dao.getEnterpriseList(condition, function (data) {
                companyMultibox.bindSource(data)
            })
        }

        //选择行业
        businessSelect.change(function () {
            ret.businessId = businessSelect.selectedId;

            if (!areaSelect.selectedId) {
                return
            }
            else {
                var condition = {
                    PROVINCEIDLIST: areaSelect.selectedId,
                    BUSINESSIDLIST: businessSelect.selectedId
                }
                //加载企业
                bindData(condition);
            }
        })

        function getCGoal() {
            var list = null;
            var ids = companyMultibox.getSelections();
            for (i = 0; i < ids.length; i++) {
                if (i == 0)
                { list = ids[i].id }
                else
                { list = list + "," + ids[i].id }
            }

            ret.companySelections = list;

            //加载C目标值
            var goalCondition = {
                ENTERPRISEIDLIST: list,
                CHECKDATESTART: mbegin.year+ mbegin.month,
                CHECKDATEEND: mend.year + mend.month
            }
            dao.getGoalValue(goalCondition, function (data) {
                $('#target').html(data);
            })
        }

        // 开始月份框
        mbegin.config({
            textSelector: '#beginSequence',    // 文本框的选择器
            boxSelector: '#beginSequenceBox',   // 下拉时出现窗体的选择器
            minYear: cYear -3, // 最小的年
            minMonth: '1', // 最小的月
            maxYear: cYear+3, // 最大的年
            maxMonth: '12', // 最大的月
            defYear: cYear, // 默认的年
            defMonth: cMonth, // 默认的月
        })
        mbegin.init();
        bubble.addEventHandler(function () { mbegin.hide(); }) // 添加body点击事件处理函数
        bubble.addEventHandler(function () { mend.hide(); }) // 点击文本框时，触发body点击事件
        ret.dateBegin = mbegin.year + mbegin.month;
        mbegin.change(function () {
            if (mend.year < mbegin.year)
            { }
            else
            {
                if (mend.year == mbegin.year && mend.month < mbegin.month)
                { }
                else {
                    ret.dateBegin = mbegin.year + mbegin.month;
                    getCGoal();
                }
            }
        })

        // 结束月份框
        mend.config({
            textSelector: '#endSequence',    // 文本框的选择器
            boxSelector: '#endSequenceBox',   // 下拉时出现窗体的选择器
            minYear: cYear - 3, // 最小的年
            minMonth: '1', // 最小的月
            maxYear: cYear + 3, // 最大的年
            maxMonth: '12', // 最大的月
            defYear: cYear, // 默认的年
            defMonth: cMonth, // 默认的月
        })
        mend.init();
        mbegin.beforeTextClick(function () { bubble.invoke(); })
        mend.beforeTextClick(function () { bubble.invoke(); })
        ret.dateEnd = mend.year + mend.month;
        mend.change(function () {
            if (mend.year < mbegin.year)
                { }
            else
            {
                if (mend.year == mbegin.year && mend.month < mbegin.month)
                { }
                else {
                    ret.dateEnd = mend.year + mend.month;
                    getCGoal();
                }
            }
        })
    }
    return ret;
})