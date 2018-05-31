
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // ��ҵ������
    var unitSelect = mselect();  // ��λ������
    var nameText = mtext(); // ���������
    var codeText = mtext();  // ���������
    var mID = mhidden();
    var McategorySelect = mselect();


    var ret = {};

    // ��ʼ��
    ret.init = function () {


        mID.config({ selector: '#BMATERIALID' }).init();
        McategorySelect.config({ selector: '#MCATEGORYID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#MATERIALDESC' }).init();
        codeText.config({ selector: '#MATERIALCODE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getMcategoryOptions(function (data) {
            McategorySelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {
        mID.clear();
        McategorySelect.selectFirst();
        businessSelect.selectFirst();
        unitSelect.selectFirst();
        nameText.clear();
        codeText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.BMATERIALID)
        McategorySelect.val(record.MCATEGORYID);
        businessSelect.val(record.BUSINESSID);
        unitSelect.val(record.UNITID);
        nameText.val(record.MATERIALDESC);
        codeText.val(record.MATERIALCODE);
    }

    // �������
    ret.serialize = function () {

        return {

            BMATERIALID: mID.val(),
            MCATEGORYID:McategorySelect.val(),
            BUSINESSID: businessSelect.val(),
            UNITID: unitSelect.val(),
            MATERIALDESC: nameText.val(),
            MATERIALCODE: codeText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            MATERIALDESC: nameText.val(),
        }
    }

    return ret;
})