
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');
    var mhidden = require('mhidden');

    var businessSelect = mselect();   // ��ҵ������
    var areaSelect = mselect();   // �������������
    var sourceSelect = mselect();  // �ŷ�Դ����������
    var unitSelect = mselect();  // ��λ��������
    var coefficientSelect = mselect();//�ŷ�����������
    var valueText = mtext(); // ����ֵ�����
    var typeSourceSelect = mselect();//��Դ������
    var versionText = mtext();      //�汾�����
    var factorconID = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        factorconID.config({ selector: '#FACTORCONID' }).init();
        areaSelect.config({ selector: '#ZONETYPE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        sourceSelect.config({ selector: '#EEMISSIONID' }).init();
        unitSelect.config({ selector: '#UNITID' }).init();
        coefficientSelect.config({ selector: '#EFACTORID' }).init();
        valueText.config({ selector: '#FACTORVALUE' }).init();
        typeSourceSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        versionText.config({ selector: '#GBCODE' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        businessSelect.change(function () {
            var condition = { BUSINESSID: businessSelect.selectedId,ofs:0,ps:9999}
            dao.getcoeffientOptions2(condition, function (data) {
                coefficientSelect.bindSource(data)
            })
        })

        dao.getAreaOptions(function (data) {
            areaSelect.bindSource(data);
        })

        dao.getTypeSourceOptions(function (data) {
            typeSourceSelect.bindSource(data);
        })

        dao.getUnitOptions(function (data) {
            unitSelect.bindSource(data);
        })

        dao.getout_SourceOptions(function (data) {
            sourceSelect.bindSource(data);
        })

        dao.getcoeffientOptions(function (data) {
            coefficientSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        sourceSelect.selectFirst();
        unitSelect.selectFirst();
        coefficientSelect.selectFirst();
        valueText.clear();
        typeSourceSelect.selectFirst();
        versionText.val('V1.0');
        factorconID.clear();
    }

    // ��������
    ret.load = function (record) {

        factorconID.val(record.FACTORCONID);
        areaSelect.val(record.ZONETYPE);
        businessSelect.val(record.BUSINESSID);
        sourceSelect.val(record.EEMISSIONID);
        coefficientSelect.val(record.EFACTORID);
        valueText.val(record.FACTORVALUE);
        unitSelect.val(record.UNITID);
        typeSourceSelect.val(record.EMISSIONTYPESOURCE);
        versionText.val(record.GBCODE);

    }

    // �������
    ret.serialize = function () {

        return {

            FACTORCONID: factorconID.val(),
            ZONETYPE: areaSelect.val(),
            BUSINESSID: businessSelect.val(),
            EEMISSIONID: sourceSelect.val(),
            EFACTORID: coefficientSelect.val(),
            FACTORVALUE: valueText.val(),
            UNITID: unitSelect.val(),
            EMISSIONTYPESOURCE: typeSourceSelect.val(),
            GBCODE: versionText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            FACTORVALUE: valueText.val(),

        }
    }

    return ret;
})