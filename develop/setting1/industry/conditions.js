
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var mtext = require('mtext');
    var nametxt = mtext();

    var ret = {};

    // 初始化
    ret.init = function () {

        nametxt.config({
            selector: '#search-name',
        
        });
        nametxt.init();


    }

    ret.serialize = function () {
        return {
            BUSINESSNAME: nametxt.val() || '',

        };
    }

    return ret;
})