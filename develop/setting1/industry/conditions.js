
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var mtext = require('mtext');
    var nametxt = mtext();

    var ret = {};

    // ��ʼ��
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