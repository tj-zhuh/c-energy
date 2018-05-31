/* ��ģ�� */

define(function (require) {

    var $ = require('jquery');
    var dao = require('dao');
    var mtext = require('mtext');
    var mselect = require('mselect');
    var grid=require('grid');


    //���巵��ֵ
    var ret = {};

    //����ʵ��
    var textUserName = mtext();
    var selectRole = mselect();

    // ��ʼ��
    ret.init = function () {

        textUserName.config({
            selector: '#USERNAME',
            selectAll: false,
        });
        textUserName.init();

        selectRole.config({
            selector: '#ROLECODE',
            selectAll: false,
        });
        selectRole.init();
        dao.getRoleOptions(function (data) {
            selectRole.bindSource(data);
        });
    }

    // �������
    ret.clear = function () {
        textUserName.clear();

        selectRole.selectFirst();
    }

    // ��������
    ret.load = function (record) {
        textUserName.val(record.USERNAME);

        selectRole.val(record.ROLECODE);
    }

    //������������
    ret.serialize = function () {
        return {

            USERID: grid.UserId || '',

            USERNAME: textUserName.val() || '',
            //��ѡ�����򷵻�����
            ROLECODE: selectRole.selectedId || '',
        };
    }

    //�����������������,ȷ��������Ҫ���Ŀ�������
    //�˴���hiddenUserIdֵ������������
    ret.confirmInputAll = function () {
        return {
            //�ı��򷵻�����
            USERNAME: textUserName.val() || '',

            //��ѡ�����򷵻�����
            ROLECODE: selectRole.selectedId || '',
            //�� SELECTINPUT: selectRole.val(),
        };
    }
    return ret;
})