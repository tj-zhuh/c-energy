
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var mtext=require('mtext')

    var Qcondition = mtext();  // ��ҵѡ��������


    var ret = {};

    // ��ʼ��
    ret.init = function () {

        Qcondition.config({
            selector: '#search-name',
            selectAll: true
        });
        Qcondition.init();

  
    }

    ret.serialize = function () {
        return { EMISSIONTYPEDESC: Qcondition.val() || '' };
    }

    return ret;
})