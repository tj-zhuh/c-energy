
/* 表格模块 */
define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');

    var ret = {};

    var storeConfig = {
        fields: ['column1', 'column2', 'column3', 'column4', 'column5', 'column6']
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
                text: '标题1',
                dataIndex: 'column1'                
            }, {
                text: '标题2',
                dataIndex: 'column2'
            }, {
                text: '标题3',
                dataIndex: 'column3'
            }, {
                text: '标题4',
                dataIndex: 'column4'
            }, {
                text: '标题5',
                dataIndex: 'column5'
            }, {
                text: '标题6',
                dataIndex: 'column6'
            }]
        },
            
        width: "100%",
        height: "100%",
        enableColumnMove: false,
        enableColumnResize: false
    } 

    ret.init = function () {

        // 设置容器
        gridConfig.renderTo = Ext.get('grid1');

        // 创建store
        ret.store = Ext.create('Ext.data.Store', storeConfig);

        // 创建grid
        ret.grid = Ext.create('Ext.grid.Panel', gridConfig);

        // 将grid和store绑定
        ret.grid.bindStore(ret.store);
    }

    ret.loadData = function (data) {
        ret.store.loadData(data);
    }


    return ret;
})