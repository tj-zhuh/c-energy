
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect�������� ģ��
    var mtext = require('mtext');   // mtext������� ģ��
    var mhidden = require('mhidden');  // mhidden��input hidden ģ��
    var dao = require('dao');
    

    var mID = mhidden();  // �ŷ�ԴId ��������
    var mCode = mhidden(); //���루������
    var businessSelect = mselect();   // ��ҵ ��������
    var nameText = mtext(); // ���� �������
    var diffSelect = mselect();// �������������
    var gbSelect = mselect();  // �ŷ�Դ���  ��������  
    var znSelect = mselect();  // �ŷ�Դ���  ��������  
    

    var ret = {};

    // ��ʼ��
    ret.init = function () {

        mID.config({ selector: '#EEMISSIONID' }).init();
        mCode.config({selector:'#EMISSIONCODE'}).init();
        businessSelect.config({ selector: '#BUSINESSID' }).init();
        nameText.config({ selector: '#EMISSIONDESC' }).init();
        diffSelect.config({ selector: '#EMISSIONTYPESOURCEDIFF' }).init();
        gbSelect.config({ selector: '#EMISSIONTYPEIDGB' }).init();
        znSelect.config({ selector: '#EMISSIONTYPEIDZN' }).init();
      
        dao.getIndustryOptions(function (data) {
            businessSelect.bindSource(data);
        })

        dao.getDiffOptions(function (data) {
            diffSelect.bindSource(data);
        })

        dao.getGbOptions(function (data) {
            gbSelect.bindSource(data);
        })


        dao.getZnOptions(function (data) {
            znSelect.bindSource(data);
        })

        $('#EMISSIONTYPEIDGB').attr('disabled', 'disabled').css('background', '#cdcdcd');
        $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');

        //�ж���𻮷ֲ���
        $('#EMISSIONTYPESOURCEDIFF').change(function () {
            switch(diffSelect.val()) {
                case '1': $('#EMISSIONTYPEIDGB').removeAttr('disabled').css('background', '#ffffff');
                    $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');
                    dao.getGbOptions(function (data) {
                        gbSelect.bindSource(data);
                    });
                    break;
                case '2': $('#EMISSIONTYPEIDZN').removeAttr('disabled').css('background', '#ffffff');
                    $('#EMISSIONTYPEIDGB').attr('disabled', 'disabled').css('background', '#cdcdcd');
                    break;
                case '3': $('#EMISSIONTYPEIDGB').removeAttr('disabled').css('background', '#ffffff');
                    $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');
                    dao.getCmOptions(function (data) {
                        gbSelect.bindSource(data);
                    })
                    break;
                case '4': $('#EMISSIONTYPEIDGB').removeAttr('disabled').css('background', '#ffffff');
                    $('#EMISSIONTYPEIDZN').removeAttr('disabled').css('background', '#ffffff');
                    dao.getGbOptions(function (data) {
                        gbSelect.bindSource(data);
                    })
                    break;
                default: $('#EMISSIONTYPEIDGB').attr('disabled', 'disabled').css('background', '#cdcdcd');
                    $('#EMISSIONTYPEIDZN').attr('disabled', 'disabled').css('background', '#cdcdcd');
            }
        })
    }

    // �������
    ret.clear = function () {
        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        nameText.clear();
        diffSelect.val('');
        gbSelect.val('');
        znSelect.val('');
    }

    // ��������
    ret.load = function (record) {
        mID.val(record.EEMISSIONID);
        mCode.val(record.EMISSIONCODE);
        businessSelect.val(record.BUSINESSID);
        nameText.val(record.EMISSIONDESC);
        diffSelect.val(record.EMISSIONTYPESOURCEDIFF);
        gbSelect.val(record.EMISSIONTYPEID);
        znSelect.val(record.EMISSIONTYPEID); 
    }

    // �������
    ret.serialize = function () {

        switch (diffSelect.val()) {
            case '1': znSelect.val('');
                break;
            case '2': gbSelect.val('');
                break;
            case '3': $('#EMISSIONTYPEIDGB').change(function () {
                znSelect.val(gbSelect.val());
            })
                break;
            case '4':
                break;
        }

        return {
            EEMISSIONID: mID.val(),
            BUSINESSID: businessSelect.val(),
            EMISSIONCODE: mCode.val(),
            EMISSIONDESC: nameText.val(),
            EMISSIONTYPEIDGB: gbSelect.val(),
            EMISSIONTYPEIDZN: znSelect.val(),
            EMISSIONTYPESOURCEDIFF: diffSelect.val()
        };
    }

    //����������������ݣ����ж��Ƿ�©��
    ret.confirm_input = function () {
        return {
            EMISSIONDESC: nameText.val(),
            EMISSIONTYPESOURCEDIFF: diffSelect.val(),
            EMISSIONTYPEIDGB: gbSelect.val(),
            EMISSIONTYPEIDZN: znSelect.val()
        }
    }
    return ret;
})