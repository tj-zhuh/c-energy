/* �� */

define(function (require) {
    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');  // mhidden��input hidden ģ��

    var mediumSelect = mselect();
    var businessSelect = mselect();
    var sourceSelect = mselect();
    var factorValueText = mtext();
    var unitSelect = mselect();
    var factorGbText = mtext();
    var mID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {
        mediumSelect.config({ selector: '#EMEDIUMID' }).init();
        factorValueText.config({ selector: '#FACTORVALUE' }).init();
        factorGbText.config({ selector: '#FACTORGBCODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        sourceSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        mID.config({ selector: '#EFACTORID' }).init();


        dao.getEMediumSelectOptions(function (data) {
            mediumSelect.bindSource(data);
        })

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getSourceOptions(function (data) {
            sourceSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {
        mediumSelect.selectFirst();
        businessSelect.selectFirst();
        sourceSelect.selectFirst();
        unitSelect.selectFirst();
        factorValueText.clear();
        factorGbText.clear();
        mID.clear();
    }

    // ��������
    ret.load = function (record) {
        mediumSelect.val(record.EMEDIUMID);
        businessSelect.val(record.BUSINESSID);
        sourceSelect.val(record.EMISSIONTYPESOURCE);
        unitSelect.val(record.UNITID);
        factorValueText.val(record.FACTORVALUE);
        factorGbText.val(record.FACTORGBCODE);
        mID.val(record.EFACTORID);
    }

    // �������
    ret.serialize = function () {
        return {
            EMEDIUMID: mediumSelect.val(),
            BUSINESSID: businessSelect.val(),//
            EMISSIONTYPESOURCE: sourceSelect.val(),
            UNITID: unitSelect.val(),
            FACTORVALUE: factorValueText.val(),
            FACTORGBCODE: factorGbText.val(),
            EFACTORID: mID.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            FACTORGBCODE: factorGbText.val(),
            FACTORVALUE: factorValueText.val()
        }
    }

    return ret;
})