
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var nameText = mtext(); // 名称输入框
    var codeText = mtext();  // 编码输入框
    var categorySelect = mselect(); //能源种类下拉框
    var mID = mhidden();

    var ret = {};

    // 初始化
    ret.init = function () {

        mID.config({ selector: '#EMEDIUMID' }).init();
        categorySelect.config({ selector: '#EMTYPEID' }).init();
        nameText.config({ selector: '#ENERGYDESC' }).init();
        codeText.config({ selector: '#ENERGYCODE' }).init();

        dao.getCategoryOptions(function (data) {
            categorySelect.bindSource(data);
        })
    }

    // 清空数据
    ret.clear = function () {

        mID.clear();
        categorySelect.selectFirst();
        nameText.clear();
        codeText.clear();
    }

    // 加载数据
    ret.load = function (record) {

        mID.val(record.EMEDIUMID);
        categorySelect.val(record.EMTYPEID);
        nameText.val(record.ENERGYDESC);
        codeText.val(record.ENERGYCODE);
    }

    // 获得数据
    ret.serialize = function () {

        return {

            EMEDIUMID: mID.val(),
            EMTYPEID: categorySelect.val(),
            ENERGYDESC: nameText.val(),
            ENERGYCODE: codeText.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return {
            ENERGYDESC: nameText.val(),
        }
    }

    return ret;
})