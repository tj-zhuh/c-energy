
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var nameText = mtext(); // ���������
    var codeText = mtext();  // ���������
    var categorySelect = mselect(); //��Դ����������
    var mID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#EMEDIUMID' }).init();
        categorySelect.config({ selector: '#EMTYPEID' }).init();
        nameText.config({ selector: '#ENERGYDESC' }).init();
        codeText.config({ selector: '#ENERGYCODE' }).init();

        dao.getCategoryOptions(function (data) {
            categorySelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {

        mID.clear();
        categorySelect.selectFirst();
        nameText.clear();
        codeText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.EMEDIUMID);
        categorySelect.val(record.EMTYPEID);
        nameText.val(record.ENERGYDESC);
        codeText.val(record.ENERGYCODE);
    }

    // �������
    ret.serialize = function () {

        return {

            EMEDIUMID: mID.val(),
            EMTYPEID: categorySelect.val(),
            ENERGYDESC: nameText.val(),
            ENERGYCODE: codeText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            ENERGYDESC: nameText.val(),
        }
    }

    return ret;
})