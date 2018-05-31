
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var selectBusiness = mselect();  // ��ҵѡ��������
    var selectUnit = mselect();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-name',
            selectAll: true
        });
        selectBusiness.init();

        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
        };
    }

    return ret;
})