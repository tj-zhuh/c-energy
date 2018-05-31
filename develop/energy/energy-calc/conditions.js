
/* 查询条件 */

define(function (require) {
    var $ = require('jquery');
    var mselect = require('mselect');   // 普通下拉框组件
    var monthbox = require('monthbox');   // 月份选择框组件
    var mradio = require('mradio');   // 单选框组件
    var dao = require('dao');

    var areaSelect = mselect();     // 地区下拉框
    var businessSelect = mselect();  // 行业下拉框
    var companySelect = mselect();  // 企业下拉框
    var targetSelect = mselect();  // 指标选择下拉框    
    var mbegin = monthbox();   // 开始月份框
    var mend = monthbox();  // 结束月份框
    var methodRadio = mradio();  // 测量方法单选框

    //年份判断函数
    function Timejudge(y, m) {
        var temp;

        if (typeof y == 'string'&&typeof m=='string') {
            if (m.length == 1) {
                m = '0' + m;
            }

            temp = y + '-' + m;
            return temp
        }
        
        else {
            y = y.toString();
            m = m.toString();

            if (m.length == 1) {
                m = '0' + m;
            }

            temp = y + '-' + m;
            //alert('这两个变量不是字符串')
            return temp
        }
        
    }

    function resetGoal() {
        var condition = {
            PROVINCEID: ret.areaId || '',
            BUSINESSID: ret.businessId || '',
            ENTERPRISEID: ret.enId || '',
            ENERGYYEAR: mend.year,
        }
        dao.getGoal(condition, function (data) {
            $('#goal').html(data)
        })
    }

    var ret = {};
    ret.areaId = null;
    ret.businessId = null;
    ret.enId = null;




   

    // 初始化器
    var initializer = (function () {
        var _initializer = {};

        //地区
        _initializer.initAreaSelect = function () {
            // 地区选择下拉框
            areaSelect.config({
                selector: '#areaSelect'
            });
            areaSelect.init();
            dao.getProvinceList(function (data) {
                areaSelect.bindSource(data);
            })
        }

        //行业
        _initializer.initBusinessSelect = function () {
            // 行业选择下拉框
            businessSelect.config({
                selector: '#businessSelect'     
            });
            businessSelect.init();
            dao.getBusinessList(function (data) {
                businessSelect.bindSource(data);
            })
        }

        _initializer.initTargetSelect = function () {
            // 指标选择下拉框
            targetSelect.config({
                selector: '#targetSelect'
            });
            targetSelect.init();
        }

        //企业（暂时用单选）
        _initializer.initCompanySelect = function () {
            // 企业多选下拉框
            companySelect.config({
                selector: '#companySelect',    // 文本框的选择器          
            })
            companySelect.init();
            dao.getEnterpriseList(function (data) {
                companySelect.bindSource(data);
            })
        }

        _initializer.initMBegin = function (bubble) {
            // 开始月份框
            mbegin.config({
                textSelector: '#beginSequence',    // 文本框的选择器
                boxSelector: '#beginSequenceBox',   // 下拉时出现窗体的选择器
                minYear: '2013', // 最小的年
                minMonth: '5', // 最小的月
                maxYear: '2018', // 最大的年
                maxMonth: '6', // 最大的月
                defYear: '2016', // 默认的年
                defMonth: '6' // 默认的月
            })
            mbegin.init();
            bubble.addEventHandler(function () { mbegin.hide(); }) // 添加body点击事件处理函数
            bubble.addEventHandler(function () { mend.hide(); }) // 点击文本框时，触发body点击事件
        }

        _initializer.initMEnd = function (bubble) {
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
            mbegin.beforeTextClick(function () { bubble.invoke(); })
            mend.beforeTextClick(function () { bubble.invoke(); })

            mend.change(function () {
                resetGoal();

            })
        }

        _initializer.initMethodRadio = function () {
            // 测量方法单选框
            methodRadio.config({
                selector: '#radio1'
            })
            methodRadio.init();


        }

        return _initializer;
    })()

    // 事件管理器
    var eventManager = (function () {

        _eventManager = {};

        // 函数：重新绑定企业框的数据源
        function rebindCompanySource() {
            var condition = {
                PROVINCEID: areaSelect.selectedId,
                BUSINESSID: businessSelect.selectedId
            };
            dao.getCompanySource(condition, function (source) {
                companySelect.bindSource(source);
            })
        }

        // 地区选择事件绑定
        _eventManager.bindAreaSelectEvent = function () {            
            areaSelect.change(function () {

                ret.areaId = areaSelect.selectedId;
                resetGoal();

                rebindCompanySource();
            })
        }

        // 行业选择事件绑定
        _eventManager.bindBusinessSelectEvent = function () {            
            businessSelect.change(function () {

                ret.businessId = businessSelect.selectedId;
                resetGoal();

                rebindCompanySource();

                var condition = { BUSINESSID: businessSelect.selectedId };

                dao.getTargetSource(condition, function (source) {
                    targetSelect.bindSource(source);
                })
            })
        }

        // 企业下拉框选择事件绑定
        _eventManager.bindCompanySelectEvent = function () {
            companySelect.change(function () {
                ret.enId = companySelect.selectedId;          
                resetGoal();
            })

            companySelect.load(function () {
                //resetGoal();
            })


        }

        

        // 能耗计算对象下拉框的选择事件
        _eventManager.bindTargetSelectEvent = function () {
            targetSelect.change(function () {
                var condition = { targetId: targetSelect.selectedId };
                dao.getUncertainty(condition, function (result) {
                    $('#uncertainty').val(result);
                })
                var con2 = { BUSINESSID: businessSelect.selectedId, EINDEXID: targetSelect.selectedId, }
                dao.getFormula(con2, function (result) {
                    $('#formula-value').html(result);
                })

                //右面的能不能用

                if (targetSelect.selectedName.indexOf('煤耗') != -1) {
                    methodRadio.setDisabled(false)
                }
                else {
                    methodRadio.setDisabled(true)
                }

            })
        }

        return _eventManager;

    })()

    // 初始化
    ret.init = function (bubble) {

        initializer.initAreaSelect();
        initializer.initBusinessSelect();
        initializer.initTargetSelect();
        initializer.initCompanySelect();
        initializer.initMBegin(bubble);
        initializer.initMEnd(bubble);
        initializer.initMethodRadio();

        eventManager.bindAreaSelectEvent();
        eventManager.bindBusinessSelectEvent();
        eventManager.bindCompanySelectEvent();
        eventManager.bindTargetSelectEvent();
    }

    ret.serialize = function () {

        var date1 = (mbegin.year + '-' + returnmonth(mbegin.month));
        var date2 = (mend.year + '-' + returnmonth(mend.month));

        var obj = {

            PROVINCEID:$('#areaSelect').val(),
            BUSINESSID:$('#businessSelect').val(),
            ENTERPRISEID:$('#companySelect').val(),
            STARTCYCLE:date1,
            STOPCYCLE:date2,
            EINDEXID: targetSelect.selectedId,
            HEATMETHOD: methodRadio.selectedId,

        }
        return obj;
    }

    ret.validate = function (obj) {
        if (obj.endYear < obj.beginYear || (obj.endYear == obj.beginYear && parseInt(obj.endMonth )< parseInt(obj.beginMonth)))
            return '结束期数不可以小于开始期数';
    }

    // 加载初始化数据
    ret.loadInitData = function (data) {
        areaSelect.bindSource(data.areaSource);
        businessSelect.bindSource(data.businessSource);
        targetSelect.bindSource(data.targetSource);
        companySelect.bindSource(data.companySource);
        $('#uncertainty').val(data.uncertainty);
    }

    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else { return x }
    }

    return ret;
})