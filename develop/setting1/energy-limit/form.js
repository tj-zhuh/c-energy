
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect(); //��ҵ������
    var indexSelect = mselect();   // �޶�������
    var unitSelect = mselect();  // ��λ������
    var typeSelect = mselect();  // ����������
    var limitTypeSelect = mselect(); // �޶����������
    var limitMatNameSelect = mselect(); // ��Ŀ�����
    var limitValueText = mtext();  // �޶�ֵ�����
    var mID = mhidden();


    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#ELIMITID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        indexSelect.config({ selector: '#EINDEXID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        typeSelect.config({ selector: '#STANDARDTYPE' }).init();
        limitTypeSelect.config({ selector: '#LIMTTYPE' }).init();
        limitMatNameSelect.config({ selector: '#LIMITMATNAME' }).init();
        limitValueText.config({ selector: '#LIMITVALUE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getLimitTypeOptions(function (data) {
            limitTypeSelect.bindSource(data);
        })

        dao.getLimitMatNameOptions(function (data) {
            limitMatNameSelect.bindSource(data);
        })

        dao.getIndexOptions(function (data) {
            indexSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

        businessSelect.change(function () {

            var condition = { BUSINESSID: businessSelect.selectedId, ofs: 0, ps: 999999 }
            dao.getIndexOptions2(condition, function (data) {
                indexSelect.bindSource(data);
            })

        })
    }

    // �������
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        indexSelect.selectFirst();
        unitSelect.selectFirst();
        typeSelect.selectFirst();
        limitTypeSelect.selectFirst();
        limitMatNameSelect.selectFirst();
        limitValueText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.ELIMITID);
        businessSelect.val(record.BUSINESSID);
        indexSelect.val(record.EINDEXID);
        unitSelect.val(record.UNITID);
        typeSelect.val(record.STANDARDTYPE);
        limitTypeSelect.val(record.LIMTTYPE);
        limitMatNameSelect.val(record.LIMITMATNAME);
        limitValueText.val(record.LIMITVALUE);
    }

    // �������
    ret.serialize = function () {

        return {

            ELIMITID: mID.val(),
            BUSINESSID: businessSelect.val(),
            EINDEXID: indexSelect.val()||'',
            UNITID: unitSelect.val(),
            STANDARDTYPE: typeSelect.val() || '',
            LIMTTYPE: limitTypeSelect.val(),
            LIMITMATNAME: limitMatNameSelect.val(),
            LIMITVALUE: limitValueText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            LIMITVALUE: limitValueText.val(),

        }
    }

    return ret;
})