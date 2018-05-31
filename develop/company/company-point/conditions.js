define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');
	var mselect = require('mselect');   // 普通下拉框组件
	var multibox = require('multibox');   // 多选下拉框组件
	var monthbox = require('monthbox');   // 月份选择框组件
	var mradio = require('mradio');   // 单选框组件

	var energySelect = mselect();   //采集点类型下拉框
	var mbegin = monthbox();    //月份框1
	var mend = monthbox();      //月份框2

	var ret = {
	    beginmonth: '201701',
	    endmonth: '201712',
	    currtype: '1,2,3'
	};

	ret.init = function (bubble) {

		//采集点类型选择下拉框
		energySelect.config({
			selector: '#energyClass',
			idField: 'energyId',
			nameField: 'energyName',
			selectAll: true
		});
		energySelect.init();
		dao.getpointType(function (data) {
		    energySelect.bindSource(data);
		    $('#energyClass')[0].firstChild.value='1,2,3';
		})

		energySelect.change(function () {
		    ret.currtype = energySelect.selectedId;
		})


        //月份选择框1
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
		mbegin.change(function () {
		    ret.beginmonth = mbegin.year + returnmonth(mbegin.month);
		})

        
	    //月份选择框2
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
		mend.change(function () {
		    ret.beginmonth = mend.year + returnmonth(mend.month);
		})

		bubble.addEventHandler(function () { mbegin.hide(); }) // 添加body点击事件处理函数
		bubble.addEventHandler(function () { mend.hide(); }) // 点击文本框时，触发body点击事件

	}

	// 加载初始化数据
	ret.loadInitData = function (data) {
		//cycleSelect.bindSource(data.cycleData);
		//energySelect.bindSource(data.energyClass);
	}

	ret.getCondtions = function(){
	    return{
	        CHECKDATESTART: mbegin.year + returnmonth(mbegin.month),
	        CHECKDATEEND: mend.year + returnmonth(mend.month),
	        POINTTYPE: ret.currtype,
	        OFFSET: 0,
            PAGESIZE: 7
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