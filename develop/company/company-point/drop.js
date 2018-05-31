
/*拖拽模块*/

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {
		dropTarget: null,
		enterHandler: null,
		dropHandler: null
	};

	ret.init = function () {
		var that = this;

		var body = Ext.get("dropPanel");

		this.dropTarget = new Ext.dd.DropTarget(body, {
			ddGroup: 'grid-to-panel',
			notifyEnter: function (ddSourse, e, data) {
				if (typeof (that.enterHandler) === "function") {
					that.enterHandler();
				}
			},
			notifyDrop: function (ddSourse, e, data) {
				if (typeof (that.dropHandler) === "function") {
					that.dropHandler(data);
				}
			}
		})
	}

	ret.enter = function (func) {
		this.enterHandler = func;
	}
	
	ret.drop = function (func) {
		this.dropHandler = func;
	}

	return ret;
})
