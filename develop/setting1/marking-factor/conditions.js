/* 查询条件 */

define(function (require) {
    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var inSelect = require('inSelect');

    var selectEMedium = mselect();  // 能源介质下拉框
    var testSelect = inSelect();


    var ret = {};

    // 初始化
    ret.init = function () {

        selectEMedium.config({
            selector: '#search-name',
            selectAll: true
        });
        selectEMedium.init();

        dao.getEMediumSelectOptions(function (data) {
            selectEMedium.bindSource(data);
        })


        testSelect.init({ id: '#inSelect1', box: '#inSelect1Box', itemidField: '', itemnameField: '' });








    }


    ret.serialize = function () {
        return {
            EMEDIUMID: selectEMedium.selectedId || '',
        };
    }

    return ret;
})