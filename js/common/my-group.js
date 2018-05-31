

function initGroupSelector() {
    var that = this;

    // 显示
    $(".group-head").click(function (e) {

        var el = $(".group-selector");

        if (!el.hasClass('active')) {
            el.addClass('active');
        } else {
            el.removeClass('active');
        }

        e.stopPropagation();
    })

    // 点击了树本身，不要隐藏树
    $(".group-selector").click(function (e) {

        var el = $(".tree-selector");
        el.removeClass('active');

        e.stopPropagation();
    })

    // 点击空白 隐藏树
    $(".container").click(function (e) {
        var el = $(".group-selector");
        el.removeClass('active');

        var el2 = $(".tree-selector");
        el2.removeClass('active');
    })

    // 树固定
    $("#spin").click(function () {
        var t = $(this);
        if (t.hasClass('spinning')) {
            t.removeClass('spinning');
            $('.main-content').removeClass('main-content-left-group-spinned');
            $('.group-selector').removeClass('spinning');
            if (that.page && that.page.my_grid) {
                that.page.my_grid.grid.getView().refresh()
            }

        } else {
            t.addClass('spinning');
            $('.main-content').addClass('main-content-left-group-spinned');
            $('.group-selector').addClass('spinning');
            if (that.page && that.page.my_grid) {
                that.page.my_grid.grid.getView().refresh()
            }
        }
    })
}