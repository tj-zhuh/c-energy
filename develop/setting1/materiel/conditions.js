
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var selectBusiness = mselect();  // ��ҵѡ��������
    var selectMcategory = mselect(); //�����������

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


        selectMcategory.config({
            selector: '#search-name2',
            selectAll: true
        });
        selectMcategory.init();
        dao.getMcategoryOptions(function (data) {
            selectMcategory.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            MCATEGORYID: selectMcategory.selectedId || ''
        };
    }

    return ret;
})