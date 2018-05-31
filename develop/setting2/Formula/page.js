require.config({
	paths: config.modulePaths,
});

require.config({
	paths: { "ext": "/js/modules/ext-4.2" },
	shim: { 'ext': { exports: 'Ext' } }
})

// 页面全局变量
var page = {

	//碳排放or能耗
	current_checked: null,

	// 当前的操作 add/edit
	operateType: 'add'
};

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');
	var dao = require('dao');     //  dao：数据访问模块
	var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等
	var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
	var variable = require('variable');		//公式变量名操作模块
	var editor = require('editor');		//公式编辑模块
	var mwin = require('mwin');   //  mwin：弹出窗模块，负责弹出框的显示、隐藏、拖拽
	var mform = require('mform');    // mform: 表单模块，负责form表单的数据加载和读取

	// 变量queryCondition描述查询条件
	var queryCondition = null;

	$(function () {

		//初始化公式编辑点击事件
		editor.init();

		// 初始化全局事件模块（事件绑定）
		bubble.init();

		// 查询条件模块初始化
		conditions.init(bubble);

		// 初始化数据
		dao.getInitData({}, function (data) {
			conditions.loadInitData(data);
		})

		/*默认加载变量名*/
		variable.loadData(dao.queryVar());

		//关于checkbox的点击事件
		$('div.check').click(function () {
			if (!$(this).hasClass('active')) {
				$('div.check').removeClass('active');
				$(this).addClass('active')
				page.current_checked = $(this).context.id.slice(5, 6)
			}
		})

		// 后退
		$('.title-bar img').click(function () {
			window.history.go(-1);
		})

		// 弹出框初始化
		mwin.config({
			selector: '#window1',
			windowId: 'window1',
			headId: 'window-head1'
		});
		mwin.init();

		$('.var_add').click(function () {

			// 打开窗口
			mwin.open();
		})

		$('.window-close').click(function () {

			// 关闭窗口
			mwin.close();
		})

		$('.window-cancel').click(function () {

			// 关闭窗口
			mwin.close();
		})

		$('.window-submit').click(function () {
			var data = $('.window form').serialize();
			dao.addVar(data);

			// 关闭窗口
			mwin.close();

			// 变量重新加载
			variable.loadData(dao.queryVar());
		})

		// 点击模态层时，关闭窗口
		$('.opacity-div-for-modelwin').click(function () {
			mwin.close();
		})

		$('.middle2-right').click(function () {
			$('#formula_short').val(editor.getEditorText().editorText);
			$('#formula_zh').val(editor.getEditorText().editorTextZh);
		})

		//变量名查询
		$("#var_query").keyup(function (e) {
			var key = e.which;
			if (key == 13) {
				event.returnValue = false;
				event.cancel = true;
				variable.loadData(dao.queryVar($(this).val()));
			}
		});

		//清空
		$(".clear").click(function () {
			editor.clearEditorText();
		})

		//保存编辑的公式
		$(".add").click(function () {

			var data = $('.panel-right form').serialize();
			dao.addEditor(data);
		})

		//查询行业
		$(".search").click(function () {
			dao.queryEditor(conditions, editor.setEditorText);
		})
	})
})