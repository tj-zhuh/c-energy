
/*公式表单 */

define(function (require) {

	var $ = require('jquery');
	var mselect = require('mselect');  // mselect：下拉框 模块
	var mtext = require('mtext');   // mtext：输入框 模块
	var mhidden = require('mhidden');  // mhidden：input hidden 模块
	var dao = require('dao');


	var FORMULAID2 = mhidden();
	var FORMULACODE2 = mhidden();
	var FORMULANOTEID2 = mhidden();
	var FACTORNAME = mtext();  // 变量名  （输入框）
	var BUSSINESS2 = mselect(); // 变量描述 （输入框）
	var FORMULANOTE2 = mtext();
	var UNITID2 = mselect();  // 单位 （下拉框）
	var DATAPRECISION2 = mtext();
	var ISMIDDLE2 = mselect(); 
	var FORMUSOURCE2 = mselect();
	var FORMUTYPE2 = mselect();
	var FORMUVERSION2 = mtext();
	var FORMUDESC = mtext();

	var ret = {};

	function p(s) {
	    return s < 10 ? '0' + s: s;
	}

	var myDate = new Date();
    //获取当前年
	var year=myDate.getFullYear();
    //获取当前月
	var month=myDate.getMonth()+1;
    //获取当前日
	var date=myDate.getDate(); 
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.getSeconds();  

	var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

	// 初始化
	ret.init = function () {

	    FORMULAID2.config({ selector: '#FORMULAID2' }).init();
	    FORMULACODE2.config({ selector: '#FORMULACODE2' }).init();
	    FORMULANOTEID2.config({ selector: '#FORMULANOTEID2' }).init();
		FACTORNAME.config({ selector: '#FACTOR_NAME' }).init();
		BUSSINESS2.config({ selector: '#BUSSINESS2' }).init();
		FORMULANOTE2.config({ selector: '#FORMULANOTE2' }).init();
		UNITID2.config({ selector: '#UNITID2' }).init();
		DATAPRECISION2.config({ selector: '#DATAPRECISION2' }).init();
		ISMIDDLE2.config({ selector: '#ISMIDDLE2' }).init();
		FORMUSOURCE2.config({ selector: '#FORMUSOURCE2' }).init();
		FORMUTYPE2.config({ selector: '#FORMUTYPE2' }).init();
		FORMUVERSION2.config({ selector: '#FORMUVERSION2' }).init();
		FORMUDESC.config({ selector: '#FORMUDESC' }).init();
	}

	ret.initSelect = function () {

		//单位下拉
		dao.queryUnit({}, function (data) {
			UNITID2.bindSource(data);
		}); 

		dao.queryBusiness({}, function (data) {
		    BUSSINESS2.bindSource(data);
		});
		dao.queryCategory({}, function (data) {
		    ISMIDDLE2.bindSource(data);
		});
		dao.queryAttribute({}, function (data) {
		    FORMUSOURCE2.bindSource(data);
		});
		dao.queryType({}, function (data) {
		    FORMUTYPE2.bindSource(data);
		});
	}

	// 清空数据
	ret.clear = function () {
	    FORMULAID2.clear();
	    FORMULACODE2.clear();
	    FORMULANOTEID2.clear();
	    FACTORNAME.clear();
	    BUSSINESS2.selectFirst();
	    FORMULANOTE2.clear();
		UNITID2.selectFirst();
		DATAPRECISION2.clear();
		ISMIDDLE2.selectFirst();
		FORMUSOURCE2.selectFirst();
		FORMUTYPE2.selectFirst();
		FORMUVERSION2.clear();
		FORMUDESC.clear();
	}

	// 加载数据
	ret.load = function (record) {

	    FORMULAID2.val((typeof (record.FORFACTORID) == "undefied" || !record.FORFACTORID) ? '' : record.FORFACTORID);
	    FORMULACODE2.val((typeof (record.FACTORCODE) == "undefied" || !record.FACTORCODE) ? '' : record.FACTORCODE);
	    FORMULANOTEID2.val((typeof (record.FORMULANOTEID) == "undefied" || !record.FORMULANOTEID) ? '' : record.FORMULANOTEID);
	    FACTORNAME.val((typeof (record.FACTORNAME) == "undefied" || !record.FACTORNAME) ? '' : record.FACTORNAME);
	    BUSSINESS2.val((typeof (record.BUSINESSID) == "undefied" || !record.BUSINESSID) ? '' : record.BUSINESSID);
	    FORMULANOTE2.val((typeof (record.FORMULANOTE) == "undefied" || !record.FORMULANOTE) ? '' : record.FORMULANOTE);
	    UNITID2.val((typeof (record.UNITID) == "undefied" || !record.UNITID) ? '' : record.UNITID);
	    DATAPRECISION2.val((typeof (record.DATAPRECISION) == "undefied" || !record.DATAPRECISION) ? '' : record.DATAPRECISION);
	    ISMIDDLE2.val((typeof (record.ISMIDDLE) == "undefied" || !record.ISMIDDLE) ? '' : record.ISMIDDLE);
	    FORMUSOURCE2.val((typeof (record.FORMULASOURCE) == "undefied" || !record.FORMULASOURCE) ? '' : record.FORMULASOURCE);
	    FORMUTYPE2.val((typeof (record.FORMULATYPE) == "undefied" || !record.FORMULATYPE) ? '' : record.FORMULATYPE);
	    FORMUVERSION2.val((typeof (record.FORMULAVERSION) == "undefied" || !record.FORMULAVERSION) ? '' : record.FORMULAVERSION);
	    var s = (typeof (record.FACTORDESC) == "undefied" || !record.FACTORDESC || record.FACTORDESC == null) ? '' : record.FACTORDESC.replace(/\|/g, "");
        FORMUDESC.val(s);
	    console.log(s);
	}

	// 获得编辑数据
	ret.serialize1 = function (callback) {

	  var o= {
	        FORFACTORID:FORMULAID2.val(),
	        BUSINESSID: $('#BUSSINESS2').val(),
	        FACTORCODE:FORMULACODE2.val(),
	        FACTORNAME:FACTORNAME.val(),
	        FACTORDESC:FORMUDESC.val(),	
	        FORMULANOTE: FORMULANOTE2.val(),
	        FORMULANOTEID: FORMULANOTEID2.val(),
	        ISMIDDLE: $('#ISMIDDLE2').val(),
	        FORMULATYPE: $('#FORMUTYPE2').val(),
	        FORMULASOURCE: $('#FORMUSOURCE2').val(),
	        FORMULAVERSION:FORMUVERSION2.val(),
	        UNITID: $('#UNITID2').val(),
	        DATAPRECISION:DATAPRECISION2.val()
	  };
	 
	  return o;
	}

    // 获得新增数据
	ret.serialize2 = function (callback) {
	    var o = {
	        FORFACTORID: '',	
	        BUSINESSID: $('#BUSSINESS2').val(),
	        FACTORCODE: 'F000000',
	        FACTORNAME: FACTORNAME.val(),
	        FACTORDESC: FORMUDESC.val(),
	        FORMULANOTE: FORMULANOTE2.val(),
	        FORMULANOTEID: FORMULANOTEID2.val(),
	        ISMIDDLE: $('#ISMIDDLE2').val(),
	        FORMULATYPE: $('#FORMUTYPE2').val(),
	        FORMULASOURCE: $('#FORMUSOURCE2').val(),
	        FORMULAVERSION: now,
	        UNITID: $('#UNITID2').val(),
	        DATAPRECISION: DATAPRECISION2.val()
	    };
	    return o;
	}
	return ret;
})