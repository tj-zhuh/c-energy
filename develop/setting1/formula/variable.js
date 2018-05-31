/*变量名模块*/

define(function (require) {
	var $ = require('jquery');
	var Ext = require('ext');

	var ret = {};

	ret.loadData = function (data) {
		$('.variable_list li').remove();

		for (var i = 0; i < data.length; i++) {
			var menu = data[i];
			var li = $("<li></li>");
			var divLeft = $("<div></div>");
			var divMiddle = $("<div></div>");
			var divRightD = $("<div></div>");
			var divRightE = $("<div></div>");

			divLeft.append(menu.CELLNAME);
			divLeft.attr("class", "left");

			divMiddle.append(menu.CELLDESC);
			divMiddle.attr("class", "middle");

			divRightD.attr("class", "delete");
			divRightE.attr("class", "edit");

			li.append(divLeft);
			li.append(divMiddle);
			li.append(divRightE);

			li.append(divRightD);
			li.attr("FORCELLID", menu.FORCELLID);

			$('.variable_list').append(li);
		}

		$('.variable_list li').click(function () {
			$('.variable_list li').each(function () {
				$(this).removeClass("click");
			})

			$(this).addClass("click");
		})
	}

	return ret;
})