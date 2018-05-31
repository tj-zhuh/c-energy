
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};


    var demo = (function () {

        var _demo = {};

        _demo.demoGridData = function (condition) {
            var gridData = [];

            var tmparr = ['平瘦煤', '柴油', '电力', '地表水'];

            var ofs = condition.ofs || 0;
            var ps = condition.ps || 7;

            for (var i = 0; i < 50; i++) {
                var pt = i + 1;

                if (i >= ofs && i < ofs + ps) {
                    gridData.push({
                        index: pt.toString(),
                        calculateId: pt.toString(),
                        calculateFunc: '',
                        maxBurning: '',
                        minBurning: '',
                        maxGray: '',
                        minGray: '',
                        unCertainty: ''
                    })
                }
            }

            return {
                list: gridData,
                total: 50
            };
        }

        return _demo;

    })();

    ret.query = function (requestData, callback) {
        var data = demo.demoGridData(requestData); // 暂时使用测试数据，需要修改为ajax
        callback(data);
    }

    ret.delete = function (requestData, callback) {
        // TODO 调用ajax删除数据
        callback({ success: true });  // 需要修改
    }

    ret.add = function (requestData, callback) {
        // TODO 调用ajax删除数据
        callback({ success: true });  // 需要修改
    }

    ret.edit = function (requestData, callback) {
        // TODO 调用ajax删除数据
        callback({ success: true });  // 需要修改
    }

    return ret;
})