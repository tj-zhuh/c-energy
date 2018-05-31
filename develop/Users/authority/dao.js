
/*  数据访问模块  */

define(function (require) {
	var $ = require('jquery');
	var ret = {}; 

	var demo = (function () {

		var _demo = {};

		_demo.demoListData = function () {
			var listData = [];

			var tmparr = ['碳排放分析', '碳排放计算', '能耗分析', '能耗计算', '标准配置'];

			for (var i = 0; i < 50; i++) {
				var pt = i + 1;

				listData.push({
					functionId: pt.toString(),
					functionName: tmparr[i % 4]
				})
			}

			return {
				list: listData,
				total: 50
			};
		}

		return _demo;

	})();

	ret.getRoles = function (callback) {

	    $.ajax({
	        url: '/api/ManageRole/GetList',	        
	        type: 'get',
	        success: function (data) {
	            var arr = [];

	            for (var i = 0; i < data.Models.length; i++) {
	                var item = data.Models[i];

	                arr.push({
	                    itemId: item.RoleId,
                        itemName: item.RoleName
	                })
	            }

	            callback(arr);
	        }
	    })

	}

	ret.query = function (requestData, callback) {

	    $.ajax({
	        url: '/api/ManageRoleauthors/GetAuthors',
	        data: requestData,
	        type: 'get',
	        success: function (data) {
	            callback(data.Models);
	        }
	    })
	}  

	ret.save = function (requestData, callback) {
    
	    $.ajax({
	        url: '/api/ManageRoleauthors/Add',
	        data: requestData,
	        type: 'post',
	        success: function (data) {
	            callback();
	        }
	    })
	}

	return ret;
})