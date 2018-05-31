
/* 变量表单 */

define(function (require) {

    var $ = require('jquery');
    var Ext = require('ext');
    var mselect = require('mselect');  // mselect：下拉框 模块
    var mtext = require('mtext');   // mtext：输入框 模块
    var mhidden = require('mhidden');  // mhidden：input hidden 模块
    var dao = require('dao');
    var editor2 = require('editor2')      //变量过滤条件模块
    var editor3 = require('editor3')      //变量关联条件模块


    var for_cell_id = mhidden();
    var for_cell_code = mhidden();
    var logic_id = mhidden();
    var relation_id = mhidden();  // 被关联变量ID
    var cell_name = mtext();  // 变量名  （输入框）
    var cell_desc = mtext(); // 变量描述 （输入框）
    var bussiness_name = mselect();
    var var_type = mselect();
    var var_attr = mselect();
    var datasource_desc = mselect();
    var datasource_name = mtext();
    var datasource_field_desc = mselect();
    var datasource_field_name = mtext();
    var logic_name = mselect();
    var logic_field = mtext();
    var logic_symbol = mselect();
    var logic_field_value = mtext();
    var relation_name1 = mselect();
    var relation_field1 = mtext();
    var relation_var = mselect();
    //var relation_name2 = mselect();
    var relation_field2 = mtext();

    var ret = {};

    // 过滤条件数据源
    ret.logicDSID = [];
    ret.logicDSText = [];
    ret.logicDSField = [];

    // 过滤条件数据源值列
    ret.logicDSValue = [];
    ret.logicDSValueText = [];
    ret.logicDSValueField = [];

    // 过滤条件条件
    ret.logic = [];
    ret.logicText = [];  //文字
    ret.logicField = [];

    // 关联条件自身可选
    ret.join = [];
    ret.joinText = [];
    ret.joinField = [];

    //数据源选择字段
    ret.logicSelect = [];
    ret.logicSelectText = [];
    ret.logicSelectField = [];

    // 关联变量
    ret.joinVar = [];
    ret.joinVarID = [];

    // 关联变量可选列
    //ret.joinOther = [];
    //ret.joinOtherText = [];
    //ret.joinOtherField = [];


    // 初始化
    ret.init = function () {

        for_cell_id.config({ selector: '#for_cell_id' }).init();
        for_cell_code.config({ selector: '#for_cell_code' }).init();
        logic_id.config({ selector: '#logic_id' }).init();
        relation_id.config({ selector: '#relation_id' }).init();

        cell_name.config({ selector: '#cell_name' }).init();
        cell_desc.config({ selector: '#cell_desc' }).init();
        bussiness_name.config({ selector: '#bussiness_name' }).init();
        var_type.config({ selector: '#var_type' }).init();
        var_attr.config({ selector: '#var_attr' }).init();

        datasource_desc.config({ selector: '#datasource_desc', changeTrigger: true }).init();
        datasource_name.config({ selector: '#datasource_name' }).init();

        datasource_field_desc.config({ selector: '#datasource_field_desc', autoSelectFirst: true }).init();
        datasource_field_name.config({ selector: '#datasource_field_name' }).init();

        logic_name.config({ selector: '#logic_name', autoSelectFirst: true }).init();
        logic_field.config({ selector: '#logic_field' }).init();
        logic_symbol.config({ selector: '#logic_symbol' }).init();
        logic_field_value.config({ selector: '#logic_field_value' }).init();

        relation_name1.config({ selector: '#relation_name1' }).init();
        relation_field1.config({ selector: '#relation_field1' }).init();
        relation_var.config({ selector: '#relation_var', autoSelectFirst: true }).init();
        //relation_name2.config({ selector: '#relation_name2' }).init();
        relation_field2.config({ selector: '#relation_field2' }).init();

        bussiness_name.change(function () {
            ret.clearpart();
            ret.getLogic(getCondition().condition, getCondition().formcondition);
        })

        var_type.change(function () {
            ret.clearpart();
            ret.getLogic(getCondition().condition, getCondition().formcondition);
        })

        var_attr.change(function () {
            ret.clearpart();
            ret.getLogic(getCondition().condition, getCondition().formcondition);
        })


        datasource_desc.change(function () {
            
            if (typeof datasource_desc.selectedId != 'string' || datasource_desc.selectedId == '') return;

            var index = datasource_desc.selectedId - 1;
            datasource_name.val(ret.logicDSField[index].itemName);
            logic_id.val(ret.logicDSID[index].itemName);

            var t = [];
            t = ret.logicDSValueText[index].itemName.split('|');
            var tt = [];
            for (var i = 0; i < t.length; i++) {
                tt.push({ itemId: i + 1, itemName: t[i] });
            }
            datasource_field_desc.bindSource(tt);
            ret.logicDSValue = ret.logicDSValueField[index].itemName.split('|');

            var t1 = [];
            t1 = ret.logicText[index].itemName.split('|');
            var tt1 = [];
            for (var i = 0; i < t1.length; i++) {
                tt1.push({ itemId: i + 1, itemName: t1[i] });
            }
            logic_name.bindSource(tt1);
            ret.logic = ret.logicField[index].itemName.split('|');

            var t2 = [];
            t2 = ret.joinText[index].itemName.split('|');
            var tt2 = [];
            for (var i = 0; i < t2.length; i++) {
                tt2.push({ itemId: i + 1, itemName: t2[i] });
            }
            relation_name1.bindSource(tt2);
            ret.join = ret.joinField[index].itemName.split('|');

            //获取select SQL 字段列表
            var t3 = [];
            t3 = ret.logicSelectText[index].itemName.split('|');  //暂时无用
            ret.logicSelect = ret.logicSelectField[index].itemName.split('|');
        })

        datasource_field_desc.change(function () {
            var index = datasource_field_desc.selectedId - 1;
            datasource_field_name.val(ret.logicDSValue[index]);
        })

        logic_name.change(function () {
            var index = logic_name.selectedId - 1;
            logic_field.val(ret.logic[index]);
        })

        relation_name1.change(function () {
            var index = relation_name1.selectedId - 1;
            relation_field1.val(ret.join[index]);
            relation_field2.val(ret.join[index]);  // 认为两个关联的字段应该同名
        })

        relation_var.change(function () {
            var index = relation_var.selectedId - 1;
            relation_id.val(ret.joinVarID[index]);
        })
    }

    ret.initSelect = function () {

        //行业
        dao.queryBusiness({}, function (data) {
            bussiness_name.bindSource(data);
        });

        dao.queryAttribute({}, function (data) {
            var_attr.bindSource(data);
        });

        dao.queryCategory({}, function (data) {
            var_type.bindSource(data);
        });
    }

    //获取符合condition的所有过滤条件
    ret.getLogic = function (condition1, condition2) {

        dao.queryContent(condition1, function (data) {

            ret.cleararray();

            //清看板 
            $('.editor_text_logic span').html('');
            $('.editor_text_logicfield span').html('');
            $('.editor_text_relation span').html('');
            $('.editor_text_relationfield span').html('');

            for (var i = 0; i < data.length; i++) {
                ret.logicDSID.push({ itemId: i + 1, itemName: data[i].LOGICID });
                ret.logicDSText.push({ itemId: i + 1, itemName: data[i].SOURCEDESC });
                ret.logicDSField.push({ itemId: i + 1, itemName: data[i].SOURCENAME });

                ret.logicDSValueText.push({ itemId: i + 1, itemName: data[i].FIELDSDESC });
                ret.logicDSValueField.push({ itemId: i + 1, itemName: data[i].FIELDSNAME });

                ret.logicText.push({ itemId: i + 1, itemName: data[i].FIELDSLOGICDESC });
                ret.logicField.push({ itemId: i + 1, itemName: data[i].FIELDSLOGICNAME });

                ret.joinText.push({ itemId: i + 1, itemName: data[i].FIELDSJOINDESC });
                ret.joinField.push({ itemId: i + 1, itemName: data[i].FIELDSJOINNAME });

                ret.logicSelectText.push({ itemId: i + 1, itemName: data[i].FIELDSSELECTDESC });
                ret.logicSelectField.push({ itemId: i + 1, itemName: data[i].FIELDSSELECTNAME });
            }
            datasource_desc.bindSource(ret.logicDSText);
        });

        dao.queryJoinVar(condition2, function (data) {
            for (var i = 0; i < data.length; i++) {
                ret.joinVar.push({ itemId: i + 1, itemName: data[i].CELLNAME });
                ret.joinVarID.push(data[i].FORCELLID);
            }
            relation_var.bindSource(ret.joinVar);
        });
    }

    // 清空所有数据
    ret.clear = function () {
        for_cell_id.clear();
        for_cell_code.clear();
        logic_id.clear();
        cell_name.clear();
        cell_desc.clear();
        bussiness_name.val('');
        var_type.val('');
        var_attr.val('');

        ret.clearpart();
    }

    // 清空部分数据
    ret.clearpart = function () {
        relation_id.clear();
        datasource_desc.val('');
        datasource_name.clear();
        datasource_field_desc.val('');
        datasource_field_name.clear();
        logic_name.val('');
        logic_field.clear();
        logic_symbol.val('');
        logic_field_value.clear();
        relation_name1.val('');
        relation_field1.clear();
        relation_var.val('');
        relation_field2.clear();
        $('.editor_text_logic span').html('');
        $('.editor_text_logicfield span').html('');
        $('.editor_text_relation span').html('');
        $('.editor_text_relationfield span').html('');
    }

    // 清空数组
    ret.cleararray = function () {

        // 过滤条件数据源
        ret.logicDSID = [];
        ret.logicDSText = [];
        ret.logicDSField = [];

        // 过滤条件数据源值列
        ret.logicDSValue = [];  //分解后
        ret.logicDSValueText = [];
        ret.logicDSValueField = [];

        // 过滤条件条件
        ret.logic = []; //分解后
        ret.logicText = [];  //文字
        ret.logicField = [];

        // 关联条件自身可选
        ret.join = []; //分解后
        ret.joinText = [];
        ret.joinField = [];

        //数据源选择字段
        ret.logicSelectSQL = null;
        ret.logicSelect = []; //分解后数据库字段
        ret.logicSelectText = [];
        ret.logicSelectField = [];

        // 关联变量
        ret.joinVar = [];
        ret.joinVarID = [];

        // 关联变量可选列
        //ret.joinOther = [];
        //ret.joinOtherText = [];
        //ret.joinOtherField = [];
    }
    // 加载数据
    ret.load = function (record) {
        for_cell_id.val((typeof (record.FORCELLID) == "undefied" || !record.FORCELLID) ? '' : record.FORCELLID);
        for_cell_code.val((typeof (record.CELLCODE) == "undefied" || !record.CELLCODE) ? '' : record.CELLCODE);
        cell_name.val((typeof (record.CELLNAME) == "undefied" || !record.CELLNAME) ? '' : record.CELLNAME);
        cell_desc.val((typeof (record.CELLDESC) == "undefied" || !record.CELLDESC || record.CELLDESC == null) ? '' : record.CELLDESC);
        bussiness_name.val((typeof (record.BUSINESSID) == "undefied" || !record.BUSINESSID) ? '' : record.BUSINESSID);
        var_type.val((typeof (record.COMPUTETYPE) == "undefied" || !record.COMPUTETYPE) ? '' : record.COMPUTETYPE);
        var_attr.val((typeof (record.CELLSOURCE) == "undefied" || !record.CELLSOURCE) ? '' : record.CELLSOURCE);
        logic_id.val((typeof (record.LOGICID) == "undefied" || !record.LOGICID || record.LOGICID == null) ? '' : record.LOGICID);
        relation_id.val((typeof (record.JOINCELLID) == "undefied" || !record.JOINCELLID || record.JOINCELLID == null) ? '' : record.JOINCELLID);
        //datasource_desc.val((typeof (record.SOURCEDESC) == "undefied" || !record.SOURCEDESC || record.SOURCEDESC == null) ? '' : record.SOURCEDESC);
        //datasource_desc.val(typeof (record.SOURCEDESC) === "string" ? record.SOURCEDESC : '');
        //console.log(datasource_desc.selectedId);
        //console.log('datasource_desc.val');
        var ind;
        for (var i = 0; i < datasource_desc.length; i++) {
            if (record.SOURCEDESC == datasource_desc[i].itemName) {
                ind = i;
                break;
            }
        }
        datasource_desc.val((i + 1).toString());
        //datasource_desc.selectedId = i + 1;
        //datasource_desc.val(datasource_desc.selectedId);
        datasource_name.val((typeof (record.SOURCENAME) == "undefied" || !record.SOURCENAME || record.SOURCENAME == null) ? '' : record.SOURCENAME);
        //getlogicfields(record);

        //datasource_field_desc.val((typeof (record.FIELDSDESC) == "undefied" || !record.FIELDSDESC || record.FIELDSDESC == null) ? '' : record.FIELDSDESC);
        datasource_field_name.val((typeof (record.FIELDSNAME) == "undefied" || !record.FIELDSNAME || record.FIELDSNAME == null) ? '' : record.FIELDSNAME);

        relation_id.val((typeof (record.JOINCELLID) == "undefied" || !record.JOINCELLID || record.JOINCELLID == null) ? '' : record.JOINCELLID)
        relation_var.val((typeof (record.JOINDESC) == "undefied" || !record.JOINDESC || record.JOINDESC == null) ? '' : record.JOINDESC);
        console.log(record);
        console.log('for_cell_id:' + for_cell_id.val());
        console.log('for_cell_code:' + for_cell_code.val());
        console.log('cell_name:' + cell_name.val());
        console.log('bussiness_name:' + bussiness_name.val());
        console.log('var_type:' + var_type.val());
        console.log('var_attr:' + var_attr.val());
        console.log('logic_id:' + logic_id.val());
        console.log('relation_id:' + relation_id.val());
        console.log('relation_var:' + relation_var.val());



        var s = [];
        var s2 = [];
        var s3 = null;
        //if (record.LOGICDESC && record.LOGICDESC != null  && typeof (record.LOGICDESC) != "undefined") {
        //    s = record.LOGICDESC.split('WHERE');//优化
        //    if (s) {
        //        if (s.length > 1) {
        //            s2 = s[1].split('AND');
        //            s3 = s2.join('</br>')
        //            $('.editor_text_logicfield span').html(s3);
        //        } else { $('.editor_text_logicfield span').html(s[0]); }
        //    } else { $('.editor_text_logicfield span').html(''); }
        //}
        //else { $('.editor_text_logicfield span').html(''); } //优化

        if (record.LOGICDESC && record.LOGICDESC != null && typeof (record.LOGICDESC) != "undefined") {
            s = record.LOGICDESC.split('|');
            if (s) {
                if (s.length > 1) {
                    s2 = s.join('</br>')
                    $('.editor_text_logicfield span').html(s2);
                } else { $('.editor_text_logicfield span').html(s); }
            } else { $('.editor_text_logicfield span').html(''); }
        }
        else { $('.editor_text_logicfield span').html(''); }

        console.log($('.editor_text_logicfield span').text());


        var t = [];
        var t1 = null;
        if (record.LOGICTEXT && record.LOGICTEXT != null && typeof (record.LOGICTEXT) != "undefined") {
            t = record.LOGICTEXT.split('|');
            if (t) {
                if (t.length > 0) {
                    t1 = t.join('</br>');
                    $('.editor_text_logic span').html(t1);
                }
                else { $('.editor_text_logic span').html(t[0]); }
            }
            else { $('.editor_text_logic span').html(''); }
        }
        else { $('.editor_text_logic span').html(''); }


        var p = [];
        var p1 = null;
        if (record.JOINTEXT && record.JOINTEXT != null && typeof (record.JOINTEXT) != "undefined") {
            p = record.JOINTEXT.split('|');
            if (p) {
                if (p.length > 0) {
                    p1 = p.join('</br>');
                    $('.editor_text_relation span').html(p1);
                }
                else { $('.editor_text_relation span').html(p[0]); }
            }
            else { $('.editor_text_relation span').html(''); }
        }
        else { $('.editor_text_relation span').html(''); }


        var q = [];
        var q1 = null;

        if (record.JOINDESC && record.JOINDESC != null && typeof (record.JOINDESC) != "undefined") {
            q = record.JOINDESC.split('|');
            if (q) {
                if (q.length > 0) {
                    qp1 = q.join('</br>');
                    $('.editor_text_relationfield span').html(q1);
                }
                else { $('.editor_text_relationfield span').html(q[0]); }
            }
            else { $('.editor_text_relationfield span').html(''); }
        }
        else { $('.editor_text_relationfield span').html(''); }


    }

    // 获得数据
    ret.serialize1 = function () {
        var m = [];
        var m1 = null;
        //m1 = $('.editor_text_logicfield').getEditorText().editorTextZh;
        m = $('.editor_text_logicfield span').html().split('</br>');
        if (m != undefined && m != null) {
            if (m.length > 0) {
                //m1 = m.join(' and ');//优化
                m1 = m.join('|');
            }
        }

        var n = [];
        var n1 = null;
        //n1 = $('.editor_text_logic').getEditorText().editorText;
        n = $('.editor_text_logic span').html().split('</br>');
        if (n != undefined && n != null) {
            if (n.length > 0)
            { n1 = n.join('|'); }
        }

        var l = [];
        var l1 = null;
        //l1 = $('.editor_text_relationfield').getEditorText().editorTextZh;
        l = $('.editor_text_relationfield span').html().split('</br>');
        if (l != undefined && l != null) {
            if (l.length > 0)
            { l1 = l.join('|'); }
        }

        var k = [];
        var k1 = null;
        //k1 = $('.editor_text_relation').getEditorText().editorText;
        k = $('.editor_text_relation span').html().split('</br>');
        if (k != undefined && k != null) {
            if (k.length > 0)
            { k1 = k.join('|'); }
        }

        var logicSelectSQL = ret.logicSelect.join(',');
        var wherestring = null;

        if (m1 != undefined && m1 != null) {
            // wherestring = " WHERE " + m1; //优化
            wherestring = m1;
        }

        var index = datasource_desc.selectedId - 1;
        var sor = ret.logicDSField[index].itemName;

        return {
            FORCELLID: for_cell_id.val(),
            BUSINESSID: bussiness_name.val(),
            CELLCODE: for_cell_code.val(),
            CELLNAME: cell_name.val(),
            CELLDESC: cell_desc.val(),
            COMPUTETYPE: var_type.selectedId,
            CELLSOURCE: var_attr.selectedId,
            //LOGICDESC: 'SELECT ' + logicSelectSQL + ' FROM ' + sor + wherestring,//优化
            LOGICDESC: wherestring,
            LOGICTEXT: n1,
            LOGICID: logic_id.val(),
            JOINCELLID: relation_id.val(),
            JOINCELLDESC: $('#relation_var').find('option:selected').text(),
            JOINDESC: l1,
            JOINTEXT: k1
        };
    }

    //获得新增数据
    ret.serialize2 = function () {

        var m = [];
        var m1 = null;
        //m1 = $('.editor_text_logicfield').getEditorText().editorTextZh;
        m = $('.editor_text_logicfield span').html().split('</br>');
        if (m != undefined && m != null) {
            if (m.length > 0) {
                //m1 = m.join(' and ');//优化
                m1 = m.join('|');
            }
        }

        var n = [];
        var n1 = null;
        //n = $('.editor_text_logic').getEditorText().editorText;
        n = $('.editor_text_logic span').html().split('</br>');
        if (n != undefined && n != null) {
            if (n.length > 0)
            { n1 = n.join('|'); }
        }

        var l = [];
        var l1 = null;
        //l = $('.editor_text_relationfield').getEditorText().editorTextZh;
        l = $('.editor_text_relationfield span').html().split('</br>');
        if (l != undefined && l != null) {
            if (l.length > 0)
            { l1 = l.join('|'); }
        }

        var k = [];
        var k1 = null;
        //k = $('.editor_text_relation').getEditorText().editorText;
        k = $('.editor_text_relation span').html().split('</br>');
        if (k != undefined && k != null) {
            if (k.length > 0)
            { k1 = k.join('|'); }
        }

        var logicSelectSQL = ret.logicSelect.join(',');
        var wherestring = null;

        if (m1 != undefined && m1 != null) {
            //wherestring = " WHERE " + m1; //优化
            wherestring = m1;
        }

        var index = datasource_desc.selectedId - 1;
        var sor = ret.logicDSField[index].itemName;

        var model = {
            FORCELLID: '',
            BUSINESSID: bussiness_name.selectedId,
            CELLCODE: 'V000000',
            CELLNAME: cell_name.val(),
            CELLDESC: cell_desc.val(),
            ISMIDDLE: '0',
            COMPUTETYPE: var_type.selectedId,
            CELLSOURCE: var_attr.selectedId,
            //LOGICDESC: 'SELECT' + logicSelectSQL + ' FROM ' + sor + wherestring,//优化
            LOGICDESC: wherestring,
            LOGICTEXT: n1,
            LOGICID: logic_id.val(),
            JOINCELLID: relation_id.val(),
            JOINCELLDESC: $('#relation_var').find('option:selected').text(),
            JOINDESC: l1,
            JOINTEXT: k1
        };

        return model;
    }

    function getCondition() {
        var formcondition = {
            BUSINESSID: $('#bussiness_name').val(),//bussiness_name.selectedId,
            COMPUTETYPE: $('#var_type').val(),
            CELLSOURCE: $('#var_attr').val()
        };
        var condition = {
            BUSINESSID: $('#bussiness_name').val(),
            TYPE: $('#var_type').val()
        };

        return {
            formcondition: formcondition,
            condition: condition
        };
    }


    return ret;
})