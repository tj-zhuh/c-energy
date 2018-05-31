
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var mwin = require('mwin');   //  mwin：弹出窗模块，负责弹出框的显示、隐藏、拖拽
    var mtext = require('mtext');   // mtext：输入框模块
    var dao = require('dao');

    var oldPsw = mtext();  // 原始密码
    var newPsw = mtext();  // 新密码
    var newPswRepeat = mtext();  // 再次输入新密码

    var ret = {};

    ret.init = function () {

        oldPsw.config({ selector: '#oldPsw' }).init();
        newPsw.config({ selector: '#newPsw' }).init();
        newPswRepeat.config({ selector: '#newPswRepeat' }).init();

        // 弹出框初始化
        mwin.config({
            selector: '#window1',
            windowId: 'window1',
            headId: 'window-head1'
        });
        mwin.init();

        // 修改密码框的打开、关闭事件
        $('.window-close').click(function () { mwin.close(); })
        $('.window-cancel').click(function () { mwin.close(); })
        $('#changePsw').click(function () { mwin.open(); });
        $('.opacity-div-for-modelwin').click(function () { mwin.close(); })

        // 修改密码框的确认事件
        $('.window-submit').click(function () {

            var opsw = oldPsw.val();
            var npsw = newPsw.val();
            var npsw2 = newPswRepeat.val();

            if (!opsw) { util.alert('请输入旧密码'); return }
            if (!npsw) { util.alert('请输入新密码'); return }
            if (!npsw2) { util.alert('请输入确认新密码'); return }
            if (npsw != npsw2) { util.alert('新密码两次输入不同'); return }

            dao.changePsw(opsw, npsw, function () {
                mwin.close();
                util.alert('密码修改成功');
            })
        })
    }

    return ret;
})