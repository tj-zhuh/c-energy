
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mtext = require('mtext');   // mtext�������ģ��
    var mselect = require('mselect'); //mselectģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessId = mhidden();
    var nameText = mtext(); // ���������
    var codeText = mtext();  // ���������
    var optionsSelect = mselect();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        businessId.config({ selector: '#BUSINESSID' }).init();
        nameText.config({ selector: '#BUSINESSNAME' }).init();
        codeText.config({ selector: '#BUSINESSCODE' }).init();
        optionsSelect.config({ selector: '#ISCOLLECTED' }).init();

        dao.getOptions(function (data) {
            optionsSelect.bindSource(data);
        });

    }

    // �������
    ret.clear = function () {
        businessId.clear();
        nameText.clear();
        codeText.clear();
        optionsSelect.selectFirst();
    }

    // ��������
    ret.load = function (record) {

        businessId.val(record.BUSINESSID)
        nameText.val(record.BUSINESSNAME);
        codeText.val(record.BUSINESSCODE);
        optionsSelect.val(record.ISCOLLECTED);
    }

    // �������
    ret.serialize = function () {

        return {
            BUSINESSID:businessId.val(),
            BUSINESSNAME: nameText.val(),
            BUSINESSCODE: codeText.val(),
            ISCOLLECTED:  optionsSelect.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return { BUSINESSNAME: nameText.val() }
    }

    return ret;
})