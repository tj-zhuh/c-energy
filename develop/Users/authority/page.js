
require.config({
    paths: config.modulePaths,
});

define(function (require) {
    var $ = require('jquery');
    var dao = require('dao');     //  dao：数据访问模块
    var list = require('list');     //  list：功能菜单操作模块		
    var util = require('util');
    var mselect = require('mselect');   // 下拉框组件
    var roleSelect = mselect();   //行业下拉框

    $(function () {

        // 后退
        $('.title-bar img').click(function () {
            window.history.go(-1);
        })

        list.init();

        // 角色下拉框的初始化
        roleSelect.config({ selector: '#roleSelect', autoSelectFirst: true }).init();

        // 角色下拉框的数据源的查询与绑定
        dao.getRoles(function (data) { 
            roleSelect.bindSource(data); 
            query();
        });

        // 角色下拉框的选择事件
        roleSelect.change(function () { query(); })

        

        // 查询数据的方法
        function query() {
            var queryCondition = { RoleId: roleSelect.selectedId };
            dao.query(queryCondition, function (arr) {
                list.loadData(arr);
            });
        }

        $('.save').click(function () {
            var roleCode = roleSelect.selectedId;

            var obj = {
                RoleId: roleSelect.selectedId,
                MenufeatureIds: list.getSelectedIds()
            };

            dao.save(obj, function () {
                util.alert('保存成功');
            })
        })
    })
})
