
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect(); //��ҵ������
    var provinceSelect = mselect();     //����������
    var yearSelect = mselect();   // ���������
    var unitSelect = mselect();  // ��λ������
    var nameText = mselect(); // ��������
    var codeText = mtext();  // ָ��ֵ�����
    var mID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#ESAVINGINDEXID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        provinceSelect.config({ selector: '#PROVINCEID' }).init();
        yearSelect.config({ selector: '#ENERGYYEAR' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        nameText.config({ selector: '#ENTERPRISEID' }).init();
        codeText.config({ selector: '#SAVINGVALUE' }).init();

        provinceSelect.change(function () {
            var condition = { PROVINCEIDLIST: provinceSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId||'' }
            dao.getEnterpriseList2(condition, function (data) {
                nameText.bindSource(data)
            })
        })

        businessSelect.change(function () {
            var condition = { PROVINCEIDLIST: provinceSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList2(condition, function (data) {
                nameText.bindSource(data)
            })
        })



        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getProvinceOptions(function (data) {
            provinceSelect.bindSource(data);
        })

        dao.getYearOptions(function (data) {
            yearSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getEnterpriseOptions(function (data) {
            nameText.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {

        mID.clear();
        businessSelect.selectFirst();
        provinceSelect.selectFirst();
        yearSelect.selectFirst();
        unitSelect.selectFirst();
        nameText.selectFirst();
        codeText.clear();
    }

    // ��������
    ret.load = function (record) {

        mID.val(record.ESAVINGINDEXID);
        businessSelect.val(record.BUSINESSID);
        provinceSelect.val(record.PROVINCEID);
        yearSelect.val(record.ENERGYYEAR);
        unitSelect.val(record.UNITID);
        nameText.val(record.ENTERPRISEID);
        codeText.val(record.SAVINGVALUE);
    }

    // �������
    ret.serialize = function () {

        return {

            ESAVINGINDEXID: mID.val(),
            BUSINESSID: businessSelect.val(),
            PROVINCEID: provinceSelect.val(),
            ENERGYYEAR: yearSelect.val(),
            UNITID: unitSelect.val(),
            ENTERPRISEID: nameText.val(),
            SAVINGVALUE: codeText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            SAVINGVALUE: codeText.val()
        }
    }

    return ret;
})