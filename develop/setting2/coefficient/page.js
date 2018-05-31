
require.config({
    paths: config.modulePaths,
});

require.config({
    paths: { "ext": "/js/modules/ext-4.2" },
    shim: { 'ext': { exports: 'Ext' } }
})

// 页面全局变量
var page = {
    //传统获得select数据方法
    //posi====id,       data====数组型数据
    getOps: function (posi, data) {
        for (var i = 0; i < data.length; i++) {
            var ops = $('<option>');
            ops.val(data[i]).html(data[i]);
            $('#' + posi).append(ops);
        }
    },

    // 当前的操作 add/edit
    operateType: 'add'
};

define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');
    var dao = require('dao');     //  dao：数据获取模块   
    var conditions = require('conditions');
    var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
    var grid = require('grid');   // grid：表格模块，负责绘制右上角的表格        
    var mwin = require('mwin');   //  mwin：弹出窗模块，负责弹出框的显示、隐藏、拖拽
    var mform = require('mform');    // mform: 表单模块，负责form表单的数据加载和读取
    var util = require('util')

    // 变量queryCondition描述查询条件
    var queryCondition = null;

    // 查询
    function query() {

        // condition是查询条件
        queryCondition = conditions.serialize();

        // 获取页码条件（ofs、ps）
        queryCondition.ofs = 0;
        queryCondition.ps = grid.ps;

        // 获得其他查询条件
        //queryCondition.name = $('#search-name').val();

        // 开始执行查询
        do_query();
    }

    // 开始执行查询
    function do_query() {

        var condition = conditions.serialize();
        condition.ofs = 0;
        condition.ps = grid.ps;
        dao.getPageResults(condition, function (data) {
            grid.loadData(data);
        })
    }


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
            '/images/btn-edit-hover.png',
            '/images/btn-edit-active.png'
        )

        // 初始化全局事件模块（事件绑定）
        bubble.init();


        // 查询条件模块初始化
        conditions.init(bubble);


        $('.title-bar img').click(function () {
            window.location.href = "home.html";
        })

        $('#search').click(function () {

        })

        // 弹出框初始化
        mwin.config({
            selector: '#window1',
            windowId: 'window1',
            headId: 'window-head1'
        });
        mwin.init();

        // 表单初始化
        mform.init();

        $('.window-close').click(function () {

            // 关闭窗口
            mwin.close();
        })

        $('.window-cancel').click(function () {

            // 关闭窗口
            mwin.close();
        })

        $('.window-submit').click(function () {
            var data = mform.serialize();

            if (page.operateType == 'add') {
                dao.add(data, function () {

                    // 关闭窗口
                    mwin.close();

                    util.alert('添加成功');

                    // grid重新查询
                    do_query();
                })
            } else if (page.operateType == 'edit') {
                dao.edit(data, function () {

                    // 关闭窗口
                    mwin.close();

                    util.alert('编辑成功');

                    // grid重新查询
                    do_query();
                })
            }
        })

        // 点击模态层时，关闭窗口
        $('.opacity-div-for-modelwin').click(function () {
            mwin.close();
        })


        // Ext加载时，初始化grid组件，并立即查询一次数据
        Ext.onReady(function () {

            // grid组件初始化
            grid.init();

            // 立即查询一次
            query();

            // 绑定翻页事件
            grid.change(function (pageNumber, ofs) {
                queryCondition.ofs = ofs;
                do_query();
            })

            // 查询按钮点击事件
            $('#search').click(function () {
                query();
            })

            grid.edit(function (record) {

                // 当前操作设为edit
                page.operateType = 'edit';

                // 弹出框的标题设为编辑
                $('.window-title').html('编辑');

                // 在表单中加载所选行的数据
                mform.load(record);

                // 打开窗口
                mwin.open();
            })
        })

    })
})
