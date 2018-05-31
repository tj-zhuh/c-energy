define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};

    ret.getInitData = function (condition, callback) {
        var data = demoInitData();
        if (typeof callback == 'function') {
            callback(data);
        }
    }

    ret.getCalcData = function (condition, callback) {
        var data = demoCalcData(condition);
        callback(data);
    }

    ret.getClanData = function (condition, callback) {
        var data = demoClanData(condition);
        callback(data);
    }

    function demoInitData(condition) {
        var cycleData = [{
            cycleId: 'day',
            cycleName: '日采'
        }, {
            cycleId: 'month',
            cycleName: '月采'
        }, {
            cycleId: 'year',
            cycleName: '年采'
        }];

        var energyClass = [{
            energyId: '1',
            energyName: '水'
        }, {
            energyId: '2',
            energyName: '电'
        }, {
            energyId: '3',
            energyName: '气'
        }];

        var ret = {
            cycleData: cycleData,
            energyClass: energyClass
        };

        return ret;
    }

    function demoCalcData(condition) {
        var gridData = [];

        var ofs = condition.ofs || 0;
        var ps = condition.ps || 7;

        for (var i = 0; i < 100; i++) {
            var pt = i + 1;
            if (i >= ofs && i < ofs + ps) {
                gridData.push({
                    pointId: pt.toString(),
                    pointNumber: pt.toString(),
                    pointName: '采集点' + pt,
                    name: '某名称',
                    cost: 100,
                    unit: 'KWH'
                })
            }
        }

        return {
            list: gridData,
            total: 50
        }
    }

    function demoClanData(condition) {

        var index = 0;
        var node = {
            id: (index++).toString(),
            children: [],
            name: '采集点名称' + index,
            value: Math.random() * 1000,
            error: getErrorValue()
        }

        append(node, 0);

        function append(parent, level) {

            if (level >= 3) return;

            var n = getChildrenNum(level);

            for (var i = 0; i < n; i++) {

                var child = {
                    id: index++,
                    children: [],
                    name: '采集点名称' + index,
                    value: Math.random() * 1000,
                    error: getErrorValue()
                };

                parent.children.push(child);

                append(child, level + 1);
            }
        }

        function getChildrenNum(level) {
            var t = [
                [10, 20, 95, 99],
                [45, 70, 95, 99],
                [80, 95, 98, 99],
            ];
            var arr = t[level];
            var r = Math.random() * 100;
            for (var i = 0 ; i < 5; i++) {
                if (r < arr[i]) return i;
            }
            return 4;
        }

        function getErrorValue() {
            var r = Math.random() * 100;
            if (r < 80)
                return 0;

            return Math.random() * 200 - 100;
        }

        return node;
    }


    /*真数据专区*/

    //获得采集点类型<select>(定死)
    ret.getpointType = function (callback) {
        var data = [
            { energyId: 1, energyName: '电力' },
            { energyId: 2, energyName: '热力' },
            { energyId: 3, energyName: '燃气' }
        ];
        if (typeof callback == 'function') {
            callback(data)
        }
    }

    //获得表格
    ret.getGridData = function (condition, callback) {

        $.ajax({
            url: '/api/EnergyCollectionPointInfo/GetInfo',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data || !data.Models) {
                    util.confirm('没有查询到任何数据！');
                    return
                }

                else {

                    var item = data.Models;
                    var temp = { list: [], total: 0 };

                    for (var i = 0; i < item.length; i++) {
                        temp.list.push(item[i])
                    }

                    temp.total = item.length;

                    if (typeof callback == 'function') {
                        callback(temp);
                    }
                }
            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    //获得树节点数据
    ret.getTreeData = function (condition, callback) {

        $.ajax({
            url: '/api/EnergyCollectionPointInfo/GetInfoTree',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data || !data.Models) {
                    util.alert('服务器没传回任何数据或有错');
                    return
                }

                else {
                    var item = data.Models;
                    var temp = JSON.parse(item[0]);
                    
                    callback(temp);

                }
            }
            ,
            error: function (a, b, c) {
                console.log(a, b, c)
            }

        })
    }

    

    function get_from_json(x) {

        if (typeof x !== 'string') {
            util.alert('服务器传回的不是一个字符串');
            return;
        }

        else {
            var temp = {
                id: null,
                children: [],
                name: null,
                value: null
            };

            //截取最高

















        }
    }

    return ret;
})