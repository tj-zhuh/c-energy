
/*  类别属性维护  */

define(function (require) {
    var $ = require('jquery');
    var dict = require('dict');   // 列表维护模块
    var dao = require('dao');
    var mwin = require('mwin');
    var mwin3 = mwin();
    var util = require('util');

    var ret = {};

    ret.getMwinInstance = function () { return mwin3; }

    ret.currentList = [];

    ret.init = function () {
        dict.init();
        dao.getCSourceCatelogs(function (data) {
            dict.load(data);
            ret.currentList = data;
        })

        mwin3.config({
            selector: '#window3',
            windowId: 'window3',
            headId: 'window-head3'
        });

        mwin3.init();

        $('#btn2').click(function () {
            mwin3.open();
        })

        $('#window3 .window-close').click(function () {
            mwin3.close();
        })

        $('#window3 .window-cancel').click(function () {

            mwin3.close();
            dict.load(ret.currentList);
            
        })

        $('#window3 .window-submit').click(function () {

            var data = dict.serialize();
            ret.currentList = data;
            mwin3.close();            

            dao.updateCSourceCatelogs(data, function () {
                util.alert('修改成功');
            })
        })
    }

    return ret;
})