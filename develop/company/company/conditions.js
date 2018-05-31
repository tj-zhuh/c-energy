/* 查询条件 */

define(function (require) {
	var $ = require('jquery');
	var dao = require('dao');
	var mselect = require('mselect');   // 普通下拉框组件
	var monthbox = require('monthbox');   // 月份选择框组件
	var areaSelect = mselect();     // 地区选择下拉框
	var businessSelect = mselect();  // 行业选择下拉框
	var companySelect = mselect();  // 企业选择下拉框
	var mbegin = monthbox();   // 开始月份框
	var mend = monthbox();  // 结束月份框

	var ret = {};

	ret.areaId = null;
	ret.businessId = null;
	ret.companyId = null;
	ret.dateBegin = null;
	ret.dateEnd = null;

	var mydate = new Date();
	var cYear = mydate.getFullYear();
	var cMonth = mydate.getMonth() + 1;

    //真实数据
	ret.init = function (bubble) {

	    // 地区单选下拉框
	    areaSelect.config({
	        selector: '#areaSelect'
	    });
	    areaSelect.init();
	    dao.getProvinceList(function (data) {
	        areaSelect.bindSource(data);
	        areaSelect.config({
	            autoSelectFirst: true
	        });
	    })


	    // 行业单选下拉框（含全选）
	    businessSelect.config({
	        selector: '#businessSelect',
	    });
	    businessSelect.init();
	    dao.getBusinessList(function (data) {
	        businessSelect.bindSource(data);
	        businessSelect.config({
	            autoSelectFirst: true
	        });
	    })

	    // 企业选择下拉框
	    companySelect.config({
	        selector: '#companySelect',
	    });
	    companySelect.init();

	    //选择地区
	    areaSelect.change(function () {
	        if (areaSelect.selectedId == null || areaSelect.selectedId == undefined) {
	            return;
	        }
	        else {
	            ret.areaId = areaSelect.selectedId;
	            if (!businessSelect.selectedId) {
	                return;
	            }
	            else {
	                var condition = {
	                    PROVINCEIDLIST: areaSelect.selectedId,
	                    BUSINESSIDLIST: businessSelect.selectedId
	                }
	                //加载企业
	                bindData(condition);
	            }
	        }
	    })

	    //选择行业
	    businessSelect.change(function () {
	        if (businessSelect.selectedId == null || businessSelect.selectedId == undefined) {
	            return;
	        }
	        else {
	            ret.businessId = businessSelect.selectedId;
	            if (!areaSelect.selectedId) {
	                return;
	            }
	            else {
	                var condition = {
	                    PROVINCEIDLIST: areaSelect.selectedId,
	                    BUSINESSIDLIST: businessSelect.selectedId
	                }
	                //加载企业
	                bindData(condition);
	            }
	        }
	    })

        //加载企业
	    function bindData(condition) {
	        dao.getEnterpriseList(condition, function (data) {
	            companySelect.bindSource(data);
	            companySelect.config({
	                autoSelectFirst: true
	            });
	        })
	    }

	    //选择企业
	    companySelect.change(function () {
	        if (companySelect.selectedId == null || companySelect.selectedId == undefined) {
	            return;
	        }
	        else {
	            ret.companyId = companySelect.selectedId;

	            var condition = {
	                ENTERPRISEID: companySelect.selectedId,
	            }

	            dao.postEnterpriseId(condition);
	        }
	    })	  

	    // 开始月份框
	    mbegin.config({
	        textSelector: '#beginSequence',    // 文本框的选择器
	        boxSelector: '#beginSequenceBox',   // 下拉时出现窗体的选择器
	        minYear: cYear - 3, // 最小的年
	        minMonth: '1', // 最小的月
	        maxYear: cYear + 3, // 最大的年
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