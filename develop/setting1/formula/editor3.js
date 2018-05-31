
/*变量关联模块*/

define(function (require) {
    var $ = require('jquery');
    var Ext = require('ext');

    var ret = {};

    var editorText = [];		//公式数组
    var editorTextZh = [];		//公式数据库表达式

    function showEditorText() {
        $('.editor_text_relation span').html(editorText.join('</br>'));
        $('.editor_text_relationfield span').html(editorTextZh.join('</br>'));
    }

    ret.addVar = function (data) {
        if (data) {
            editorText.push(data);
            editorTextZh.push(data);
            showEditorText();
        }
    }

    ret.init = function () {

        $('#go_up_relation').click(function () {
            var s = $('#relation_name1').find('option:selected').text() + "=" + $('#relation_name1').find('option:selected').text();
            editorText.push(s);
            var ss = $('#relation_field1').val() + "=" + $('#relation_field2').val();
            editorTextZh.push(ss);
            showEditorText();
        })

        $('#go_down_relation').click(function () {
            editorText.pop();
            editorTextZh.pop();
            showEditorText();
        })
    }

    ret.getEditorText = function () {
        var obj = {};
        obj.editorText = editorText.join('|');
        obj.editorTextZh = editorTextZh.join(' and ');
        return obj;
    }

    ret.clearEditorText = function () {
        editorText = [];
        editorTextZh = [];
        showEditorText();
    }

    //data1:公式简写 data2:ID表达式
    ret.setEditorText = function (data1, data2) {
        editorText = data1.split('|');
        editorTextZh = data2.split(' and ');
        showEditorText();
    }

    return ret;
})