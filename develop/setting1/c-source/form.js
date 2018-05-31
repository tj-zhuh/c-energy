
/* 表单 */

define(function (require) {

    var $ = require('jquery');
    var mselect = require('mselect');  // mselect：下拉框 模块
    var mtext = require('mtext');   // mtext：输入框 模块
    var mhidden = require('mhidden');  // mhidden：input hidden 模块
    var dao = require('dao');
    

    var mID = mhidden();  // 排放源Id （隐藏域）
    var mCode = mhidden(); //编码（隐藏域）
    var businessSelect = mselect();   // 行业 （下拉框）
    var nameText = mtext(); // 名称 （输入框）
    var diffSelect = mselect();// 类别类型下拉框
    var gbSelect = mselect();  // 排放源类别  （下拉框）  
    var znSelect = mselect();  // 排放源类别  （下拉框）  
    

    var ret = {};

    // 初始化
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

        //判断类别划分参数
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

    // 清空数据
    ret.clear = function () {
        mID.clear();
        mCode.clear();
        businessSelect.selectFirst();
        nameText.clear();
        diffSelect.val('');
        gbSelect.val('');
        znSelect.val('');
    }

    // 加载数据
    ret.load = function (record) {
        mID.val(record.EEMISSIONID);
        mCode.val(record.EMISSIONCODE);
        businessSelect.val(record.BUSINESSID);
        nameText.val(record.EMISSIONDESC);
        diffSelect.val(record.EMISSIONTYPESOURCEDIFF);
        gbSelect.val(record.EMISSIONTYPEID);
        znSelect.val(record.EMISSIONTYPEID); 
    }

    // 获得数据
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

    //返回输入框所得数据，以判断是否漏填
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