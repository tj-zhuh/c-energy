/*公式编辑模块*/
define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {};

	var editorText = [];		//公式数组
	var editorTextZh = [];		//公式数据库表达式

	function showEditorText() {
		$('.editor_text span').html(editorText.join(''));
	}

	ret.addVar = function (data) {
		if (data) {
			editorText.push(data);
			editorTextZh.push(data);
			showEditorText();
		}
	}

	ret.init = function () {

		$('.cal_panel .number').click(function () {
			editorText.push($(this).html());
			editorTextZh.push($(this).html());
			showEditorText();
		})

		$('.cal_panel .delete').click(function () {
			editorText.pop();
			editorTextZh.pop();
			showEditorText();
		})

		$('.left-middle').click(function () {
			$('.variable_list li').each(function () {
				if ($(this).hasClass('click')) {
					$(this).removeClass('click');
					editorText.push($(this).children('.left').html());
					editorTextZh.push($(this).attr("FORCELLID"));  
					showEditorText();
				}
			})
		})
	}

	ret.delVar = function () {
		editorText.pop();
		editorTextZh.pop();
		showEditorText();
	}

	ret.getEditorText = function () {
		var obj = {};
		obj.editorText = editorText.join('|');
		obj.editorTextZh = editorTextZh.join('|');
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
		editorTextZh = data2.split('|');
		showEditorText();
	}

	return ret;
})