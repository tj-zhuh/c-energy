
/*  数据获取模块  */

define(function (require) {
	var $ = require('jquery');
	var ret = {};

	var varArray = [{
		id: '1',
		name: 'A',
		type: 'L',
		unit: 'KWH',
		description: '变量A'
	}, {
		id: '2',
		name: 'B',
		type: 'L',
		unit: 'KWH',
		description: '变量B'
	}, {
		id: '3',
		name: 'C',
		type: 'L',
		unit: 'KWH',
		description: '变量C'
	}, {
		id: '4',
		name: 'D',
		type: 'L',
		unit: 'KWH',
		description: '变量D'
	}, {
		id: '5',
		name: 'E',
		type: 'L',
		unit: 'KWH',
		description: '变量E'
	}];

	function demoInitData() {

		var areaSource = [{
			areaId: '1',
			areaName: '云南'
		}, {
			areaId: '2',
			areaName: '新疆'
		}];

		var businessSource = [{
			businessId: '1',
			businessName: '水泥'
		}];

		var companySource = [];
		for (var i = 0; i < 5; i++) {
			companySource.push({
				companyId: (i + 1).toString(),
				companyName: '云南水泥厂' + (i + 1)
			})
		}

		var ret = {
			areaSource: areaSource,
			businessSource: businessSource,
			companySource: companySource
		}

		return ret;
	}

	function analyzeData(data) {
		if (!data) return;

		var result = {};

		var dataArray = decodeURI(data).split('&');
		for (var i = 0; i < dataArray.length; i++) {
			result[dataArray[i].split('=')[0]] = dataArray[i].split('=')[1];
		}

		return result;
	}


	var demo = (function () {

		var _demo = {};

		_demo.demoGridData = function (condition) {
			var gridData = [];

			var tmparr = ['平瘦煤', '柴油', '电力', '地表水'];

			var ofs = condition.ofs || 0;
			var ps = condition.ps || 7;

			for (var i = 0; i < 50; i++) {
				var pt = i + 1;

				if (i >= ofs && i < ofs + ps) {
					gridData.push({
						index: pt.toString(),
						calcUnitId: pt.toString(),
						calcUnitName: tmparr[i % 4],
						calcUnitUnit: i == 0 ? '吨' : '',
						calcUnitUnitEng: '',
						createdDate: '2016-9-25'
					})
				}
			}

			return {
				list: gridData,
				total: 50
			};
		}

		return _demo;

	})();

	//查询变量名
	ret.queryVar = function (requestData, callback) {
		var result = [];
		for (var i = 0; i < varArray.length; i++) {
			if (requestData) {
				if (varArray[i].name.indexOf(requestData) >= 0) {
					result.push(varArray[i]);
				}
				else {
					continue;
				}
			}
			else {
				result.push(varArray[i]);
			}
		}

		return result;
	}

	ret.queryConditions = function () {
		return businessSource;
	}

	ret.delete = function (requestData, callback) {
		// TODO 调用ajax删除数据
		callback({ success: true });  // 需要修改
	}

	//保存变量名
	ret.addVar = function (requestData, callback) {
		if (!requestData) return;

		var obj = analyzeData(requestData);

		varArray.push(obj);
	}

	//保存公式
	ret.addEditor = function (requestData, callback) {
	}
	//保存公式
	ret.queryEditor = function (requestData, callback) {
	}

	ret.edit = function (requestData, callback) {
		// TODO 调用ajax删除数据
		callback({ success: true });  // 需要修改
	}

	//查询条件
	ret.getInitData = function (condition, callback) {
		var data = demoInitData();
		callback(data);
	}

	return ret;
})