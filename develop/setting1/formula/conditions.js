/* 查询条件 */

define(function (require) {
	var $ = require('jquery');
	var dao = require('dao');
	var mtext = require('mtext');
	var mselect = require('mselect');   // 普通下拉框组件
	var businessSelect = mselect();   //行业下拉框
	var categorySelect = mselect();   //类别下拉框
	var contentText = mtext();   //内容输入框
	var attributeSelect = mselect();   //属性下拉框
	var typeSelect = mselect();   //类型下拉框
	var ret = {};

	// 初始化
	ret.init = function (callback) {
	    businessSelect.config({
	        selector: '#businessSelect',
	        selectAll: false
	    }).init();
	    categorySelect.config({
	        selector: '#categorySelect',
	        selectAll: false
	    }).init();
	    contentText.config({ selector: '#contentText' });
	    contentText.init();
	    attributeSelect.config({
	        selector: '#attributeSelect',
	        selectAll: false
	    }).init();
	    typeSelect.config({
	        selector: '#typeSelect',
	        selectAll: false
	    }).init();

		dao.queryBusiness({}, function (data) {
			businessSelect.bindSource(data);
		});
		dao.queryCategory({}, function (data) {
		    categorySelect.bindSource(data);
		});
		dao.queryAttribute({}, function (data) {
		    attributeSelect.bindSource(data);
		});
		dao.queryType({}, function (data) {
		    typeSelect.bindSource(data);
		});
	}

	ret.get =function(callback) {
	    var obj = {
	        BUSINESSID: businessSelect.selectedId,
	        CATEGORYID: categorySelect.selectedId,
	        CONTENT: contentText.val(),
	        ATTRIBUTEID: attributeSelect.selectedId,
	        TYPEID: typeSelect.seletedId
	    };
	    return obj;
	}

	return ret;
})