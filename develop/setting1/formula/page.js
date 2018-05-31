require.config({
	paths: config.modulePaths,
});

require.config({
	paths: { "ext": "/js/modules/ext-4.2" },
	shim: { 'ext': { exports: 'Ext' } }
})

// 页面全局变量
var page = {
};

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');
	var dao = require('dao');     //  dao：数据访问模块
	var grid = require('grid');   // grid：表格模块，负责绘制右上角的表格
	var conditions = require('conditions');  // conditions：查询条件模块，负责页面查询条件的初始化、加载数据、事件处理等
	var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理
	var variable = require('variable');		//公式变量名操作模块
	var editor = require('editor');		//公式编辑模块
	var editor2 = require('editor2')      //变量过滤条件模块
	var editor3 = require('editor3')      //变量关联条件模块
	var mwin = require('mwin');   //  mwin：弹出窗模块，负责弹出框的显示、隐藏、拖拽
	var form1 = require('form1');    // form1: 变量名表单模块，负责form表单的数据加载和读取
	var form2 = require('form2');    // form2: 变量名表单模块，负责form表单的数据加载和读取
	var util = require('util');

	$(function () {

		//初始化公式编辑点击事件
		editor.init();
		editor2.init();
		editor3.init();

		form1.init();
		form2.init();

	    //查询条件模块初始化
		conditions.init();

	    form2.initSelect();
	    form1.initSelect();

		// grid组件初始化
		Ext.onReady(function () {
			grid.init();			
			//grid.change(repage(grid.pageNumber, grid.ofs, grid.ps, grid.total));
			//console.log('1');

			grid.edit(function (data) {
				form2.load(data);
				editor.setEditorText(data.FORMULANOTE, data.FORMULANOTEID);
			});

			grid.delete(function (id) {
				dao.deleteEditor({ FORFACTORID: id }, function () {
				    util.alert("删除成功");
					queryGrid(initCondition().condition2);
					//queryVar(initCondition().condition1);
					formClear();
				})
			});
		});

		$('#btn_var_add').click(function () {
		    // 打开窗口
		    mwin.open();
		    form1.clear();
		    form1.initSelect();
		    var c = conditions.get();
		    var c1 = {
		        BUSINESSID: c.BUSINESSID,
		        TYPE: c.CATEGORYID
		    };
		    var c2 = {
		        BUSINESSID: c.BUSINESSID,
		        COMPUTETYPE: c.CATEGORYID,
		        CELLSOURCE: c.ATTRIBUTEID
		    };
		    form1.getLogic(c1,c2);
		})

	    //变量名查询
		$("#var_query").keyup(function (e) {
		    var key = e.which;
		    if (key == 13) {
		        event.returnValue = false;
		        event.cancel = true;
		        var c = {
		            BUSINESSID: $('#businessSelect').val(),
		            COMPUTETYPE: $('#categorySelect').val(),
		            CELLNAME: $('#var_query').val(),
		            ISMIDDLE: $('#attributeSelect').val(),
		            CELLSOURCE: $('#typeSelect').val()
		        };
		        queryVar(c);
		    }
		});

		$('#btn_var_query').click(function () {
            //查询
		    var c = {
		        BUSINESSID: $('#businessSelect').val(),
		        COMPUTETYPE: $('#categorySelect').val(),
		        CELLNAME: $('#var_query').val(),
		        ISMIDDLE: $('#attributeSelect').val(),
		        CELLSOURCE: $('#typeSelect').val()
		    };
		    queryVar(c);
		})


		//删除变量名
		$('.variable_list').on('click', 'li .delete', function (e) {
		    var id = $(this).parent('li').attr("FORCELLID");
			var name = $(this).parent('li').children('.left').html();

			if (confirm('确认要删除名为' + name + '的变量吗？')) {
			    dao.deleteVar({ FORCELLID: id }, function () {
				    util.alert("删除成功");
					queryVar(initCondition().condition1);
					queryGrid(initCondition().condition2);
				});
			}
			e.stopPropagation();
		})

        //变量提交
		$('.window-submit').click(function () {
		    var data;
		    if ($('#for_cell_id').val()) {
		        data = form1.serialize1();
		        dao.editVar(data, function () {
		            util.alert("保存成功");
		            queryGrid(initCondition().condition2);
		            queryVar(initCondition().condition1);
		            formClear();
		        });
		    }
		    else {
		        data = form1.serialize2();
		        dao.addVar(data, function () {
		            util.alert("添加成功");
		            queryGrid(initCondition().condition2);
		            queryVar(initCondition().condition1);
		            formClear();
		        });
		    }

		    // 关闭窗口
		    mwin.close();
		})

		//编辑变量名
		$('.variable_list').on('click', 'li .edit', function (e) {

		    mwin.open();
		    var FORCELLID = $(this).parent('li').attr("FORCELLID");
		   
		    var cond = { FORCELLID: FORCELLID };
		    dao.queryOnlyVar(cond, function (data) {
		        form1.load(data[0]);
		    })		
		})

		$('.middle-right').click(function () {
		    $('#FORMULANOTE2').val(editor.getEditorText().editorText.replace(/\|/g, ""));
		    $('#FORMULANOTEID2').val(editor.getEditorText().editorTextZh);
		})

		// 后退
		$('.title-bar img').click(function () {
		    //window.location.href = "home.html";
		    window.location.href = history.go(-1);
		})

		// 弹出框初始化
		mwin.config({
			selector: '#window1',
			windowId: 'window1',
			headId: 'window-head1'
		});
		mwin.init();

		$('.window-close').click(function () {
			// 关闭窗口
			mwin.close();
			form1.clear();
		})

		$('.window-cancel').click(function () {
			// 关闭窗口
			mwin.close();
			form1.clear();
		})

		// 点击模态层时，关闭窗口
		$('.opacity-div-for-modelwin').click(function () {
			mwin.close();
		})


		//清空
		$(".clear").click(function () {
			editor.clearEditorText();
			formClear();
		})

		//保存编辑的公式
		$(".add").click(function () {
		    var data;
		    if ($('#FORMULAID2').val()) {
		        data=form2.serialize1();
				dao.editEditor(data, function () {
				    util.alert("保存成功");
					queryGrid(initCondition().condition2);
					queryVar(initCondition().condition1);
					formClear();
				});
			}
		    else {
		        data = form2.serialize2();
		        dao.addEditor(data, function () {
				    util.alert("添加成功");
					queryGrid(initCondition().condition2);
					queryVar(initCondition().condition1);
					formClear();
				});
			}
		})

	    //查询公式		
		$(".search").click(function () {
		    form1.clear();
		    form1.initSelect();
		    var c = conditions.get();
		    var c1 = {
		        BUSINESSID: c.BUSINESSID,
		        TYPE: c.CATEGORYID
		    };
		    var c2 = {
		        BUSINESSID: c.BUSINESSID,
		        COMPUTETYPE: c.CATEGORYID,
		        CELLSOURCE: c.ATTRIBUTEID
		    };
		    form1.getLogic(c1, c2);
		    queryGrid(initCondition().condition2);
		    queryVar(initCondition().condition1);
			formClear();
		})

	    // 翻页事件的处理函数
		//$('.pagin').click (function () {
		//    grid.change(function (pageNumber, ofs,ps, total)
		//    {
		//        var co= {
		//            BUSINESSID: $('#businessSelect').val(),
		//            FORMULATYPE: $('#categorySelect').val(),
		//            FACTORNAME: $('#contentText').val(),
		//            ISMIDDLE: $('#attributeSelect').val(),
		//            FORMULASOURCE: $('#typeSelect').val(),
		//            ofs: ofs,
		//            ps: ps
		//        };
		//        dao.queryEditor(co, function (data) {
		//            grid.loadData(data);
		//        });
		//    });
	    //})

		//只查询公式
		function queryGrid(condition) {

		    dao.queryEditor(condition, function (data) {
		        grid.loadData(data);
		    });
		    //公式
		    grid.change(function (_pageNumber, _ofs, _ps, _total) {

		        condition.ofs = _ofs;
		        condition.ps = _ps;
		        dao.queryEditor(condition, function (data) {
		            grid.loadData(data);
		        });
		    });
		    console.log('1');
		}

		//只查询变量
		function queryVar(condition) {
			//变量
			dao.queryVar(condition, function (data) {
				variable.loadData(data);
			});
		}

		//初始化查询条件
		function initCondition() {
		    var condition1 = {
		        BUSINESSID: $('#businessSelect').val(),
		        COMPUTETYPE: $('#categorySelect').val(),
		        CELLNAME: $('#contentText').val(),
		        ISMIDDLE: $('#attributeSelect').val(),
		        CELLSOURCE: $('#typeSelect').val()
		    };

		    var condition2 = {
		        BUSINESSID: $('#businessSelect').val(),
		        FORMULATYPE: $('#categorySelect').val(),
		        FACTORNAME: $('#contentText').val(),
		        ISMIDDLE: $('#attributeSelect').val(),
		        FORMULASOURCE: $('#typeSelect').val(),
		        ofs: grid.ofs,
		        ps: grid.ps
		    };
		    var condition3 = {
		        BUSINESSID: $('#businessSelect').val(),
		        FORMULATYPE: $('#categorySelect').val(),
		    };

		    return {
		        condition1: condition1,
		        condition2: condition2,
		        condition3: condition3
		    };
		}

		function formClear() {
			form1.clear();
			form2.clear();
		}

		//function repage(_pageNumber, _ofs, _ps, _total)
		//{
		//    var ofs = ofs;
		//    var ps = _ps;
		//    var co= {
		//        BUSINESSID: $('#businessSelect').val(),
		//        FORMULATYPE: $('#categorySelect').val(),
		//        FACTORNAME: $('#contentText').val(),
		//        ISMIDDLE: $('#attributeSelect').val(),
		//        FORMULASOURCE: $('#typeSelect').val(),
		//        ofs: ofs,
		//        ps: ps
               
		//    };
		//    console.log('11');
		//    dao.queryEditor(co, function (data) {
		//        grid.loadData(data);
		//    });
		//}
	})
})