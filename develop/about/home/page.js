
require.config({
    paths: config.modulePaths
});

require.config({
    paths: { "china1": "/js/MAP/china1" }
});

// 页面全局变量
var page = {

    // 当前大地图的类型  碳排放：c   能耗量：energy
    currType: 'c',

    //当前选择的是行业还是地区
    current_selected: 'industry',

    wantDate: new Date(),

    //切换函数
    Toggle: function () {
        if (this.current_selected == 'industry') {
            this.current_selected = 'area';
        }
        else {
            this.current_selected = 'industry';
        }
    },

};

define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');     //  dao：数据获取模块，负责从ajax或者
    var cmap = require('cmap');   //  cmap：大地图模块，负责绘制大图
    var sw = require('switch');   //  sw：切换模块，负责切换碳排放和能耗量
    var ajaxqueue = require('ajaxqueue');  // ajaxqueue：请求队列
    var util = require('util');
    var password = require('password');  // 修改密码模块    
    var monbe = require('monbe');

    util.auth('home');

    // 初始化大地图模块的echart
    cmap.init();

    // 切换模块初始化
    sw.init();

    password.init();
    monbe.init();

    $(function () {

        monbe.change(function () {

            var beginMonth = monbe.beginMonth;
            var endMonth = monbe.endMonth;

            console.log('开始月份：'+ beginMonth + '    结束月份：' + endMonth);

        })
    })

    // 切换事件处理
    sw.select(function (type) {
        page.currType = type;
        LoadleftThree();
        drawMap();
        drawPie();
        draw_those_two();
    })

    /*页面加载时集中处理*/
    // 页面加载时，立即绘制
    drawMap();
    drawPie();
    draw_those_two()
    //加载左侧的三个数值
    LoadleftThree();


    //关于右下标题选择
    $('div.righttop-select li').click(function () {
        if (!$(this).hasClass('selected')) {
            $('div.righttop-select li').removeClass('selected');
            $(this).addClass('selected');
            page.Toggle();
            drawPie()
            draw_those_two()
        }
    })

    // 登出
    $('#logout').click(function () {
        window.location.href = 'login.html';
    })



    // 大图的点击事件
    cmap.click(function (id, name) {
        console.log('点击了大地图的节点 id是' + id + '，名字是' + name)

        window.location.href = 'region.html?p=' + name;
    })


    //画地图
    function drawMap() {

        ajaxqueue.execute('getCmapData', dao.getCmapData, page.currType, { year: page.wantDate.getFullYear() }, function (data) {
            cmap.draw(page.currType, data)
            ajaxqueue.complete('getCmapData');
        });
    }

    //画饼
    function drawPie() {

        ajaxqueue.execute('getPieData', dao.getPieData, page.currType, page.current_selected, { year: page.wantDate.getFullYear() }, function (data) {
            cmap.draw_pies(page.currType, data);
            ajaxqueue.complete('getPieData');
        });
    }

    //画那两个
    function draw_those_two() {

        ajaxqueue.execute('getLineData', dao.getLineData, page.currType, page.current_selected, { year: page.wantDate.getFullYear() }, function (data) {
            cmap.draw_line(page.currType, data);
            ajaxqueue.complete('getLineData');
        });

        ajaxqueue.execute('getBarData', dao.getBarData, page.currType, page.current_selected, { year: page.wantDate.getFullYear() }, function (data) {
            cmap.draw_zhuzi(page.currType, data);
            ajaxqueue.complete('getBarData');
        });
    }

    //左侧三个数据
    function LoadleftThree() {

        ajaxqueue.execute('getLeftThree', dao.getLeftThree, page.currType, function (data) {
            $('#number1').html(data[0].NUM);
            $('#number2').html(data[1].NUM);
            $('#number3').html(data[2].NUM);
            ajaxqueue.complete('getLeftThree');
        })
    }
})

