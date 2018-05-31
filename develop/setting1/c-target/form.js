
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden')

    var businessSelect = mselect();   // ��ҵ������
    var areaSelect = mselect();  // ����������
    var unitSelect = mselect(); //��λ
    var yearSelect = mselect(); //���
    var enterpriseSelect = mselect();  //��ҵ
    var typeSelect = mselect();  //��ҵ

    var _Desciption = mtext();  // ָ�����������
    var _Value = mtext();//ָ��ֵ
    var targetvalueID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        targetvalueID.config({ selector: '#TARGETVALUEID' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        areaSelect.config({ selector: '#PROVINCEID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        yearSelect.config({ selector: '#CHECKYEAR' }).init();
        enterpriseSelect.config({ selector: '#ENTERPRISEID' }).init();
        typeSelect.config({ selector: '#CTYPE' }).init();

        _Value.config({ selector: '#CTARGETVALUE' }).init();

        areaSelect.change(function () {
            var condition = { PROVINCEIDLIST: areaSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList(condition, function (data) {
                enterpriseSelect.bindSource(data)
            })
        })

        businessSelect.change(function () {
            var condition = { PROVINCEIDLIST: areaSelect.selectedId, BUSINESSIDLIST: businessSelect.selectedId }
            dao.getEnterpriseList(condition, function (data) {
                enterpriseSelect.bindSource(data)
            })
        })

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getAreaOptions(function (data) {
            areaSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getYearOptions(function (data) {
            yearSelect.bindSource(data);
        })

        dao.getEnterpriseOptions(function (data) {
            enterpriseSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {
        targetvalueID.clear();
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        unitSelect.selectFirst();
        yearSelect.selectFirst();
        enterpriseSelect.selectFirst();
        typeSelect.selectFirst();
        _Value.clear();
    }

    // ��������
    ret.load = function (record) {

        businessSelect.val(record.BUSINESSID);
        areaSelect.val(record.PROVINCEID);
        unitSelect.val(record.UNITID);
        yearSelect.val(record.CHECKYEAR);
        enterpriseSelect.val(record.ENTERPRISEID);
        typeSelect.val(record.CTYPE);

        targetvalueID.val(record.TARGETVALUEID)
        _Value.val(record.CTARGETVALUE);
    }

    // �������
    ret.serialize = function () {

        return {

            TARGETVALUEID: targetvalueID.val(),
            BUSINESSID: businessSelect.val(),
            PROVINCEID: areaSelect.val(),
            UNITID: unitSelect.val(),
            CHECKYEAR: yearSelect.val(),
            ENTERPRISEID: enterpriseSelect.val(),
            CTYPE: typeSelect.val(),

            CTARGETVALUE: _Value.val()
    };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            CTARGETVALUE: _Value.val()
        }
    }

    return ret;
})