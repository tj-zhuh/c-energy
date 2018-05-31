
require.config({
    paths: config.modulePaths,
});

require.config({
    paths: { "ext": "/js/modules/ext-4.2" },
    shim: { 'ext': { exports: 'Ext' } }
})

// 页面全局变量
var page = {

    // 当前的操作 add/edit
    operateType: 'add'
};

define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');
    var dao = require('dao');     //  dao：数据访问模块      
    var grid = require('grid');   // grid：表格模块，负责绘制右上角的表格        
    var mwin = require('mwin');   //  mwin：弹出窗模块，负责弹出框的显示、隐藏、拖拽
    var form = require('form');    // form: 表单模块，负责弹出框里的表单操作
    var catelog = require('catelog'); // catelog：类别属性维护
    var conditions = require('conditions');  // mselect：下拉框模块

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

        // 开始执行查询
        do_query();
    }

    // 开始执行查询
    function do_query() {

        if (!queryCondition.EMISSIONTYPESOURCE) {
            util.alert('请选择类别类型！');
            return;
        }

        dao.query(queryCondition, function (data) {

            // grid加载数据
            grid.loadData(data);
        })
    } 

    $(function () {

        conditions.init();

        // 预加载图片S
        var images = new Array()
        function preload() {
            for (i = 0; i < preload.arguments.length; i++) {
                images[i] = new Image()
                images[i].src = preload.arguments[i]
            }
        }
        preload(
            '/images/btn-delete-hover.png',
            '/images/btn-delete-active.png',
            '/images/btn-edit-hover.png',
            '/images/btn-edit-active.png',
            '/images/icon-delete-hover.png',
            '/images/icon-delete-active.png'
        )

        // 后退
        $('.title-bar img').click(function () {
            window.location.href="home.html"
        })    

        // 弹出框初始化
        var mwin1 = mwin();
        var mwin2 = mwin();
        
        mwin1.config({
            selector: '#window1',
            windowId: 'window1',
            headId: 'window-head1'
        });

        mwin2.config({
            selector: '#window2',
            windowId: 'window2',
            headId: 'window-head2'
        });
  
        mwin1.init();
        mwin2.init();
       
        // 表单初始化
        form.init();

        //新弹窗
        $('#btn1').click(function () {
            mwin2.open();
        })

        catelog.init(); 

        // 点击添加按钮时，打开窗口
        $('.add').click(function () {

            // 当前操作设为edit
            page.operateType = 'add';

            // 弹出框的标题设为添加
            $('#window-head1 .window-title').html('添加');

            // 清空表单
            form.clear();

            // 打开窗口
            $('#EMISSIONTYPEIDGB').attr('disabled', 'disabled').css('background', '#cdcdcd');
            $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');
            mwin1.open();
        })

        $('#window1 .window-close').click(function () {            
            mwin1.close();
        })

        $('#window1 .window-cancel').click(function () {
            mwin1.close();
        })

        $('#window2 .window-close').click(function () {
            mwin2.close();
        })

        $('#window2 .window-cancel').click(function () {
            mwin2.close();
        })

        $('#window1 .window-submit').click(function () {
            var data = form.serialize();
            var confirm_data = form.confirm_input();
            if (!confirm_data.EMISSIONDESC) {
                util.alert('请填写排放源名称！');
                return
            }
            if (!confirm_data.EMISSIONTYPESOURCEDIFF) {
                util.alert('请选择类别划分方式！');
                return
            }
            if (!confirm_data.EMISSIONTYPEIDGB && !confirm_data.EMISSIONTYPEIDZN) {
                util.alert('国标类型与指南类型至少要选择一项，请按要求填写');
                return ;
            }
            if (page.operateType == 'add') {
                //data.EMISSIONID = '';

                dao.add(data, function () {
                    mwin.close();
                    util.alert('添加成功');
                    do_query();
                })

            } else if (page.operateType == 'edit') {
                
                //data.EMISSIONID = grid.current_id;
                dao.edit(data, function () {
                    mwin.close();
                    util.alert('编辑成功');
                    do_query();
                })
            }
            $('#EMISSIONTYPEIDGB').attr('disabled', 'disabled').css('background', '#cdcdcd');
            $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');
        })

        // 点击模态层时，关闭窗口
        $('.opacity-div-for-modelwin').click(function () {
            mwin1.close();
            mwin2.close();
            catelog.getMwinInstance().close();
        })

        // Ext加载时，初始化grid组件，并立即查询一次数据
        Ext.onReady(function () {

            // grid组件初始化
            grid.init();

            // 立即查询一次
            //query();

            // 绑定翻页事件
            grid.change(function (pageNumber, ofs) {
                queryCondition.ofs = ofs;
                do_query();
            })

            // 查询按钮点击事件
            $('#search').click(function () {
                query();
            })

            grid.delete(function (id) {
                dao.delete({ EEMISSIONID: id }, function (result) {
                    util.alert('删除成功');
                    query();
                })
            });

            grid.edit(function (record) {

                // 当前操作设为edit
                page.operateType = 'edit';

                // 弹出框的标题设为编辑
                $('#window-head1 .window-title').html('编辑');

                // 在表单中加载所选行的数据
                form.load(record);

                // 打开窗口
                mwin1.open();
            })
        })
    })
})
