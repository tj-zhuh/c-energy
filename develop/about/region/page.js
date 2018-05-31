
require.config({
    paths: config.modulePaths
});

require.config({
    paths: {
        "anhui": "/js/MAP/anhui",
        "aomen": "/js/MAP/aomen",
        "beijing": "/js/MAP/beijing",
        "chongqing": "/js/MAP/chongqing",
        "fujian": "/js/MAP/fujian",
        "gansu": "/js/MAP/gansu",
        "guangdong": "/js/MAP/guangdong",
        "guangxi": "/js/MAP/guangxi",
        "guizhou": "/js/MAP/guizhou",
        "hainan": "/js/MAP/hainan",
        "hebei": "/js/MAP/hebei",
        "heilongjiang": "/js/MAP/heilongjiang",
        "henan": "/js/MAP/henan",
        "hubei": "/js/MAP/hubei",
        "hunan": "/js/MAP/hunan",
        "jiangsu": "/js/MAP/jiangsu",
        "jiangxi": "/js/MAP/jiangxi",
        "jilin": "/js/MAP/jilin",
        "liaoning": "/js/MAP/liaoning",
        "neimenggu": "/js/MAP/neimenggu",
        "ningxia": "/js/MAP/ningxia",
        "qinghai": "/js/MAP/qinghai",
        "shandong": "/js/MAP/shandong",
        "shanghai": "/js/MAP/shanghai",
        "shanxi": "/js/MAP/shanxi",
        "shanxi1": "/js/MAP/shanxi1",
        "sichuan": "/js/MAP/sichuan",
        "taiwan": "/js/MAP/taiwan",
        "tianjin": "/js/MAP/tianjin",
        "xianggang": "/js/MAP/xianggang",
        "xinjiang": "/js/MAP/xinjiang",
        "xizang": "/js/MAP/xizang",
        "yunnan": "/js/MAP/yunnan",
        "zhejiang": "/js/MAP/zhejiang"
        }
});

// 页面全局变量
var page = {

    // 区域名字
    regionName: '',

    // 当前类型  碳排放：c   能耗量：energy
    currType: 'c',

    //当前选择的是企业还是地区
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
    var locator = require('locator');   //  locator：定位模块，负责url分析和页面跳转

    // 大地图模块初始化（初始化echarts组件）
    cmap.init();

    // 切换模块初始化（dom事件初始化）
    sw.init();

    // 切换事件处理
    sw.select(function (type) {
        page.currType = type;
        drawMap(dao, cmap);
    })

    //关于左标题选择
    $('div.righttop-select li div').click(function () {
        if (!$(this).hasClass('selected')) {
            $('div.righttop-select li div').removeClass('selected');
            $(this).addClass('selected');
            page.Toggle();
            draw_pie(dao, cmap);
            draw_line(dao, cmap);
            draw_bar(dao, cmap);
        }

    })

    // 定位模块的初始化（分析url参数、返回按钮事件）
    locator.init();

    // 当前区域的名字
    page.regionName = locator.regionName;

    //获取左侧三个数据
    dao.getLeftthree({ provinceId: page.regionName }, function (data) {

        $('#number1').html(data.BUSINESSCOUNT)
        $('#number2').html(data.ENTERPRISECOUNT)
        $('#number3').html(data.POINTCOUNT)
    })


    // 页面加载时，立即绘制
    drawMap(dao, cmap); 
})

//画地图
function drawMap(dao, cmap) {

    var condition = { year: page.wantDate.getFullYear(), provinceId: page.regionName }
    

    

    dao.getRCmapData(page.currType, condition, function (data1) {

        dao.getBubbleData(page.currType, condition, function (data2) {
            var CmapData = {
                areaList: [],
                compinfo: []
            }
            CmapData["areaList"] = data1;
            CmapData["compinfo"] = data2;
            cmap.draw(page.currType, page.regionName, CmapData);
        })
    })





    draw_pie(dao, cmap);
    draw_line(dao, cmap);
    draw_bar(dao, cmap);
}

//画饼
function draw_pie(dao, cmap) {

    //画饼
    //dao.getDemoPie({ type: page.currType }, function (data) {
    //    cmap.draw_pies(page.currType, data);
    //});

    

    dao.getPieData(page.currType, { year: page.wantDate.getFullYear(), provinceId: page.regionName }, function (data) {

        cmap.draw_pies(page.currType, data);

    })

}

//画折线
function draw_line(dao, cmap) {

    //画折线图和柱子
    //dao.getDemoLine({ type: page.currType }, function (data) {
    //    cmap.draw_line(page.currType, data);
    //});

    dao.getLineData(page.currType, { year: page.wantDate.getFullYear(), provinceId: page.regionName }, function (data) {

        cmap.draw_line(page.currType, data);
    })
}

//画柱状图(尚欠缺对yaxis的data项进行配置)
function draw_bar(dao, cmap) {

    dao.getBarData(page.currType, { year: page.wantDate.getFullYear(), provinceId: page.regionName }, function (data) {

        cmap.draw_bar(page.currType, data);
    })



}