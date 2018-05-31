
/*  切换碳排放和能耗量  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

    // 初始化
    ret.init = function () {

        // 碳排放选项被点击
        $('#switch-c').click(function () {
            var el = $(this);
            var type = 'c';
            handle(el, type);
        })

        // 能耗量选项被点击
        $('#switch-energy').click(function () {
            var el = $(this);
            var type = 'energy';
            handle(el, type);
        })

        // 
        function handle(el, type) {
            // 如果已经是激活的，则不处理
            if (el.hasClass('active'))
                return;

            // 将所有选项取消active样式
            $('.switch li').removeClass('active');

            // 被点击的元素设置active样式
            el.addClass('active');

            // 激活select事件
            if (typeof ret.selectHandler === 'function') {
                ret.selectHandler(type);
            }
        }
    }

    // select事件处理函数
    ret.selectHandler = null;

    // 绑定select事件的处理器
    ret.select = function (func) {
        this.selectHandler = func;
    }

    return ret;
})