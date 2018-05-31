
require.config({
    paths: config.modulePaths,
});


// 页面全局变量
var page = {
};

define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');     //  dao：数据获取模块  
    var pagin1 = require('pagin');    // pagin：分页组件
    var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
    var chart1= require('chart1');  // chart：图表模块，负责绘制折线图
    var chart2 = require('chart2');
    var chart3 = require('chart3');
    var chart4 = require('chart4');
    var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等

    $(function () {

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

        //曲线初始化
        chart1.iniDraw();
        chart2.iniDraw();
        chart3.iniDraw();
        chart4.iniDraw();
        
        // 查询条件模块初始化
        conditions.init(bubble);

        pagin1.config({
            prevText: '上一页',
            nextText: '下一页'
        });
        pagin1.init();

        dao.getEnterpriseName(function (data) {
            if (data == null || data == undefined)
            { return; }
            else
            {
                $('#company-name').html("用能企业--"+data);
            }
        });

       //绑定查询事件
        $('#search').click(function () {

            this.ofs = 0;
            var p = this.ps || 4;
            var f = this.ofs;

            var lineCondition = {
                CHECKDATESTART: conditions.dateBegin,
                CHECKDATEEND: conditions.dateEnd,
                EPARAID: conditions.energyType,
                OFFSET: this.ofs || 0,
                PAGESIZE: this.ps || 4
            };

            dao.getLineData(lineCondition, function (data) {
                if (data.list == null || data.list == undefined)
                { return; }

                for (var i = 0; i < data.list.length; i++) {
                    if (i == 0)
                        chart1.draw(data.list);
                    if (i == 1)
                        chart2.draw(data.list);
                    if (i == 2)
                        chart3.draw(data.list);
                    if (i == 3)
                        chart4.draw(data.list);
                }
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
                    if (data.list != null && data.list != undefined) {
                        for (var i = 0; i < data.list.length; i++) {
                            // 设置运转时间、运转率、煤耗、电耗
                            $('#p' + (i + 1) + '2').html(data.list[i].EQUIPRUNTIME);
                            $('#p' + (i + 1) + '4').html(data.list[i].EQUIPDESC);
                            $('#l' + (i + 1) + '1').html(data.list[i].RUNRATE);
                            $('#l' + (i + 1) + '2').html("运转率");
                            $('#l' + (i + 1) + '3').html(data.list[i].PARAVALUE);
                            $('#l' + (i + 1) + '4').html(data.list[i].PARADESC);
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
                EPARAID: conditions.energyType,
                OFFSET: _ofs,
                PAGESIZE: _ps
            };

            dao.getLineData(lineCondition, function (data) {
                if (data.list == null || data.list == undefined)
                { return; }

                for (var i = 0; i < data.list.length; i++) {
                    if (i == 0)
                        chart1.draw(data.list);
                    if (i == 1)
                        chart2.draw(data.list);
                    if (i == 2)
                        chart3.draw(data.list);
                    if (i == 3)
                        chart4.draw(data.list);
                }

                // 设置当前第xx条，共计xx页
                $('#current-page').html((this.ofs + 1) + '-' + (this.ofs + data.list.length));

            })

            dao.getRankData(lineCondition, function (data) {

                if (data) {
                    if (data.list != null && data.list != undefined) {
                        for (var i = 0; i < 4; i++) {
                            // 设置运转时间、运转率、煤耗、电耗
                            $('#p' + (i + 1) + '2').html(data.list[i].EQUIPRUNTIME);
                            $('#p' + (i + 1) + '4').html(data.list[i].EQUIPDESC);
                            $('#l' + (i + 1) + '1').html(data.list[i].RUNRATE);
                            $('#l' + (i + 1) + '2').html("运转率");
                            $('#l' + (i + 1) + '3').html(data.list[i].PARAVALUE);
                            $('#l' + (i + 1) + '4').html(data.list[i].PARADESC);
                        }
                    }
                }
            })
        }

        pagin1.change(func);
    })
})

 