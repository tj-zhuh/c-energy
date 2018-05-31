

define(function (require) {

    var $ = require('jquery');
    var Ext = require('ext');

    var ret = {};

    var storeConfig = {
        fields: ['PARAMETERID', 'PARAMETERDESC', 'PARAMETERVALUE', 'CHECKDATE']
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
                text: '公式参数描述',
                dataIndex: 'PARAMETERDESC'
            }, {
                text: '参数值',
                dataIndex: 'PARAMETERVALUE'
            }, {
                text: '周期',
                dataIndex: 'CHECKDATE'
            }]
        },

        width: "100%",
        height: "100%",
        enableColumnMove: false,
        enableColumnResize: false
    }

    var storeConfig2 = {
        fields: ['PARAMETERID', 'PARAMETERDESC', 'PARAMETERVALUE', 'CHECKDATE']
    }

    var gridConfig2 = {
        columns: {
            defaults: {
                sortable: false,
                menuDisabled: true,
                flex: 1,
                align: 'center'
            },
            items: [{
                text: '公式参数描述',
                dataIndex: 'PARAMETERDESC'
            }, {
                text: '参数值',
                dataIndex: 'PARAMETERVALUE',
                renderer: function (str) {
                    //var st = str.split(',');
                    return str[0][0];
                }
            }, {
                text: '周期',
                dataIndex: 'CHECKDATE'
            }]
        },

        width: "100%",
        height: "100%",
        enableColumnMove: false,
        enableColumnResize: false
    }

    ret.init = function () {

        // 设置容器
        gridConfig.renderTo = Ext.get('grid2');

        // 创建store
        ret.store = Ext.create('Ext.data.Store', storeConfig);

        // 创建grid
        ret.grid = Ext.create('Ext.grid.Panel', gridConfig);

        // 将grid和store绑定
        ret.grid.bindStore(ret.store);


        // 设置容器2
        gridConfig2.renderTo = Ext.get('grid3');

        // 创建store2
        ret.store2 = Ext.create('Ext.data.Store', storeConfig2);

        // 创建grid2
        ret.grid2 = Ext.create('Ext.grid.Panel', gridConfig2);

        // 将grid和store绑定2
        ret.grid2.bindStore(ret.store2);




    }

    ret.loadData = function (data1,data2) {
        ret.store.loadData(data1.list);
        ret.store2.loadData(data2.list);
    }




    return ret;







})

















