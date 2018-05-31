
/*变量名模块*/

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {};

	ret.loadData = function (data) {
		$('.panel-middle1 .variable_list li').remove();

		for (var i = 0; i < data.length; i++) {
			var menu = data[i];
			var li = $("<li></li>");
			li.append(menu.name);
			li.attr("class", "var");
			li.attr("id", menu.id);
			li.attr("unit", menu.unit);
			li.attr("type", menu.type);
			li.attr("title", menu.description);

			$('.panel-middle1 .variable_list').append(li);
		}

		$('.panel-middle1 .variable_list li').click(function () {
			$('.panel-middle1 .variable_list li').each(function () {
				$(this).removeClass("click");
			})

			$(this).addClass("click");
		})
	}

	return ret;

})