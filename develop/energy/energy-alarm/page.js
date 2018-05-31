
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
    var pagin1 = require('pagin');    // pagin：分页组件
    var dao = require('dao');     //  dao：数据获取模块  
    var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
    var grid1 = require('grid1');   // grid：表格模块，负责绘制左下角的表格
    var chart1 = require('chart1');  // chart：图表模块，负责绘制折线图
    var chart2 = require('chart2');
    var chart3 = require('chart3'); 
    var chart4 = require('chart4');
    var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等
    var util = require('util');

    $(function () {
        var keepState = false;
        var ofs = 0; // 当前从第几条开始
        var ps = 4; // 每页的条数
        var pageNumber = 1;// 当前页数(初始为1)
        var pageTotal = 0; // 总页数
        var total = 0; // 总记录数

        // 初始化全局事件模块（事件绑定）
        bubble.init();

        // 图表模块初始化
        chart1.init();
        chart2.init();
        chart3.init();
        chart4.init();

        chart1.iniDraw();
        chart2.iniDraw();
        chart3.iniDraw();
        chart4.iniDraw();

        // 查询条件模块初始化
        conditions.init(bubble);

        // 初始化表格模块（列数、表头等）
        Ext.onReady(function () {
            grid1.init();
        })

        // 模拟查询条件初始化
        //dao.getInitData({}, function (data) {
        //    conditions.loadInitData(data);
        //}) 

        // 初始化pagin组件
        pagin1.config({
            prevText: '上一页',
            nextText: '下一页'
        });
        pagin1.init();

        //绑定查询事件
        $('#search').click(function () {

            //判断选择条件
            if (!conditions.areaId) {
                util.alert('请选择省份');
                return
            }
            else if (!conditions.businessId) {
                util.alert('请选择行业');
                return
            }
            else if (!conditions.companySelections) {
                util.alert('请选择企业');
                return
            }

            var gridCondition = {
                BUSINESSIDLIST: conditions.businessId,
                CHECKDATESTART: conditions.dateBegin,
                CHECKDATEEND: conditions.dateEnd
            };
            dao.getGridData(gridCondition, function (data) {
                grid1.loadData(data);
            })

            this.ofs = 0;
            var p = this.ps || 4;
            var f = this.ofs;

            var lineCondition = {
                ENTERPRISEIDLIST: conditions.companySelections,
                CHECKDATESTART: conditions.dateBegin,
                CHECKDATEEND: conditions.dateEnd,
                OFFSET: this.ofs || 0,
                PAGESIZE: this.ps || 4
            };

            dao.getLineData(lineCondition, function (data) {
                if (data.list == null || data.list == undefined)
                    return;

                chart1.draw(data.list);
                chart2.draw(data.list);
                chart3.draw(data.list);
                chart4.draw(data.list);
                
                this.total = data.total;// 设置总条数
                var r = this.total/(p);
                this.pageTotal = Math.ceil(r); // 设置总页数

                // 重新加载pagin 
                pagin1.set(p, this.total);

                // 设置当前第xx条，共计xx页
                $('#current-page').html((f + 1) + '-' + (f + data.list.length));
                $('#total-page').html(this.pageTotal);
            })

            dao.getRankData(lineCondition, function (data) {

                if (data) {
                    if (data.list!==null && data.list!==undefined) {
                        for (var i = 0; i < data.list.length; i++) {
                            // 设置公司名、地区、行业、排名
                            $('#l' + (i + 1) + 'l').html(data.list[i].ENTERPRISENAME);
                            $('#l' + (i + 1) + 'r').html("所属地区：" + data.list[i].PROVINCENAME);
                            $('#l' + (i + 1) + 'c').html("所属行业：" + data.list[i].BUSINESSENAME);
                            $('#l' + (i + 1) + 'pn').html(data.list[i].RANKING);
                        }
                    }
                }
            })

            $('.title-bar img').click(function () {
                window.history.go(-1);
            })
        })

        // 翻页事件的处理函数
        var func = function (_ofs, _ps, _total, _pageNumber) {

            this.ofs = _ofs;
            this.pageNumber = _pageNumber;

            var lineCondition = {
                ENTERPRISEIDLIST: conditions.companySelections,
                CHECKDATESTART: conditions.dateBegin,
                CHECKDATEEND: conditions.dateEnd,
                OFFSET: _ofs,
                PAGESIZE: _ps
            };

            dao.getLineData(lineCondition, function (data) {
                if (data.list == null || data.list == undefined)
                    return;
                chart1.draw(data.list);
                chart2.draw(data.list);
                chart3.draw(data.list);
                chart4.draw(data.list);

                // 设置当前第xx条，共计xx页
                $('#current-page').html((this.ofs + 1) + '-' + (this.ofs + data.list.length));

            })

            dao.getRankData(lineCondition, function (data) {
                if (data) {
                    if (data.list !== null && data.list !== undefined) {
                        for (var i = 0; i < data.list; i++) {
                            // 设置公司名、地区、行业、排名
                            $('#l' + (i + 1) + 'l').html(data.list[i].ENTERPRISENAME);
                            $('#l' + (i + 1) + 'r').html("所属地区：" + data.list[i].PROVINCENAME);
                            $('#l' + (i + 1) + 'c').html("所属行业：" + data.list[i].BUSINESSENAME);
                            $('#' + (i + 1) + 'pn').html(data.list[i].RANKING);
                        }
                    }
                }
            })
        }

        pagin1.change(func);
    })
})

 