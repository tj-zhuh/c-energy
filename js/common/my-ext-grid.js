
// Grid管理
function MyGrid() {

    // 当前页数(初始为1)
    this.page_id = 1;

    // 当前从第几条开始
    this.ofs = 0;

    // 每页条数
    this.ps = 9;

    // 排序列
    this.sort_column = '';

    // 是否降序
    this.sort_desc = false;

    // 查询结果数据
    this.list = null;

    // 查询总条数
    this.total = 0;

    // ext store对象
    this.store = null;

    // ext grid对象
    this.grid = null;

    // 是否初始查询（页面刚加载，或刚刚点击了“查询”按钮）
    this.is_initialization = true;

    // 配置
    this.config = null;

    // 查询条件
    this.condition = null;

    // 查询事件
    this.on_page_changed = null;

    // 指向页面对象
    this.page = null;
}

// 默认配置
MyGrid.prototype.config_defaults = {

    ps: 9,
    show_paging: true,

    store_config: {

    },
    grid_config: {
        multiSelect: true,
        viewConfig: {
            getRowClass: function (record, rowIndex) {
                if (rowIndex % 2 == 0) {
                    return 'odd-task-row';
                }
                return 'even-task-row';
            },
            enableTextSelection: true,
            loadMask: true
        },
        columns: {
            defaults: {
                sortable: false,
                menuDisabled: true,
                flex: 1,
                align: 'center'
            }
        },
        width: "100%",
        height: "100%",
        enableColumnMove: false,
        enableColumnResize: false
    },

    pagin_selector: '.paginList'
}; 

// 初始化
MyGrid.prototype.init = function (config) {
    var that = this;

    // 使用默认配置和自定义配置，组成最终使用的配置
    this.config = $.extend(true, {}, this.config_defaults, config);
    
    // 每页显示条数
    this.ps = this.config.ps;

    // 创建store
    this.store = Ext.create('Ext.data.Store', this.config.store_config);

    // 创建grid
    this.grid = Ext.create('Ext.grid.Panel', this.config.grid_config);

    // 将grid和store绑定
    this.grid.bindStore(this.store);

    // 窗口调整大小事件处理
    Ext.EventManager.onWindowResize(function () {
        that.grid.getView().refresh()
        that.grid.getView().setOverflowXY('auto', 'hidden');
    })
}

// 初始查询（点击查询按钮或页面初次加载时，调用该方法）
MyGrid.prototype.query = function (condition, callback) {

    // 重置页码、排序
    this.page_id = 1;
    this.ofs = (this.page_id - 1) * this.ps;
    this.sort_column = '';
    this.sort_desc = false;

    // 标记为初始查询
    this.is_initialization = true;

    // 记录查询条件
    this.condition = condition;

    // 调用查询方法
    this.do_query(condition, callback);
}

// 重新查询
MyGrid.prototype.reload = function (callback) {
    this.do_query(this.condition, callback);
}

// 查询数据
MyGrid.prototype.do_query = function (condition, callback) {

    // 设置查询条件
    condition = condition || {};
    var c = {
        ofs: this.ofs,
        ps: this.ps,
        sort_column: this.sort_column,
        sort_desc: this.sort_desc
    };
    condition = $.extend({}, c, condition);

    var that = this;

    // 发起请求
    $.ajax({
        type: 'get',
        url: that.config.url,
        dataType: 'json',
        data: condition,
        success: function (data) {

            if (!data || data.error || (!_.isNumber(data.Total) && !_.isNumber(data.total))) {
                console.log('查询失败 错误信息如下：')
                console.log(data);
                return;
            }
            //debugger
            that.list = data.Models || data.list;
            that.total = data.Total || data.total;
            that.store.loadData(that.list);
            that.show_paging();

            if (callback) {
                callback(data);
            }
        },
        error: function (req, msg) {
            console.log(msg);
            //alert('查询失败');
        }
    });
}


MyGrid.prototype.go_to_page = function (page_id) {
    this.page_id = page_id;
    this.ofs = (this.page_id - 1) * this.ps;

    this.is_initialization = false;

    this.do_query(this.condition);

    if (typeof this.on_page_changed == 'function' && this.page) {
        this.on_page_changed.call(this.page);
    }
},

MyGrid.prototype.show_paging = function () {

    if (!this.config.show_paging)
        return;

    if (!this.is_initialization) return;

    var that = this;
    var total = this.total;

    var page_size = this.ps;
    var selector = this.config.pagin_selector;

    $(selector).pagination({
        dataSource: function (done) {
            var result = [];
            for (var i = 0; i < total; i++) {
                result.push(i);
            }
            done(result);
        },
        pageSize: page_size,
        totalNumber: total,
        callback: function (data, pagination) {
            var page_id = pagination.pageNumber;

            if (pagination.direction) {
                that.go_to_page(page_id);
            }
        }
    });
}

MyGrid.prototype.get_selection = function () {
    var s = this.grid.getSelectionModel().getSelection();
    return s;
}

MyGrid.prototype.get_last_selected = function () {
    var s = this.grid.getSelectionModel().getLastSelected();
    return s;
}

MyGrid.prototype.clear_selection = function () {
    this.grid.getSelectionModel().deselectAll();
}