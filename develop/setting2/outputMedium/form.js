
/* �� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var mtext = require('mtext');   // mtext�������ģ��
    var dao = require('dao');


    var businessSelect = mselect();   // ��ҵ������
    var areaSelect = mselect();
    var enterpriseSelect = mselect();


    var ret = {};

    // ��ʼ��
    ret.init = function () {

        businessSelect.config({ selector: '#BUSINESSID' }).init();
        areaSelect.config({ selector: '#BUSINESSID' }).init();
        enterpriseSelect.config({ selector: '#BUSINESSID' }).init();


        dao.getBusinessOptions(function (data) {
            businessSelect.bindSource(data);
        })
        dao.getBusinessOptions(function (data) {
            areaSelect.bindSource(data);
        })
        dao.getBusinessOptions(function (data) {
            enterpriseSelect.bindSource(data);
        })
    }

    // �������
    ret.clear = function () {
        businessSelect.selectFirst();
        areaSelect.selectFirst();
        enterpriseSelect.selectFirst();


    }

    // ��������
    ret.load = function (record) {

        businessSelect.val(record.BUSINESSID);
        areaSelect.val(record.BUSINESSID);
        enterpriseSelect.val(record.BUSINESSID);

    }

    // �������
    ret.serialize = function () {

        return {
            BUSINESSID: businessSelect.val(),
            BUSINESSID: areaSelect.val(),
            BUSINESSID: enterpriseSelect.val(),

        };
    }

    return ret;
})