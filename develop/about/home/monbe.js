
define(function (require) {

    var ret = {};

    ret.beginMonth = 1;
    ret.endMonth = undefined;

    var changeHandler = null;

    ret.init = function () {

        var panel = $('.monbe');
        var begin = $('.monbe-begin');
        var end = $('.monbe-end');
        var bar = $('.monbe-bar');
        var step = $(".monbe-step");

        begin.mousedown(mousedownHandler);
        end.mousedown(mousedownHandler);

        var max = bar[0].offsetWidth;

        function mousedownHandler(e) {
            var point = $(this);

            var x = e.clientX;
            var l = point[0].offsetLeft;

            document.onmousemove = function (e) {
                var thisX = (e || window.event).clientX;
                var to = Math.min(max, Math.max(0, l + thisX - x));
                point.css('left', to + 'px');

                var minX = Math.min(begin[0].offsetLeft, end[0].offsetLeft);
                var maxX = Math.max(begin[0].offsetLeft, end[0].offsetLeft);
                step.css('left', minX + 'px');
                step.css('width', (maxX - minX) + 'px');

                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }

            document.onmouseup = function (e) {
                var left = point[0].offsetLeft;

                var month = 1 + Math.round(left * 11 / max);

                setPos(point, month);

                if (typeof changeHandler === 'function') {
                    var month1 = begin.attr('data-month');
                    var month2 = end.attr('data-month');
                    ret.beginMonth = Math.min(month1, month2);
                    ret.endMonth = Math.max(month1, month2);
                    changeHandler();
                }

                document.onmousemove = null;
            }
        }

        function setPos(point, month) {

            var to = (month - 1) * max / 11;
            point.css('left', to + 'px');
            point.attr('data-month', month)

            var minX = Math.min(begin[0].offsetLeft, end[0].offsetLeft);
            var maxX = Math.max(begin[0].offsetLeft, end[0].offsetLeft);
            step.css('left', minX + 'px');
            step.css('width', (maxX - minX) + 'px');
        }


        var now = new Date()
        var month = now.getMonth() + 1;

        setPos(begin, 1);
        setPos(end, month);

        this.beginMonth = 1;
        this.endMonth = month;

    }

    ret.change = function (func) {
        changeHandler = func;
    }





    return ret;

})