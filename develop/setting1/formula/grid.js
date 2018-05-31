/* 表格模块 */
define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');
	var util = require('util');
	var pagin = require('pagin');    // pagin：分页组件


	var ret = {
		ofs: 0, // 当前从第几条开始
		ps: 7, // 每页的条数
		pageNumber: 1,// 当前页数(初始为1)
		total: 0, // 数据总条数
		grid: null,  // ext对象
		store: null,  // ext对象
		deleteHandler: null, // 点击删除按钮的处理函数
		editHandler: null  // 点击编辑按钮的处理函数
	};
	var storeConfig = {
	    fields: ['FORFACTORID', 'BUSINESSID', 'BUSINESSNAME', 'FACTORCODE', 'FACTORDESC', 'FACTORNAME', 'FORMULANOTE', 'FORMULANOTEID', 'UNITID', 'UNITCODE', 'DATAPRECISION', 'FORMULATYPE', 'FORMULASOURCE', 'ISMIDDLE', 'FORMULAVERSION', 'FORMULAVERSIONSOURCE', 'CREATEDATE', 'CREATEUSERID', 'CREATEUSER', 'UPDATEDATE', 'UPDATEUSERID', 'UPDATEUSER']
	}

	var gridConfig = {
		columns: {
			defaults: {
				sortable: false,
				menuDisabled: true,
				flex: 1,
				align: 'center'
			},
			items: [{
				text: '公式名',
				dataIndex: 'FACTORNAME',
				flex: 0.1
			}, {
                text: '行业',
                dataIndex: 'BUSINESSNAME',
                flex: 0.1
           }, {
				text: '公式简写',
				dataIndex: 'FORMULANOTE',
				flex: 0.3,
				renderer: function (value) {
					return value.replace(/\|/g, "");
				}
			}, {
				text: '公式类别',
				dataIndex: 'FORMULATYPE',
				renderer: function (x) {
					switch (x) {
						case '1': return '碳排放';
						case '2': return '能耗';
					}
				},
				flex: 0.1
			}, {
				text: '计量单位',
				dataIndex: 'UNITCODE',
				flex: 0.1
		   }, {
			    text: '公式版本',
			    dataIndex: 'FORMULAVERSION',
			    flex: 0.2
			}, {
				text: '公式编辑人',
				dataIndex: 'UPDATEUSER',
				flex: 0.1,
				renderer: function (value, metaData, record, rowIndex, colIndex) {
					if (record.get('UPDATEUSER')) {
						return record.get('UPDATEUSER');
					}
					else {
						return record.get('CREATEUSER');
					}
			    }
			}, {
				text: '时间',
				dataIndex: 'UPDATEDATE',
				flex: 0.2,
				renderer: function (value, metaData, record, rowIndex, colIndex) {
					if (record.get('UPDATEDATE')) {
						return record.get('UPDATEDATE');
					}
					else {
						return record.get('CREATEDATE');
					}
				}
			}, {
				text: '操作',
				renderer: function () {
					return "<div class='image-buttons'><div class='btn-delete'></div><div class='btn-edit'></div></div>";
				},
				flex: 0.1
			}]
		},

		width: "100%",
		height: "100%",
		enableColumnMove: false,
		enableColumnResize: false
	}

	ret.init = function () {
		var that = this;

		// 设置容器
		gridConfig.renderTo = Ext.get('grid1');

		// 创建store
		ret.store = Ext.create('Ext.data.Store', storeConfig);

		// 创建grid
		ret.grid = Ext.create('Ext.grid.Panel', gridConfig);

		// 将grid和store绑定
		ret.grid.bindStore(ret.store);

		// 初始化pagin组件
		pagin.config({
			prevText: '上一页',
			nextText: '下一页'
		});
		pagin.init();

		// 行内按钮的点击事件  删除
		$('.grid-container').on('click', '.btn-delete', function (e) {
			var record_id = $(this).parents('.x-grid-row').attr('data-recordid');
			var record = getRecordById(record_id);
			var id = record.FORFACTORID;
			var name = record.FACTORNAME;
			if (util.confirm('确认要删除名为' + name + '的公式吗？')) {
				if (typeof that.deleteHandler === 'function') {
					that.deleteHandler(id);
				}
			}
		})

		// 行内按钮的点击事件  编辑
		$('.grid-container').on('click', '.btn-edit', function (e) {
			var record_id = $(this).parents('.x-grid-row').attr('data-recordid');
			var record = getRecordById(record_id);
			var id = record.FORFACTORID;
			if (typeof that.editHandler === 'function') {
				that.editHandler(record);
			}
		})

		// 根据ext的行id获得行数据
		function getRecordById(recordId) {
			for (var i in ret.store.data.items) {
				var item = ret.store.data.items[i];
				if (item.internalId == recordId) {
					return item.data;
				}
			}
		}
	}

	// _reloadPagin变量标识在加载grid数据时，是否需要重新加载pagin
	var keepState = false;

	// 加载数据（data应包含两个字段 list是数据数组 total是总条数）
	ret.loadData = function (data) {
		if (data.Models >= this.ps) {
			$('#grid1').addClass('full');
		} else {
			$('#grid1').removeClass('full');
		}

		// 设置总条数
		this.total = data.Total;

		// 加载数据
		this.store.loadData(data.Models);

		// 是否重新加载pagin
		if (keepState === false) {
			this.ofs = 0;
			this.pageNumber = 1;
			pagin.set(this.ps, this.total);
		}
		keepState = false;
		// 设置当前第xx条，共计xx条
		$('#current-page').html((this.ofs + 1) + '-' + (this.ofs + data.Models.length));
		$('#total-page').html(this.total);
	}

	ret.change = function (func) {
	    var that = this;
	    console.log(typeof (func));
		pagin.change(function (_pageNumber, _ofs, _ps, _total) {
			that.ofs = _ofs;
			that.pageNumber = _pageNumber;
			keepState = true;   // 在翻页时，保持之前的查询条件和页码状态
			func(_pageNumber, _ofs, _ps, _total);
		});
	}

	ret.delete = function (func) {
		this.deleteHandler = func;
	}

	ret.edit = function (func) {
		this.editHandler = func;
	}

	return ret;
})