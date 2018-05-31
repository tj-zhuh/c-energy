
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // ��ҵ������
    var unitSelect = mselect();  // ��λ������
    var flagSelect = mselect();  // �ж�������
    var nameText = mtext(); // ���������
    var mID = mhidden();
    var mCode = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#EINDEXID' }).init();
        mCode.config({ selector: '#INDEXCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        flagSelect.config({ selector: '#INDEXFLAG' }).init();
        nameText.config({ selector: '#INDEXNAME' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getFlagOptions(function (data) {
            flagSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {

        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        unitSelect.selectFirst();
        flagSelect.selectFirst();
        nameText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.EINDEXID);
        mCode.val(record.INDEXCODE);
        businessSelect.val(record.BUSINESSID);
        unitSelect.val(record.UNITID);
        flagSelect.val(record.INDEXFLAG);
        nameText.val(record.INDEXNAME);
    }

    // �������
    ret.serialize = function () {

        return {

            EINDEXID: mID.val()||'',
            INDEXCODE: mCode.val() || '',
            BUSINESSID: businessSelect.val(),
            UNITID: unitSelect.val(),
            INDEXNAME: nameText.val(),
            INDEXFLAG: flagSelect.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            INDEXNAME: nameText.val(),
        }
    }

    return ret;
})