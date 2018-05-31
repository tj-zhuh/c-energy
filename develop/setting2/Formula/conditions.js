
/* 查询条件 */

define(function (require) {

	var $ = require('jquery');
	var mselect = require('mselect');   // 普通下拉框组件
	var businessSelect = mselect();   //行业下拉框
	var areaSelect = mselect();		//地区下拉框
	var companySelect = mselect();		//企业下拉框
	var ret = {};


	// 初始化
	ret.init = function (bubble) {

		// 地区选择下拉框
		areaSelect.config({
			selector: '#areaSelect',
			idField: 'areaId',
			nameField: 'areaName'
		});
		areaSelect.init();

		// 行业选择下拉框
		businessSelect.config({
			selector: '#businessSelect',
			idField: 'businessId',
			nameField: 'businessName'
		});
		businessSelect.init();

		// 企业选择下拉框
		companySelect.config({
			selector: '#companySelect',
			idField: 'companyId',
			nameField: 'companyName'
		});
		companySelect.init();
	}

	// 加载初始化数据
	ret.loadInitData = function (data) {
		businessSelect.bindSource(data.businessSource);
		areaSelect.bindSource(data.areaSource);
		companySelect.bindSource(data.companySource);
	}

	return ret;
})