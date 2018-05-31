require.config({
	paths: config.modulePaths,
});

// 页面全局变量
var page = {
};

define(function (require) {
	var $ = require('jquery');
	var dao = require('dao');     //  dao：数据获取模块
	var bubble = require('bubble');  // bubble: 全局事件模块，负责body点击事件的管理


	$(function () {

		// 初始化全局事件模块（事件绑定）
	    bubble.init();

        //加载图片

		$('.title-bar img').click(function () {
			window.history.go(-1);
		})
	})
})


