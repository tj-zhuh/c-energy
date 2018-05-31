
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mtext = require('mtext');   // mtext：输入框模块
    var mselect = require('mselect'); //mselect模块
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessId = mhidden();
    var nameText = mtext(); // 名称输入框
    var codeText = mtext();  // 编码输入框
    var optionsSelect = mselect();

    var ret = {};

    // 初始化
    ret.init = function () {

        businessId.config({ selector: '#BUSINESSID' }).init();
        nameText.config({ selector: '#BUSINESSNAME' }).init();
        codeText.config({ selector: '#BUSINESSCODE' }).init();
        optionsSelect.config({ selector: '#ISCOLLECTED' }).init();

        dao.getOptions(function (data) {
            optionsSelect.bindSource(data);
        });

    }

    // 清空数据
    ret.clear = function () {
        businessId.clear();
        nameText.clear();
        codeText.clear();
        optionsSelect.selectFirst();
    }

    // 加载数据
    ret.load = function (record) {

        businessId.val(record.BUSINESSID)
        nameText.val(record.BUSINESSNAME);
        codeText.val(record.BUSINESSCODE);
        optionsSelect.val(record.ISCOLLECTED);
    }

    // 获得数据
    ret.serialize = function () {

        return {
            BUSINESSID:businessId.val(),
            BUSINESSNAME: nameText.val(),
            BUSINESSCODE: codeText.val(),
            ISCOLLECTED:  optionsSelect.val()
        };
    }

    //返回输入框所得数据，以判断是否漏填
    ret.confirm_input = function () {
        return { BUSINESSNAME: nameText.val() }
    }

    return ret;
})