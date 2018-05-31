
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var selectBusiness = mselect();  // ��ҵѡ��������
    var selectLimitType = mselect();  //�޶�����������

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-name1',
            selectAll: true
        });
        selectBusiness.init();
        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })



        selectLimitType.config({
            selector: '#search-name2',
            selectAll: true
        });
        selectLimitType.init();
        dao.getLimitTypeOptions(function (data) {
            selectLimitType.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            LIMTTYPE: selectLimitType.selectedId || '',

        };
    }

    return ret;
})