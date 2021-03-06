﻿
/* 表格模块 */
define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');

    var ret = {};

    var storeConfig = {
        fields: ['BUSINESSENAME', 'RESULTVALUE']
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
                text: '行业',
                dataIndex: 'BUSINESSENAME'
            }, {
                text: '碳排放(tCo2)',
                dataIndex: 'RESULTVALUE'
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
        ret.store.loadData(data.list);
    }

    return ret;
})