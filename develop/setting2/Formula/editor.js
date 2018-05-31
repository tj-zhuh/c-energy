
/*公式编辑模块*/

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {};

	var editorText = [];		//公式数组
	var editorTextZh = [];		//公式中文描述

	function showEditorText() {
		$('.editor_text').html(editorText.join(''));
	}

	ret.init = function () {
		$('#button_cal').click(function () {
			if ($(this).hasClass("hide")) {
				$(this).removeClass("hide").addClass("show");
				$('.cal_panel').hide();
			}
			else if ($(this).hasClass("show")) {
				$(this).removeClass("show").addClass("hide");
				$('.cal_panel').show();
			}
		})

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

		$('.middle1-middle2').click(function () {
			$('.panel-middle1 .variable_list li').each(function () {
				if ($(this).hasClass('click')) {
					$(this).removeClass('click');
					editorText.push($(this).html());
					editorTextZh.push($(this).attr('title'));
					showEditorText();
				}
			})
		})
	}

	ret.addVar = function (data) {
		if (data) {
			editorText.push(data);
			editorTextZh.push(data);
			showEditorText();
		}
	}

	ret.delVar = function () {
		editorText.pop();
		editorTextZh.pop();
		showEditorText();
	}

	ret.getEditorText = function () {

		var obj = {};
		obj.editorText = editorText.join('');
		obj.editorTextZh = editorTextZh.join('');
		return obj;
	}

	ret.clearEditorText = function () {
		editorText = [];
		editorTextZh = [];
		showEditorText();
	}

	ret.setEditorText = function (data) {

	}

	return ret;

})