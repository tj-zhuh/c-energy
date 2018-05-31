
/* 查询条件 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框模块
    var dao = require('dao');
    var selectBusiness = mselect(); //行业选择下拉框
    var selectoutName = mselect();  // 排放源名称选择下拉框
    var selectCoefficient = mselect();//排放因子

    var ret = {};

    //将行业和排放因子名称进行关联
    //根据行业获取排放因子名称列表
    function getName() {
        var condition = {
            BUSINESSID: selectBusiness.selectedId || '',
            ofs: 0,
            ps: 9999,
        };

        dao.getcoeffientOptions2(condition, function (data) {
            selectCoefficient.bindSource(data);
        })
    }

    //事件
    selectBusiness.change(function(){
        getName();
    });

    // 初始化
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-business',
            selectAll: true
        });
        selectBusiness.init();
        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })

        selectoutName.config({
            selector: '#search-name1',
            selectAll: true
        });
        selectoutName.init();
        dao.getout_SourceOptions(function (data) {
            selectoutName.bindSource(data);
        })

        selectCoefficient.config({
            selector: '#search-name2',
            selectAll: true
        });
        selectCoefficient.init();
        dao.getcoeffientOptions(function (data) {
            selectCoefficient.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            EEMISSIONID: selectoutName.selectedId || '',
            EFACTORID: selectCoefficient.selectedId || '',
        };
    }

    return ret;
})