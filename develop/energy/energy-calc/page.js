
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
    var grid2 = require('grid2');   // grid：表格模块，负责绘制右下角的表格
    var chart = require('chart');  // chart：图表模块，负责绘制左下角的折线图
    var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等

    $(function () {

        // 预加载图片S
        var images = new Array()
        function preload() {
            for (i = 0; i < preload.arguments.length; i++) {
                images[i] = new Image()
                images[i].src = preload.arguments[i]
            }
        }
        preload(
            '/images/icon-radio-disabled.png',
            '/images/icon-radio-checked-disabled.png'
        )

        // 初始化全局事件模块（事件绑定）
        bubble.init();

        // 图表模块初始化
        chart.init();

        // 查询条件模块初始化
        conditions.init(bubble);

        // 初始化表格模块
        Ext.onReady(function () {
            grid1.init();
            grid2.init();
        })        

        // 初始化数据
        dao.getInitData({}, function (data) {
            conditions.loadInitData(data);
        })

        $('#buttonCalc').click(function () {            
            
            var condition = conditions.serialize();
            //var errorMsg = conditions.validate(condition);

            //if (errorMsg) {
            //    alert(errorMsg);
            //    return;
            //}

            dao.getCalcData(condition, function (data) {

                grid1.loadData(data.ParameterTable);
                grid2.loadData(data.ResultTable);
                chart.draw(data.Echart);
            })
        })

        $('.title-bar img').click(function () {
            window.history.go(-1);
        })
    })

    
    
})
 