
/* ��ѯ���� */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect��������ģ��
    var dao = require('dao');
    var selectBusiness = mselect(); //��ҵѡ��������
    var selectoutName = mselect();  // �ŷ�Դ����ѡ��������
    var selectCoefficient = mselect();//�ŷ�����

    var ret = {};

    //����ҵ���ŷ��������ƽ��й���
    //������ҵ��ȡ�ŷ����������б�
    function getName() {
        var condition = {
            BUSINESSID: selectBusiness.selectedId || '',
            ofs: 0,
            ps: 9999,
        };

        dao.getcoeffientOptions2(condition, function (data) {
            selectCoefficient.bindSource(data);
        })
    }

    //�¼�
    selectBusiness.change(function(){
        getName();
    });

    // ��ʼ��
    ret.init = function () {

        selectBusiness.config({
            selector: '#search-business',
            selectAll: true
        });
        selectBusiness.init();
        dao.getBusinessOptions(function (data) {
            selectBusiness.bindSource(data);
        })

        selectoutName.config({
            selector: '#search-name1',
            selectAll: true
        });
        selectoutName.init();
        dao.getout_SourceOptions(function (data) {
            selectoutName.bindSource(data);
        })

        selectCoefficient.config({
            selector: '#search-name2',
            selectAll: true
        });
        selectCoefficient.init();
        dao.getcoeffientOptions(function (data) {
            selectCoefficient.bindSource(data);
        })
    }

    ret.serialize = function () {
        return {
            BUSINESSID: selectBusiness.selectedId || '',
            EEMISSIONID: selectoutName.selectedId || '',
            EFACTORID: selectCoefficient.selectedId || '',
        };
    }

    return ret;
})