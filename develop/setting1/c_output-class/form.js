
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var mhidden = require('mhidden');  // mhidden��input hidden ģ��
    var dao = require('dao');

    var businessSelect = mselect();   // ��ҵ������
    var typeSelect = mselect();   // ��Դ������
    var nameText = mtext(); // ���������
    //var codeText = mtext();  // ���������
    var emissionId = mhidden();
    var typeCode = mhidden();

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        emissionId.config({ selector: '#EMISSIONTYPEID' }).init();
        typeCode.config({ selector: '#ETYPECODE' }).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        typeSelect.config({ selector: '#EMISSIONTYPESOURCE' }).init();
        nameText.config({ selector: '#EMISSIONTYPEDESC' }).init();

        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getTypeOptions(function (data) {
            typeSelect.bindSource(data);
        })

 
    }

    // �������
    ret.clear = function () {

        emissionId.clear()
        typeCode.clear();
        businessSelect.selectFirst();
        typeSelect.selectFirst();
        nameText.clear();
    }

    // ��������
    ret.load = function (record) {

        emissionId.val(record.EMISSIONTYPEID);
        typeCode.val(record.ETYPECODE);
        businessSelect.val(record.BUSINESSID);
        typeSelect.val(record.EMISSIONTYPESOURCE);
        nameText.val(record.EMISSIONTYPEDESC);
    }

    // �������
    ret.serialize = function () {

        return {
            EMISSIONTYPEID: emissionId.val(),
            ETYPECODE: typeCode.val(),
            BUSINESSID: businessSelect.val(),
            EMISSIONTYPESOURCE: typeSelect.val(),
            EMISSIONDESC: nameText.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            EMISSIONTYPEDESC: nameText.val(),
            //ETYPECODE: codeText.val()
        }
    }

    return ret;
})