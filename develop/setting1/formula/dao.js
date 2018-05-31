/*  数据获取模块  */
define(function (require) {
    var $ = require('jquery');
    var util = require('util');
	var ret = {};

    //用处未知
	function analyzeData(data) {
		if (!data) return;

		var result = {};

		var dataArray = decodeURI(data).split('&');
		for (var i = 0; i < dataArray.length; i++) {
			result[dataArray[i].split('=')[0]] = dataArray[i].split('=')[1];
		}

		return result;
	}

	//获取单位列表
	ret.queryUnit = function (requestData, callback) {
		$.ajax({
			url: '/api/MeasureUnit/GetList',
			type: 'get',
			success: function (data) {
				if (!data || !data.Models) return;

				var arr = [];

				for (var i = 0; i < data.Models.length; i++) {
					arr.push({
						itemId: data.Models[i].UNITID,
						itemName: data.Models[i].UNITDESC + ' 英文名（' + data.Models[i].UNITCODE + '）'
					})
				}

				callback(arr);
			},
			error: function (data) {
			}
		})
	}

	//获取行业列表
	ret.queryBusiness = function (requestData, callback) {
		$.ajax({
			url: '/api/BusinessCode/GetList',
			type: 'get',
			success: function (data) {
				if (!data || !data.Models) return;

				var arr = [];

				for (var i = 0; i < data.Models.length; i++) {
					arr.push({
						itemId: data.Models[i].BUSINESSID,
						itemName: data.Models[i].BUSINESSNAME
					})
				}

				callback(arr);
			},
			error: function (data) {
			}
		})
	}

    //获取类别列表
	ret.queryCategory = function (requestData, callback) {

	    var arr = [{
	        itemId: 1,
	        itemName: '碳排放'
	    },{
	        itemId: 2,
	        itemName: '能耗'
        }];
        callback(arr);
	}

    //获取属性列表
	ret.queryAttribute = function (requestData, callback) {
	    callback([{
	        itemId: 1,
	        itemName: '国标'
	    }, {
	        itemId: 2,
	        itemName: '指南'
	    }, {
	        itemId: 3,
	        itemName: '自定义'
	    }]);
	}

    //获取类型列表
	ret.queryType = function (requestData, callback) {
	    callback([{
	        itemId: 2,
	        itemName: '其他'
	    }, {
	        itemId: 1,
	        itemName: '中间'
	    }]);
	}

    //获取过滤内容列表
	ret.queryContent = function (requestData, callback) {
	    $.ajax({
	        url: '/api/FormularLogic/GetSome',
	        type: 'get',
	        data: requestData,
	        success: function (data) {
	            if (!data || !data.Models) return;
	            callback(data.Models);
	        },
	        error: function (data) {
	        }
	    })
	}

    //添加变量名
	ret.addVar = function (requestData, callback) {
	    $.ajax({
	        url: '/api/FormulaCell/Add',
	        type: 'post',
	        data: requestData,
	        success: function (data) {
	            if (!data.Success) {
	                util.alert(data.Errors.Message);
	            }
	            else {
	                callback();
	            }
	        },
	        error: function (data) {
	        }
	    })
	}

    //查询变量名
	ret.queryVar = function (requestData, callback) {
	    $.ajax({
	        url: '/api/FormulaCell/GetSome',
	        type: 'get',
	        data: requestData,
	        success: function (data) {
	            if (!data || !data.Models) return;
	            callback(data.Models);
	        },
	        error: function (data) {
	        }
	    })
	}

    //查询关联变量名
	ret.queryJoinVar = function (requestData, callback) {
	    $.ajax({
	        url: '/api/FormulaCell/GetJoin',
	        type: 'get',
	        data: requestData,
	        success: function (data) {
	            if (!data || !data.Models) return;
	            callback(data.Models);
	        },
	        error: function (data) {
	        }
	    })
	}
    //查询一个变量名
	ret.queryOnlyVar = function (FORCELLID, callback) {
	    $.ajax({
	        url: '/api/FormulaCell/GetModel',
	        type: 'get',
	        data: FORCELLID,
	        success: function (data) {
	            if (!data || !data.Models) return;
	            callback(data.Models);
	        },
	        error: function (data) {
	        }
	    })
	}

    //编辑变量 
	ret.editVar = function (requestData, callback) {
	    $.ajax({
	        url: '/api/FormulaCell/Edit',
	        type: 'put',
	        data: requestData,
	        success: function (data) {
	            callback();
	        },
	        error: function (data) {
	        }
	    })
	}

	//删除变量名
	ret.deleteVar = function (requestData, callback) {
		$.ajax({
			url: '/api/FormulaFactor/Delete',
			type: 'delete',
			data: requestData,
			success: function (data) {
				if (!data.Success) {
				    util.alert(data.Errors.Message);
				}
				else {
					callback();
				}
			},
			error: function (data) {
			}
		})
	}

	//添加公式
	ret.addEditor = function (requestData, callback) {
		$.ajax({
			url: '/api/FormulaFactor/Add',
			type: 'post',
			data: requestData,
			success: function (data) {
				if (!data.Success) {
				    util.alert(data.Errors.Message);
				}
				else {
					callback();
				}
			},
			error: function (data) {
			}
		})
	}

	//查询公式
	ret.queryEditor = function (requestData, callback) {
		$.ajax({
		    url: '/api/FormulaFactor/GetPage',
			type: 'get',
			data: requestData,
			success: function (data) {
				if (!data || !data.Models) return;
				callback(data);
			},
			error: function (data) {
			}
		})
	}

	//删除公式
	ret.deleteEditor = function (requestData, callback) {
		$.ajax({
			url: '/api/FormulaFactor/Delete',
			type: 'delete',
			data: requestData,
			success: function (data) {
				if (!data.Success) {
				    util.alert(data.Errors.Message);
				}
				else {
					callback();
				}
			},
			error: function (data) {
			}
		})
	}

    //编辑公式
	ret.editEditor = function (requestData, callback) {
		$.ajax({
			url: '/api/FormulaFactor/Edit',
			type: 'put',
			data: requestData,
			success: function (data) {
				callback();
			},
			error: function (data) {
			}
		})
	}

	return ret;
})