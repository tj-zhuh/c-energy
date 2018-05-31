
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
    var grid1 = require('grid1');   // grid：表格模块，负责绘制右上角的表格    
    var chart = require('chart');  // chart：图表模块，负责绘制左下角的折线图
    var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等
    var util = require('util');

    $(function () {

        // 初始化全局事件模块（事件绑定）
        bubble.init();

        // 图表模块初始化
        chart.init();

        // 查询条件模块初始化
        conditions.init(bubble);

        // 初始化表格模块
        Ext.onReady(function () {
            grid1.init();
        })        

        $('#button1').click(function () {
            if (conditions.ifmcheck1Multi == true && conditions.ifcompanyMultiboxMulti == true) {
                util.alert('企业和方法不能同时多选，请返回修改')
                return
            }
            else if (!conditions.areaIds) {
                util.alert('请选择省份');
                return
            }
            else if (!conditions.EnIds) {
                util.alert('请选择行业');
                return
            }
            else if (!conditions.business) {
                util.alert('请选择企业');
                return
            }
            else if (!conditions.functions) {
                util.alert('请选择方法');
                return
            }
            else {
                var condition = conditions.loadData();

                dao.getCalcDatagrid(condition, function (data) {
                    grid1.loadData(data);
                })

                var condition1 = conditions.loadData1();
                dao.getCalcDatachart(condition1, function (data) {
                    chart.draw(data);
                })

            }
        })
    })
})
