
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
    var grids = require('grids-tab');
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
            grids.init();
        })        

        // 初始化数据
        //dao.getInitData({}, function (data) {
        //    conditions.loadInitData(data);
        //})

        $('#button1').click(function () {
            
            //判断选择条件
            if (!conditions.areaId) {
                util.alert('请选择省份');
                return
            }
            else if (!conditions.businessId) {
                util.alert('请选择行业');
                return
            }
            else if (!conditions.companyId) {
                util.alert('请选择企业');
                return
            }
            else if (!conditions.radioMethod) {
                util.alert('请选择方法');
                return
            }
            if (conditions.radioMethod == '2' || conditions.radioMethod == '4') {
                if (!conditions.radioType) {
                    util.alert('请选择类型');
                    return
                }
            }

            var condition = {
                PROVINCEID:conditions.areaId,
                BUSINESSID:conditions.businessId,
                ENTERPRISEID:conditions.companyId,
                STARTCYCLE: conditions.mbegint,
                STOPCYCLE: conditions.mendt,
                METHODID: conditions.confirmMethod,
                FACTORID: conditions.radioFactor
                //TYPEID: conditions.radioType
            };

            var Formulacon = {
                BUSINESSID:conditions.businessId,
                METHODID: conditions.confirmMethod,
                FORFACTORID: conditions.radioFactor,
                FORMULATYPE: '1',
                ISMIDDLE: '2'
            }

            dao.getcalcFormula(Formulacon, function (data) {

                $('#ftxt').html(data)
            })



            dao.getCalcData(condition, function (data, data1, data2, data3) {

                grid1.loadData(data3);
                grids.loadData(data1,data2);
                chart.draw(data);

                if ($('#tab1').hasClass('active')) {
                    $('#grid2').removeClass('active')
                    $('#grid3').addClass('active')
                }
                else if ($('#tab2').hasClass('active')) {
                    $('#grid2').removeClass('active')
                    $('#grid3').addClass('active')
                }
            })


        })

        //chart.draw({
        //    xAxis: ['a1', 'a2', 'a3','a4','a5','a6','a7','a8','a9','a10','a11','a12'],
        //    leftYMax: 15,
        //    leftYMin: 0,
        //    series: [{
        //        name: 'testLine1',
        //        data: [1,2,3,4,1,2,3,4,1,2,3,4]
        //    }, {
        //        name: 'testLine2',
        //        data: [2,3,4,5,6,4,2,3,5,6,2,3]
        //    }, {
        //        name: 'testLine3',
        //        data: [6,7,8,9,8,7,8,9,6,7,8,9]
        //    }]
        //});

        //$('#tab-select div').click(function () {
        //    if (!$(this).hasClass('active')) {
        //        $('#tab-select div').removeClass('active');
        //        $(this).addClass('active')
        //    }
        //    if ($('#tab1').hasClass('active')) {
        //        $('#grid2').removeClass('active')
        //        $('#grid3').addClass('active')
        //    }
        //    else if ($('#tab2').hasClass('active')) {
        //        $('#grid2').removeClass('active')
        //        $('#grid3').addClass('active')
        //    }
        //})



        $('.title-bar img').click(function () {
            window.history.go(-1);
        })
    })
})
