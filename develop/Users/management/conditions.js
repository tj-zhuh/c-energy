/* ��ѯ����ģ�� */

define(function (require) {

    var $ = require('jquery');
    //dao.js: ���ݴ���ģ�飬�������̨ͨ�Ż���չʾ��������
    var dao = require('dao');
    //mtext: �ı���ģ��
    var mtext = require('mtext');

    //���巵��ֵ
    var ret = {};

    //����ʵ��
    var textUserName = mtext();

    // ��ʼ��
    ret.init = function () {

        //�ı������ģ���ʼ��
        textUserName.config({
            selector: '#search-name',
            selectAll: true,
        });
        textUserName.init();
    };

    //������������
    ret.serialize = function () {
        return {
            //�ı��򷵻�����
            UserName: textUserName.val() || '',
        };
    };
    return ret;
})