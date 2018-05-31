
require.config({
    paths: config.modulePaths,
});

require.config({
    paths: { "ext": "/js/modules/ext-4.2" },
    shim: { 'ext': { exports: 'Ext' } }
})

// 页面全局变量
var page = {

};

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');
	var dao = require('dao');     //  dao：数据获取模块  
	var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
	var grid = require('grid');   // grid：表格模块，负责绘制右上角的表格
	var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等
	var drop = require('drop');  //拖拽目标处理函数
	var tree = require('tree');  // 绘制下边的树
	var util=require('util');
	$(function () {

    	// 初始化全局事件模块（事件绑定）
    	bubble.init();

    	// 查询条件模块初始化
    	conditions.init(bubble);


    	drop.init();
    	tree.init();

    	drop.drop(function (rowData) {

    	    var temp = rowData.records[0].data;
    	    // 条件
    	    var condition = {
    	        CHECKDATESTART:conditions.beginmonth,
    	        CHECKDATEEND: conditions.endmonth,
    	        POINTID:temp.POINTID
    	    };  

    	    dao.getTreeData(condition, function (data) {
    	        tree.draw(data);
    	    })

    	    //dao.getClanData({}, function (data) {
    	    //    tree.draw(data);
    	    //})
    	})



    	// 初始化数据
    	dao.getInitData({}, function (data) {
    		conditions.loadInitData(data);
    	})

    	

    	$('#search').click(function () {
    		query();
    	})

        $('.title-bar img').click(function () {
            window.history.go(-1);
        })

	    // Ext加载时，初始化grid组件，并立即查询一次数据
        Ext.onReady(function () {

            // 初始化表格模块
            grid.init();

            query();

            // 绑定翻页事件
            grid.change(function (pageNumber, ofs) {
                query();
            })          
        })

        function query() {
            var condition = conditions.getCondtions();

            dao.getGridData(condition, function (data) {
                grid.loadData(data)
            })
        }



        function getCondition() {
        	var queryCondition = {}

        	// 获取页码条件（ofs、ps）
        	queryCondition.ofs = grid.ofs;
        	queryCondition.ps = grid.ps;

        	return queryCondition;
        }
    })
})
