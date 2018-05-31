
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');   // 普通下拉框组件
    var multibox = require('multibox');   // 多选下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var mcheck = require('mcheck');   // 复选框组件  
    var dao = require('dao');
    var util = require('util');

    var areaSelect = mselect();     // 地区选择下拉框
    var businessSelect = mselect();  // 行业选择下拉框    
    var companySelect = mselect();  // 企业多选下拉框
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框    
    var mcheck1 = mcheck(); // 碳核算方法复选框
    var methodSelect = mselect();  //自定义方法下拉框

    var ret = {};

    ret.areaId = null;
    ret.businessId = null;
    ret.companyId = null;
    ret.functionids = '';
    ret.confirmMethod = '';
    ret.radioFactor = '';

    ret.mbegint = '2016-06';
    ret.mendt = '2016-07';

    // 初始化
    ret.init = function (bubble) {

        // 地区选择下拉框
        areaSelect.config({
            selector: '#areaSelect'
        });
        areaSelect.init();
        dao.getProvinceList(function (data) {
            areaSelect.bindSource(data);
        })

        // 行业选择下拉框
        businessSelect.config({
            selector: '#businessSelect'
        });
        businessSelect.init();
        dao.getBusinessList(function (data) {
            businessSelect.bindSource(data);
        })



        // 企业多选下拉框
        companySelect.config({
            selector: '#companySelect'
        });
        companySelect.init();

        //方法下拉框
        methodSelect.config({
            selector: '#asdSelect'
        });
        methodSelect.init();

        companySelect.change(function () {

            ret.companyId = companySelect.selectedId;

            //目标值事件
            var goalCondition = {
                PROVINCEID: areaSelect.selectedId,
                BUSINESSID: businessSelect.selectedId,
                ENTERPRISEID: companySelect.selectedId,
                CHECKYEAR: mend.year,
                CTYPE: '3'
            }
            dao.getTargetInfo(goalCondition, function (data) {
                $('#target').html(data)
            })
        })
  
        //判断式加载数据
        areaSelect.change(function () {

            ret.areaId = areaSelect.selectedId;
            if (!businessSelect.selectedId) {
                return 
            }
            else {
                var condition = {
                    PROVINCEID: areaSelect.selectedId,
                    BUSINESSID: businessSelect.selectedId
                }
                dao.getEnterpriseList(condition, function (data) {
                    companySelect.bindSource(data)
                })
            }
        })

        businessSelect.change(function () {
            ret.businessId = businessSelect.selectedId;

            if (!areaSelect.selectedId) {
                return
            }
            else {
                var condition = {
                    PROVINCEID: areaSelect.selectedId,
                    BUSINESSID: businessSelect.selectedId
                }
                dao.getEnterpriseList(condition, function (data) {
                    companySelect.bindSource(data)
                })
            }
        })

        methodSelect.change(function () {
            ret.radioFactor = methodSelect.selectedId;
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
            defMonth: '6' // 默认的月
        })
        mbegin.init();

        mbegin.change(function () {
            ret.mbegint = mbegin.year +'-'+ returnmonth(mbegin.month)
        })
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
            defMonth: '7' // 默认的月
        })
        mend.init();
        mend.change(function () {
            ret.mendt = mend.year + '-' + returnmonth(mend.month);

            //目标值事件
            var goalCondition = {
                PROVINCEID: areaSelect.selectedId,
                BUSINESSID: businessSelect.selectedId,
                ENTERPRISEID: companySelect.selectedId,
                CHECKYEAR: mend.year,
                CTYPE: '3'
            }
            dao.getTargetInfo(goalCondition, function (data) {
                $('#target').html(data)
            })
        })
        mbegin.beforeTextClick(function () { bubble.invoke(); })
        mend.beforeTextClick(function () { bubble.invoke(); })




        // 方法单选框
        $('#asdSelect').attr('disabled', 'disabled').attr('style', 'background-color:#ccc');
        $('.radio2').attr('disabled', 'disabled');
        ret.radioMethod = '1';
        $('.radio1').click(function () {
            ret.radioMethod = $('.radio1:checked').val();
            switch (ret.radioMethod) {
                case '1':
                case '3':
                case '5': $('#asdSelect').attr('disabled', 'disabled').attr('style', 'background-color:#ccc');
                    $('.radio2').attr('disabled', 'disabled');
                    ret.radioFactor = '';
                    return;
                case '2': $('#asdSelect').attr('disabled', 'disabled').attr('style', 'background-color:#ccc');
                    $('.radio2').attr('disabled', false);
                    ret.radioFactor = '';
                    return;
                case '4': $('#asdSelect').attr('disabled', 'disabled').attr('style', 'background-color:#ccc');
                    $('.radio2').attr('disabled', false);
                    ret.radioFactor = '';
                    return;
                case '6': $('#asdSelect').attr('disabled', false).attr('style', 'background-color:#fff');
                    $('.radio2').attr('disabled', 'disabled');
                    //methodSelect.selectFirst();
                    ret.radioFactor = methodSelect.selectedId;
                    return;
            }
        })


        //默认因子法：国标/指南 value="1d2bac89731940018d5d42aa,1d2bac95ab2680018d5d42aa" 默认国标
        //实测因子法：国标/指南 value="1d2aafe1c47100018d5d42aa,1d2aafe210bc40018d5d42aa" 默认国标
        //质量守恒法：1d2aafe0b969a0018d5d42aa
        //烟气直排法：1d2aafe17825c0018d5d42aa
        //  核查公司：1d2aafe118c7b0018d5d42aa
        // 类型单选框
        ret.radioType = '1';
        $('.radio2').click(function () {
            ret.radioType = $('.radio2:checked').val();
        })

    }


    // 加载初始化数据
    ret.loadInitData = function (data) {
        //areaSelect.bindSource(data.areaSource);
        //businessSelect.bindSource(data.businessSource);
        //companyMultibox.bindSource(data.companySource);
    }
    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else { return x }
    }

    var formularCondition = {
        BUSINESSID: ret.businessId,
        FORMULATYPE: '1',
        ISMIDDLE: '2'
    }
    dao.getMethodOptions(formularCondition, function (data) {
        methodSelect.bindSource(data);
        methodSelect.val('');
    })

    ret.confirmMethod = function(){
        switch (ret.radioMethod) {
            case '1': return '1d2aafe0b969a0018d5d42aa';
            case '3': return '1d2aafe17825c0018d5d42aa';
            case '5': return '1d2aafe118c7b0018d5d42aa';
            case '2': {
                if (ret.radioType == '1') return '1d2bac89731940018d5d42aa';
                else if (ret.radioType == '2') return '1d2bac95ab2680018d5d42aa';
            }
            case '4': {
                if (ret.radioType == '1') return '1d2aafe1c47100018d5d42aa';
                else if (ret.radioType == '2') return '1d2aafe210bc40018d5d42aa';
            }
            case '6': 
                return '';
        }
    }

    return ret;
})