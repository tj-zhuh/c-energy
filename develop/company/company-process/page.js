require.config({
	paths: config.modulePaths,
});

require.config({
    paths: { "ext": "/js/modules/ext-4.2" },
    shim: { 'ext': { exports: 'Ext' } }
});

// 页面全局变量
var page = {
	//1：碳排放 2：能耗
	current_type: '2',

	//当前所选企业
	current_company: null
};

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');
	var dao = require('dao');     //  dao：数据获取模块
	var mselect = require('mselect');   // 普通下拉框组件
	var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
	var grid1 = require('grid1');   // grid：表格模块，负责绘制右上角的表格
	var chart1 = require('chart1');  // chart：图表模块，负责绘制左下角的折线图
	var chart2 = require('chart2');
	var chart3 = require('chart3');
	var chart4 = require('chart4');
	var chart5 = require('chart5');
	var energyTypeSelect = mselect();  // 能源消耗下拉框
	var CO2TypeSelect = mselect();  // 碳排放下拉框
	var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等

	var energyTypeId = null;
	var CO2TypeId = null;

	$(function () {

		// 初始化全局事件模块（事件绑定）
		bubble.init();

		// 图表模块初始化
		chart1.init();
		chart2.init();
		chart3.init();
		chart4.init();
		chart5.init();

		// 查询条件模块初始化
		conditions.init(bubble);

		// 初始化表格模块
		Ext.onReady(function () {
			grid1.init();
		});

		energyTypeSelect.config({
		    selector: '#energyTypeSelect'
		});
		energyTypeSelect.init();

		CO2TypeSelect.config({
		    selector: '#CO2TypeSelect'
		});
		CO2TypeSelect.init();

		$("#energyTypeLabel").hide();
		$("#energyTypeSelect").hide();
		$("#CO2TypeLabel").hide();
		$("#CO2TypeSelect").hide();

		$('#search').click(function () {
		    $(".grid-title-text").html($('#companySelect option:selected').text());

		    dao.getEnergyConsume(getCondition().queryCondition, function (data) {
		        if (data != null && data != undefined) {
		            $("#E-Count").html(data);
		        }
		    })
		    dao.getGetCO2Consume(getCondition().queryCondition, function (data) {
		        if (data != null && data != undefined) {
		            $("#C-Count").html(data);
		        }
		    })

		    dao.getGridData(getCondition().queryCondition, function (data) {
		        if (data) {
		            if (data.list != null && data.list != undefined) {
		                grid1.loadData(data);
		            }
		        }
		    })

			if (page.current_type == '2') {
			    $("#energyUnit").html("tce");
			    $("#energyTypeLabel").hide();
				$("#energyTypeSelect").hide();
				$("#chart1").show();
				$("#chart2").hide();
				$("#chart3").hide();
				$("#multiEnergy").addClass("active");
				$("#standEnergy").removeClass("active");
				$("#consumeEnergy").removeClass("active");
				dao.getComEnergyConsumeLineData(getCondition().queryCondition, function (data) {
				    if (data) {
				        if (data.list != null && data.list != undefined)
				        { chart1.draw(data.list); }
				    }
				})
			}

			if (page.current_type == '1') {
			    $("#energyUnit-C").html("tCo2");
			    $("#CO2TypeLabel").hide();
			    $("#CO2TypeSelect").hide();
			    $("#chart4").show();
			    $("#chart5").hide();
			    $("#standC").addClass("active");
			    $("#consumeC").removeClass("active");
			    dao.getCO2ConsumeLineData(getCondition().queryCondition, function (data) {
			        if (data) {
			            if (data.list != null && data.list != undefined)
			            { chart4.draw(data.list); }
			        }
			    })
			}
		})

		$('#multiEnergy').click(function () {
		    $("#energyUnit").html("tce");
		    $("#energyTypeLabel").hide();
		    $("#energyTypeSelect").hide();
		    $("#chart1").show();
		    $("#chart2").hide();
		    $("#chart3").hide();
		    $("#multiEnergy").addClass("active");
		    $("#standEnergy").removeClass("active");
		    $("#consumeEnergy").removeClass("active");
			dao.getComEnergyConsumeLineData(getCondition().queryCondition, function (data) {
			    if (data) {
			        if (data.list != null && data.list != undefined)
			        { chart1.draw(data.list); }
			    }
			})
		})
		$('#standEnergy').click(function () {
		    $("#energyUnit").html("tce");
		    $("#energyTypeLabel").hide();
		    $("#energyTypeSelect").hide();
		    $("#chart1").hide();
		    $("#chart2").show();
		    $("#chart3").hide();
		    $("#multiEnergy").removeClass("active");
		    $("#standEnergy").addClass("active");
		    $("#consumeEnergy").removeClass("active");
		    dao.getParaEnergyConsumeLineData(getCondition().queryCondition, function (data) {
		        if (data) {
		            if (data.list != null && data.list != undefined)
		            { chart2.draw(data.list); }
		        }
		    })
		})

		$('#consumeEnergy').click(function () {
		    $("#energyUnit").html("吨");
		    $("#energyTypeLabel").show();
		    $("#energyTypeSelect").show();
		    $("#chart1").hide();
		    $("#chart2").hide();
		    $("#chart3").show();
		    $("#multiEnergy").removeClass("active");
		    $("#standEnergy").removeClass("active");
		    $("#consumeEnergy").addClass("active");
		    var condition = {
		        ENTERPRISEID: conditions.companyId
		    }
		    dao.getEnergyConsumeType(condition, function (data) {
		        energyTypeSelect.bindSource(data);
		    })
		    //dao.getEnergyConsumeType(condition, function (data) {
		    //    CO2TypeSelect.bindSource(data);
		    //})
		})

		$('#standC').click(function () {
		    $("#energyUnit-C").html("tCo2");
		    $("#CO2TypeLabel").hide();
		    $("#CO2TypeSelect").hide();
		    $("#chart4").show();
		    $("#chart5").hide();
		    $("#standC").addClass("active");
		    $("#consumeC").removeClass("active");
		    dao.getCO2ConsumeLineData(getCondition().queryCondition, function (data) {
		        if (data) {
		            if (data.list != null && data.list != undefined)
		            { chart4.draw(data.list); }
		        }
			})
		})

		$('#consumeC').click(function () {
		    $("#energyUnit-C").html("吨");
		    $("#CO2TypeLabel").show();
		    $("#CO2TypeSelect").show();
			$("#chart4").hide();
			$("#chart5").show();
			$("#standC").removeClass("active");
			$("#consumeC").addClass("active");
			var condition = {
			    ENTERPRISEID: conditions.companyId
			};
		    //dao.getEnergyConsumeType(condition, function (data) {
		    //    energyTypeSelect.bindSource(data);
		    //})
			dao.GetCO2ConsumeType(condition, function (data) {
		        CO2TypeSelect.bindSource(data);
		    })
		})

		$('#viewEnergy').click(function () {
			page.current_type = '2';
			$("#panel5").hide();
			$("#panel4").show();
		})

		$('#viewC').click(function () {
			page.current_type = '1';
			$("#panel5").show();
			$("#panel4").hide();
		})

	    //选择能源类别
		energyTypeSelect.change(function () {
		    if (energyTypeSelect.selectedId == null || energyTypeSelect.selectedId == undefined) {
		        return;
		    }
		    else {
		        energyTypeId = energyTypeSelect.selectedId;
		        dao.getEnergyConsumeDetailLineData(getEnergyConsumeCondition().queryEnergyCondition, function (data) {
		            if (data) {
		                if (data.list != null && data.list != undefined)
		                { chart3.draw(data.list); }
		            }		           
		        })
		    }
		})

	    //选择碳排放
		CO2TypeSelect.change(function () {
		    if (CO2TypeSelect.selectedId == null || CO2TypeSelect.selectedId == undefined) {
		        return;
		    }
		    else {
		        CO2TypeId = CO2TypeSelect.selectedId;
		        dao.getCO2ConsumeDetailLineData(getCO2ConsumeCondition().queryCO2Condition, function (data) {
		            if (data) {
		                if (data.list != null && data.list != undefined)
		                { chart5.draw(data.list); }
		            }
		        })
		    }
		})

		$('.title-bar img').click(function () {
			window.history.go(-1);
		})
	})


	function getCondition() {
	    var condition = {
	        ENTERPRISEID: conditions.companyId,
	        CHECKDATESTART: conditions.dateBegin,
	        CHECKDATEEND: conditions.dateEnd
	    };

	    return {
	        queryCondition: condition
	    };
	}

	function getEnergyConsumeCondition() {
	    var condition = {
	        ENTERPRISEID: conditions.companyId,
	        ENERGYTYPEID: energyTypeId,
	        CHECKDATESTART: conditions.dateBegin,
	        CHECKDATEEND: conditions.dateEnd
	    };

	    return {
	        queryEnergyCondition: condition
	    };
	}

	function getCO2ConsumeCondition() {
	    var condition = {
	        ENTERPRISEID: conditions.companyId,
	        CO2TYPEID: CO2TypeId,
	        CHECKDATESTART: conditions.dateBegin,
	        CHECKDATEEND: conditions.dateEnd
	    };

	    return {
	        queryCO2Condition: condition
	    };
	}
})


