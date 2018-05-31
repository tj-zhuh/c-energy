
/*变量过滤模块*/

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {};

	var editorText = [];		//公式数组
	var editorTextZh = [];		//公式数据库表达式

	function showEditorText() {
	    $('.editor_text_logic span').html(editorText.join('</br>'));
	    $('.editor_text_logicfield span').html(editorTextZh.join('</br>'));
    }

	ret.addVar = function (data) {
		if (data) {
			editorText.push(data);
			editorTextZh.push(data);
			showEditorText();
		}
	}

	ret.init = function () {

	    $('#go_up_logic').click(function () {

	        var s = $('#logic_name').find('option:selected').text() + $('#logic_symbol').find('option:selected').text() + "'" + $('#logic_field_value').val() + "'";
	        editorText.push(s);
	        var ss = $('#logic_field').val() + $('#logic_symbol').find('option:selected').text() + "'" + $('#logic_field_value').val() + "'";
			editorTextZh.push(ss);
			showEditorText();
		})

	    $('#go_down_logic').click(function () {
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