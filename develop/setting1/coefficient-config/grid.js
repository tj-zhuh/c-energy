
/* 表格模块 */
define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');
    var pagin = require('pagin');    // pagin：分页组件
    var util = require('util');

    var ret = {
        ofs: 0, // 当前从第几条开始
        ps: 12, // 每页的条数
        pageNumber: 1,// 当前页数(初始为1)
        total: 0, // 数据总条数
        grid: null,  // ext对象
        store: null,  // ext对象
        deleteHandler: null, // 点击删除按钮的处理函数
        editHandler: null  // 点击编辑按钮的处理函数
    };

    var storeConfig = {
        fields: ['ROWNUM', 'FACTORCONID', 'BUSINESSID', 'BUSINESSNAME', 'ZONETYPE', 'EEMISSIONID', 'EMISSIONDESC', 'EMISSIONTYPESOURCE', 'EFACTORID', 'FACTORDESC', 'FACTORVALUE', 'GBCODE', 'UNITID', 'UNITCODE', 'UNITDESC', 'UPDATEDATE']
    }

    var gridConfig = {
        columns: {
            defaults: {
                sortable: false,
                menuDisabled: true,
                flex: 1,
                align: 'center'
            },
            items: [{
                text: '序号',
                dataIndex: 'ROWNUM',
                flex: 0.5
            }, {
                text: '行业',
                dataIndex: 'BUSINESSNAME'
            }, {
                text: '地区类别',
                dataIndex: 'ZONETYPE',
                renderer: function (a) {
                    switch (a) {
                        case '0': return '全部';
                        case '1': return '华北';
                        case '2': return '东北';
                        case '3': return '华东';
                        case '4': return '华中';
                        case '5': return '西北';
                        case '6': return '南方';
                        case '7': return '海南';
                    }
                }
            }, {
                text: '活动数据',
                dataIndex: 'EMISSIONDESC'
            }, {
                text: '排放因子',
                dataIndex: 'FACTORDESC'
            }, {
                text: '国标值',
                dataIndex: 'FACTORVALUE',
                renderer: function (a) {
                    return a.toFixed(4);
                }
            }, {
                text: '单位',
                dataIndex: 'UNITDESC',
            }, {
                text: '来源',
                dataIndex: 'EMISSIONTYPESOURCE',
                renderer: function (a) {
                    switch (a) {
                        case '1': return '国标';
                        case '2': return '指南';
                        case '3': return '通用';
                    }
                }
            }, {
                text: '版本',
                dataIndex: 'GBCODE',
            }, {
                text: '操作',
                renderer: function () {
                    return "<div class='image-buttons'><div class='btn-delete'></div><div class='btn-edit'></div></div>";
                }
            }]
        },

        width: "100%",
        height: "100%",
        enableColumnMove: false,
        enableColumnResize: false
    }



    ret.init = function () {

        var that = this;

        // 设置容器
        gridConfig.renderTo = Ext.get('grid1');

        // 创建store
        ret.store = Ext.create('Ext.data.Store', storeConfig);

        // 创建grid
        ret.grid = Ext.create('Ext.grid.Panel', gridConfig);

        // 将grid和store绑定
        ret.grid.bindStore(ret.store);

        // 初始化pagin组件
        pagin.config({
            prevText: '上一页',
            nextText: '下一页'
        });
        pagin.init();

        // 行内按钮的点击事件  删除
        $('.grid-container').on('click', '.btn-delete', function (e) {
            var record_id = $(this).parents('.x-grid-row').attr('data-recordid');
            var record = getRecordById(record_id);
            var id = record.FACTORCONID;
            var name = record.EMISSIONDESC;
            util.confirm('确认要删除名为' + name + '的条目吗？', function () {
                if (typeof that.deleteHandler === 'function') {
                    that.deleteHandler(id);
                }
            })
        })

        // 行内按钮的点击事件  编辑
        $('.grid-container').on('click', '.btn-edit', function (e) {
            var record_id = $(this).parents('.x-grid-row').attr('data-recordid');
            var record = getRecordById(record_id);
            console.log(record)
            var id = record.FACTORCONID;
            if (typeof that.editHandler === 'function') {
                that.editHandler(record);
            }
        })

        // 根据ext的行id获得行数据
        function getRecordById(recordId) {
            for (var i in ret.store.data.items) {
                var item = ret.store.data.items[i];
                if (item.internalId == recordId) {
                    return item.data;
                }
            }
        }
    }

    // _reloadPagin变量标识在加载grid数据时，是否需要重新加载pagin
    var keepState = false;

    // 加载数据（data应包含两个字段 list是数据数组 total是总条数）
    ret.loadData = function (data) {

        if (data.list >= this.ps) {
            $('#grid1').addClass('full');
        } else {
            $('#grid1').removeClass('full');
        }

        // 设置总条数
        this.total = data.total;

        // 加载数据
        this.store.loadData(data.list);

        // 是否重新加载pagin
        if (keepState === false) {
            this.ofs = 0;
            this.pageNumber = 1;
            pagin.set(this.ps, this.total);
        }
        keepState = false;
        // 设置当前第xx条，共计xx条
        $('#current-page').html((this.ofs + 1) + '-' + (this.ofs + data.list.length));
        $('#total-page').html(this.total);
    }

    // 翻页事件的处理函数
    ret.change = function (func) {
        var that = this;
        pagin.change(function (_pageNumber, _ofs, _ps, _total) {
            that.ofs = _ofs;
            that.pageNumber = _pageNumber;
            keepState = true;   // 在翻页时，保持之前的查询条件和页码状态
            func(_pageNumber, _ofs, _ps, _total);
        });
    }

    ret.delete = function (func) {
        this.deleteHandler = func;
    }

    ret.edit = function (func) {
        this.editHandler = func;
    }

    return ret;
})