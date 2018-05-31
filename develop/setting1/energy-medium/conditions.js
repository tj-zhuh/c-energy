
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');       //mtext�������ģ��
    var dao = require('dao');
    var textName = mtext();       // �������������
    var selectCategory = mselect();   //��������ѡ��������


    var ret = {};

    // ��ʼ��
    ret.init = function () {

        textName.config({
            selector: '#search-name',
            selectAll: true
        });
        textName.init();

        selectCategory.config({
            selector: '#search-category',
            selectAll: true
        });
        selectCategory.init();

        dao.getCategoryOptions(function (data) {
            selectCategory.bindSource(data);
        });
    }

    ret.serialize = function () {
        return {
            EMTYPEID: selectCategory.selectedId || '',
            ENERGYDESC: textName.val() || ''        
        };
    }

    return ret;
})