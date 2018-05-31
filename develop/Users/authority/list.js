
/*初始化功能菜单及相关操作*/

define(function (require) {
    var $ = require('jquery');

    var ret = {};

    var menuIdField = 'MENUID';
    var menuNameField = 'MENUNAME';
    var menuCodeField = 'MENUCODE';
    var isAuthField = 'ISAUTHOR';
    var liArray = [];
    var ul;

    ret.init = function () {
        ul = $('#features');
        $(ul).on('click', 'li', function () {
            var li = $(this);
            if (li.hasClass("active")) {
                li.removeClass("active");
            } else {
                li.addClass("active");
            }
        })
    }

    ret.loadData = function (data) {

        $('li', ul).remove();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var li = $("<li></li>");
            li.attr('menuId', item[menuIdField])

            var spanName = $("<span class='column1'></span>")
            spanName.append(item[menuNameField]);
            li.append(spanName);

            spanCode = $("<span class='column2'></span>")
            spanCode.append(item[menuCodeField]);
            li.append(spanCode);

            var cite = $('<cite></cite>');
            li.append(cite);

            if (item[isAuthField]) {
                li.addClass('active');
            }

            ul.append(li);
        }
    }

    ret.getCheckData = function () {

        var arr = []; 

        $('li', ul).each(function () {
            var li = $(this);
            var obj = {};
            obj[menuIdField] = li.attr('menuId');
            obj[isAuthField] = li.hasClass("active");
            arr.push(obj);
        })

        return arr;
    }

    ret.getSelectedIds = function () {
        var arr = [];

        $('li', ul).each(function () {
            var li = $(this);
            if (li.hasClass("active")) {
                arr.push(li.attr('menuId'));
            }
        })

        return arr.toString();
    }

    return ret;
})