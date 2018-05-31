
/* 查询条件 */

define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');
    var mselect = require('mselect');   // 普通下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var energyTypeSelect = mselect();     // 类别选择下拉框
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框


    var ret = {};

    ret.dateBegin = null;
    ret.dateEnd = null;
    ret.energyType = null;

    var mydate = new Date();
    var cYear = mydate.getFullYear();
    var cMonth = mydate.getMonth() + 1;

    // 初始化
    ret.init = function (bubble) {

        // 地区单选下拉框
        energyTypeSelect.config({
            selector: '#energyTypeSelect'
        });
        energyTypeSelect.init();
        dao.getEnergyTypeList(function (data) {
            energyTypeSelect.bindSource(data);
            energyTypeSelect.config({
                autoSelectFirst: true
            });
        })
        energyTypeSelect.change(function () {
            ret.energyType = energyTypeSelect.selectedId;
        })

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
                }
            }
        })        
    }

    return ret;
})