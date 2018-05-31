
/* 绘制树 */
define(function (require) {
    var $ = require('jquery');
    var clan = require('clan');  // 绘制族谱图



    var ret = {};

    ret.init = function () {

        var options = {
            selector: '.clan',  // 选择器
            padding: 50,  //  内边距
            gap: 80,   // 相邻两个框的距离
            width: 200,  // 框的宽度
            height: 80,  // 框的高
            seg1: 20,  // 竖线1的长度
            seg2: 20   // 竖线2的长度
        };

        // 尺寸变换
        options.padding = getPx(options.padding);
        options.gap = getPx(options.gap);
        options.width = getPx(options.width);
        options.height = getPx(options.height);
        options.seg1 = getPx(options.seg1);
        options.seg2 = getPx(options.seg2);

        clan.setBoxPainter(function (box, source) {

            var div1 = $("<div class='div1'></div>");
            div1.html(source.name);
            box.append(div1);

            var div2 = $("<div class='div2'></div>");
            div2.html(source.value);
            box.append(div2);

            if (typeof source.error === 'number' && source.error != 0) {
                box.addClass('error');
                box.attr('title', '误差:' + source.error);
            }
        })

        clan.config(options).init();
    }

    ret.draw = function (data) {

        //data = {
        //    id: '0',
        //    children: [{
        //        id: '1',
        //        children: [{
        //            id: '2'
        //        }, {
        //            id: '3'
        //        }]
        //    }]
        //}; 

        //console.log(data);
        clan.draw(data);
    }

    return ret;
})