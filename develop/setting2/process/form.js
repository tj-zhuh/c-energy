
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // ��λ
    var nameText = mtext(); // �������������
    var codeText = mtext();  // ��ֵ���������
    var Ename = mtext();//  ��ҵ����
    var mID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#EMEDIUMID' }).init();
        businessSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#ENERGYCODE' }).init();
        codeText.config({ selector: '#DATAPRECISION' }).init();
        Ename.config({ selector: '#ENTERPRISENAME' }).init();

        dao.getUnitOptions(function (data) {
            businessSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        nameText.clear();
        codeText.clear();
        Ename.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.EMEDIUMID);
        businessSelect.val(record.UNITID);
        nameText.val(record.ENERGYCODE);
        codeText.val(record.DATAPRECISION);
        Ename.val(record.ENTERPRISENAME);
    }

    // �������
    ret.serialize = function () {

        return {

            EMEDIUMID:mID.val(),
            UNITID: businessSelect.val(),
            ENTERPRISENAME: Ename.val(),
            ENERGYCODE: nameText.val(),
            DATAPRECISION: codeText.val()
        };
    }

    return ret;
})