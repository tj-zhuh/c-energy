
/* ��ѯ���� */


/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var monthbox = require('monthbox');

    var selectArea = mselect();  // ����ѡ��������
    var selectBusiness = mselect();  // ��ҵѡ��������
    var selectEnterprise = mselect();  // ��ҵѡ��������
    var mbegin = monthbox();
    var mend = monthbox();

    var ret = {};
    ret.areaId = null;
    ret.businessId = null;
    ret.enterpriseId = null;

    function getEnterPrises() {
        var Econdition = { PROVINCEID: ret.areaId || '', BUSINESSID: ret.businessId || '', }
        dao.getEnterpriseData(Econdition, function (data) {
            selectEnterprise.bindSource(data);
        })
    }
    // ��ʼ��
    ret.init = function (bubble) {

        //����
        selectArea.config({
            selector: '#areaSelect',
            selectAll: true
        });
        selectArea.init();

        dao.getAreaData(function (data) {
            selectArea.bindSource(data);
        })

        selectArea.change(function () {
            ret.areaId = selectArea.selectedId;
            getEnterPrises();

        })

        //��ҵ
        selectBusiness.config({
            selector: '#businessSelect',
            selectAll: true
        });
        selectBusiness.init();

        dao.getBusinessData(function (data) {
            selectBusiness.bindSource(data);
        })

        selectBusiness.change(function () {
            ret.businessId = selectBusiness.selectedId;
            getEnterPrises();
        })

        //��ҵ
        selectEnterprise.config({
            selector: '#enterpriseSelect',
            selectAll: true
        });
        selectEnterprise.init();
        getEnterPrises();
        selectEnterprise.change(function () {
            ret.enterpriseId = selectEnterprise.selectedId;
        })


        // ��ʼ�·ݿ�
        mbegin.config({
            textSelector: '#beginSequence',    // �ı����ѡ����
            boxSelector: '#beginSequenceBox',   // ����ʱ���ִ����ѡ����
            minYear: '2013', // ��С����
            minMonth: '5', // ��С����
            maxYear: '2018', // ������
            maxMonth: '11', // ������
            defYear: '2016', // Ĭ�ϵ���
            defMonth: '12' // Ĭ�ϵ���
        })
        mbegin.init();
        bubble.addEventHandler(function () { mbegin.hide(); }) // ���body����¼�������
        bubble.addEventHandler(function () { mend.hide(); }) // ����ı���ʱ������body����¼�

        // �����·ݿ�
        mend.config({
            textSelector: '#endSequence',    // �ı����ѡ����
            boxSelector: '#endSequenceBox',   // ����ʱ���ִ����ѡ����
            minYear: '2013', // ��С����
            minMonth: '5', // ��С����
            maxYear: '2018', // ������
            maxMonth: '11', // ������
            defYear: '2016', // Ĭ�ϵ���
            defMonth: '12' // Ĭ�ϵ���
        })
        mend.init();
        mbegin.beforeTextClick(function () { bubble.invoke(); })
        mend.beforeTextClick(function () { bubble.invoke(); })

    }


    ret.serialize = function () {
        return {
            PROVINCEID: ret.areaId || '',
            BUSINESSID: ret.businessId || '',
            ENTERPRISEID: ret.enterpriseId || '',
            //CHECKDATEBEGIN: mbegin.year + returnmonth(mbegin.month),
            //CHECKDATEEND: mend.year + returnmonth(mend.month)
        };
    }


    function returnmonth(x) {
        if (x.length == 1) {
            return (0 + x).toString();
        }
        else { return x }
    }

    return ret;
})