
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // ��ҵ������
    var typeSelect = mselect();   // �������������
    var nameText = mtext(); // ���������
    var mID = mhidden();
    var mCode = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#MCATEGORYID' }).init();
        mCode.config({ selector: '#CATEGORYCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        typeSelect.config({ selector: '#CATEGORYTYPE' }).init();
        nameText.config({ selector: '#CATEGORYDESC' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

    }

    // �������
    ret.clear = function () {

        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        typeSelect.selectFirst();
        nameText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.MCATEGORYID);
        mCode.val(record.CATEGORYCODE);
        businessSelect.val(record.BUSINESSID);
        typeSelect.val(record.CATEGORYTYPE);
        nameText.val(record.CATEGORYDESC);
    }

    // �������
    ret.serialize = function () {

        return {

            MCATEGORYID:mID.val(),
            CATEGORYCODE: mCode.val(),
            BUSINESSID: businessSelect.val(),
            CATEGORYTYPE: typeSelect.val(),
            CATEGORYDESC: nameText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            CATEGORYDESC: nameText.val(),
        }
    }

    return ret;
})