
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');   // 普通下拉框组件
    var multibox = require('multibox');   // 多选下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var mcheck = require('mcheck');   // 复选框组件  
    var dao = require('dao')
    var util = require('util');

    var areaSelect = multibox();     // 地区选择下拉框
    var businessSelect = mselect();  // 行业选择下拉框    
    var companyMultibox = multibox();  // 企业多选下拉框
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框    
    var mcheck1 = mcheck(); // 碳核算方法复选框
    var mcheck2 = mcheck(); // 核查方式复选框
    var defSelect = multibox();     // 自定义选择下拉框


    var ret = {};

    //状态判断(判断企业与方法是否都是多选)
    ret.ifmcheck1Multi = false;
    ret.ifmcheck2Multi = false;
    ret.ifcompanyMultiboxMulti = false;
    ret.ifDefMultiboxMulti = false;
    ret.areaIds = '';
    ret.EnIds = '';
    ret.business = null;
    ret.functions = '';
    ret.defFunctions = '';
    ret.check = '';
    ret.defIds = '';


    //判断方法(动态修改企业内容)
    function judgeEn() {

        ret.areaIds = '';
        var temp = areaSelect.getSelections();
        for (var i = 0; i < temp.length; i++) {
            ret.areaIds += temp[i].id;
            if (i == temp.length - 1 && i == 0) {
                continue
            }
            else if (i == temp.length-1) {
                continue 
            }
            else{ret.areaIds+=','}
        }
        var Encondition = { PROVINCEIDLIST: ret.areaIds||'', BUSINESSIDLIST: businessSelect.selectedId||'' }
        dao.getEnterpriseList(Encondition, function (data) {
            companyMultibox.bindSource(data)
        })
    }

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

    //目标值
    function getGoal() {
        var condition = {
            ENTERPRISEIDLIST: ret.EnIds,
            CHECKDATESTART: mbegin.year + returnmonth(mbegin.month),
            CHECKDATEEND: mend.year + returnmonth(mend.month),
        }
        dao.getGoalValue(condition, function (data) {
            $('#target').html(data)
        })
    }

    //判断自定义多选框是否被选中，然后设置自定义下拉框是否可选
    function setDefEnabled(flag){
        if (flag) {
            $('#defSelect').attr('style', 'background-color:#ffffff');
            $('#defSelectBox').attr('style', 'background-color:#ffffff');
        } else {
            $('#defSelect').attr('style', 'background-color:#cdcdcd');
            $('#defSelectBox').attr('style', 'background-color:#cdcdcd');
        }
        defSelect.setDisabled(!flag);
    }

    //事件
    areaSelect.change(function () {
        judgeEn();

    })

    businessSelect.change(function () {
        judgeEn();
        ret.business = businessSelect.selectedId;
    })

    mcheck1.change(function (id, name) {
        var selections = mcheck1.getSelections();
        //console.log(id)
        if (selections.length > 1) {
            ret.ifmcheck1Multi = true;
        }
        else if (selections.length == 1) {
            ret.ifmcheck1Multi = false;
        }

        var flagDef = false;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i].id == '###') {
                flagDef = true;
            }
        }
        setDefEnabled(flagDef);
        //defSelect.setDisabled(!flagDef);

        var temp = getids(mcheck1, ret.functions);
        ret.functions = temp;
        //console.log(ret.functions)
    })

    mcheck2.change(function (id, name) {
        //console.log(id)
        if (mcheck2.getSelections().length > 1) {
            ret.ifmcheck2Multi = true;
        }
        else if (mcheck2.getSelections().length == 1) {
            ret.ifmcheck2Multi = false;
        }

        var temp = getids(mcheck2, ret.check);
        ret.check = temp;
        //console.log(ret.functions)
    })
    
    companyMultibox.change(function () {
        ret.EnIds = '';
        //是否都多选部分
        if (companyMultibox.getSelections().length > 1) {
            ret.ifcompanyMultiboxMulti = true;
        }
        else if (companyMultibox.getSelections().length = 1) {
            ret.ifcompanyMultiboxMulti = false;
        }
        var temp = companyMultibox.getSelections();
        for (var i = 0; i < temp.length; i++) {
            ret.EnIds += temp[i].id;
            if (i == temp.length - 1 && i == 0) {
                continue
            }
            else if (i == temp.length - 1) {
                continue
            }
            else { ret.EnIds += ',' }
        }

        //目标值事件
        if (ret.EnIds) {
            getGoal()
        }
        else if (!ret.EnIds) {
            $('#target').html('')
        }

        //console.log(ret.EnIds)
    })

    defSelect.change(function () {

        //是否都多选部分
        if (defSelect.getSelections().length > 1) {
            ret.ifDefMultiboxMulti = true;
        }
        else if (defSelect.getSelections().length = 1) {
            ret.ifDefMultiboxMulti = false;
        }
        var temp = defSelect.getSelections();
        ret.defIds = '';
        for (var i = 0; i < temp.length; i++) {
            ret.defIds += temp[i].id;
            if (i == temp.length - 1 && i == 0) {
                continue
            }
            else if (i == temp.length - 1) {
                continue
            }
            else { ret.defIds += ',' }
        }
        //目标值事件
        if (ret.defIds) {
            getGoal()
        }
        else if (!ret.defIds) {
            $('#target').html('')
        }

        //console.log(ret.defIds)
    })

    mbegin.change(function () {
        //getGoal()
    })

    mend.change(function () {
        if (ret.EnIds) {
            getGoal()
        }
        else if (!ret.EnIds) {
            $('#target').html('')
        }
    })

    // 初始化
    ret.init = function (bubble) {

        // 地区选择下拉框
        areaSelect.config({
            textSelector: '#areaSelect',    // 文本框的选择器
            boxSelector: '#areaSelectBox',   // 下拉时出现窗体的选择器
            idField: 'itemId',
            nameField: 'itemName'
        })
        areaSelect.init();
        bubble.addEventHandler(function () { areaSelect.hide(); }) // 添加body点击事件处理函数
        areaSelect.beforeTextClick(function () { bubble.invoke(); })  // 点击文本框时，触发body点击事件
        dao.getProvinceList(function (data) {
            areaSelect.bindSource(data)
        })

        // 行业选择下拉框
        businessSelect.config({
            selector: '#businessSelect',
            idField: 'itemId',
            nameField: 'itemName'
        });
        businessSelect.init();
        dao.getBusinessList(function (data) {
            businessSelect.bindSource(data)
        })


        // 企业多选下拉框
        companyMultibox.config({
            textSelector: '#companySelect',    // 文本框的选择器
            boxSelector: '#companySelectBox',   // 下拉时出现窗体的选择器
            idField: 'companyId',
            nameField: 'companyName'
        })
        companyMultibox.init();
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

        // 
        mcheck1.config({
            selector: '#mcheck1'
        });
        mcheck1.init();

        // 
        mcheck2.config({
            selector: '#mcheck2'
        });
        mcheck2.init();

        // 自定义选择下拉框
        defSelect.config({
            textSelector: '#defSelect',    // 文本框的选择器
            boxSelector: '#defSelectBox',   // 下拉时出现窗体的选择器
            idField: 'itemId',
            nameField: 'itemName'
        })
        defSelect.init();
        bubble.addEventHandler(function () { defSelect.hide(); }) // 添加body点击事件处理函数
        defSelect.beforeTextClick(function () { bubble.invoke(); })  // 点击文本框时，触发body点击事件

        var formularCondition = {
            BUSINESSID: ret.business,
            FORMULATYPE: '1',
            ISMIDDLE: '2'
        }
        dao.getMethodOptions(formularCondition, function (data) {
            defSelect.bindSource(data);
        })
        
        setDefEnabled(false);

        //默认因子法：国标/指南 value="1d2bac89731940018d5d42aa,1d2bac95ab2680018d5d42aa" 默认国标
        //实测因子法：国标/指南 value="1d2aafe1c47100018d5d42aa,1d2aafe210bc40018d5d42aa" 默认国标
        //质量守恒法：1d2aafe0b969a0018d5d42aa
        //烟气直排法：1d2aafe17825c0018d5d42aa
        //  核查公司：1d2aafe118c7b0018d5d42aa
        // 类型单选框
        ret.radioType = '1';
        $('.radio2').click(function () {
            ret.radioType = $('.radio2:checked').val();
            util.alert(ret.radioType);
        })
    }

    // 加载初始化数据
    ret.loadData = function () {
        return {
            ENTERPRISEIDLIST: ret.EnIds,
            CHECKDATESTART: mbegin.year + returnmonth(mbegin.month),
            CHECKDATEEND: mend.year + returnmonth(mend.month),
            METHODIDLIST: ret.functions.replace(",###", "").replace("###,", "").replace("###",""),
            FORMULALIST: ret.defIds,
        }
    }

    ret.loadData1 = function () {
        return {
            ENTERPRISEIDLIST: ret.EnIds,
            CHECKDATESTART: mbegin.year + returnmonth(mbegin.month),
            CHECKDATEEND: mend.year + returnmonth(mend.month),
            METHODIDLIST: ret.functions.replace(",###", "").replace("###,", "").replace("###",""),
            FORMULALIST: ret.defIds,
            CTYPE: ret.radioType=='2' ? null:ret.check
        }
    }

    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else{return x}
    }



    return ret;
})