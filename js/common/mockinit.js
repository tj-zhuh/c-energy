/*
    Mock数据存储流程
    
    1.页面打开时，异步执行以下两项任务
    
    (1) 从MockServer请求Mock数据
    当获得返回值后，将数据和demo信息分别存放在db和demo变量中

    (2) 异步请求并执行在register-handlers.js中注册的register-handler-xxxx.js文件
    在register-handler-xxxx.js文件中定义了register-handler和register_demo方法，以及其它的一些方法和变量
    由于每个文件都是异步请求的，无法确定各个文件的执行先后顺序；
    为了确保正确，暂时将定义的方法存放在handlers和demos变量中，等待时机成熟再执行这些方法
    
    2. 不论从MockServer请求Mock数据，还是异步请求register-handlers.js中的文件，在完成后均会调用check_ready方法
    check_ready中判断是否全部准备好，也就是Mock数据已经读过来，异步的文件也全部加载完毕

    当check_ready判断通过后，会执行以下任务
    (1) 执行保存在demos中函数，生成demo数据（当demo数据变化过，才会用demo数据覆盖db中的数据）
    (2) 绑定保存在handlers中的拦截函数
   
    ※ MockServer是一个WebServer，提供持久化保存文本的功能
     ·页面刚加载时，从MockServer读取文本，反序列化为对象，放置在db和demo变量里；
     ·当调用save_db时，将db和demo变量数据序列化后发送到MockServer存储
     ·MockServer会根据ProjectKey（在util.js里配置）、客户端IP、网页Host三个方面来隔离数据，避免数据冲突
     ·MockServer的请求地址在util.js中配置
    
    ※ 之所以要异步请求register-handler-xxxx.js文件，是为了便于管理，防止在每个html中添加太多js引用

    接口说明
    1. ApiMocker.get(table_name)
    获取某个表的数据，table_name是表名，返回值是表数据
    
    2. ApiMocker.set(table_name, list)
    设置某个表的数据，table_name是表名，list是表数据
    ※ 一般用不到这个函数

    3. ApiMocker.save_db()
    讲当前的数据提交到Mock服务器上

    4. ApiMocker.register_handler(url, type, method)
    注册mock函数，拦截地址是url、类型是type的请求，拦截后调用method方法

    5. ApiMocker.register_demo(table_name, method)
    注册demo函数，key是表名，method是生成假数据的方法

    6. ApiMocker.create_id(list, id_field)
    生成唯一id，list是传入的数据数组，id_field是主键列名，返回值是生成的id

    7. ApiMocker.to_number(obj, field1, field2 …)
    将对象中的若干字段转换为Number类型  
    ※ 不要再使用这个方法了，改为直接写parseInt和parseFloat

*/



var ApiMocker = {

    // Mock数据库
    db: {},

    // 正在使用的demo数据
    demo: {},

    // api拦截函数
    handlers: [],

    // demo生成函数
    demo_creators: [],

    // 是否已经从MockServer获取到了数据
    db_ready: false,

    // 动态加载的脚本
    dynamic_scripts: [],    
    
    // 获取某个表的数据
    get: function (key) {
        return this.db[key] || [];
    },

    // 设置某个表的数据，一般用不到
    set: function (key, value) {
        this.db[key] = value;      
    },

    // 注册拦截函数
    register_handler: function (url, type, method) {
        this.handlers.push({
            url: url,
            type: type,
            method: method
        });
    },

    // 注册demo数据生成函数
    register_demo: function (key, method) {
        this.demo_creators.push({
            key: key,           
            method: method
        })
    },

    // 保存Mock数据库，序列化后提交到MockServer做持久化保存
    save_db: function (callback) {

        var obj = {
            db: this.db,
            demo: this.demo
        }

        var db_json = JSON.stringify(obj);
        var mockframe = $("<iframe name='mockframe' id='mockframe' style='display:none'>").appendTo(document.body);
        var form = $("<form method='post' target='mockframe' action='" + Config.TestingConfig.MockServer + "/Home/Save'>");
        $(form).append($("<input type='hidden' name='data' value='" + db_json + "'>"));
        $(form).append($("<input type='hidden' name='project' value='" + Config.TestingConfig.ProjectKey + "'>"));
        $(form).append($("<input type='hidden' name='host' value='" + window.location.host + "'>"));
        $(form).appendTo(document.body);
        $(form).submit();
        mockframe.load(function () {
            mockframe.remove();
            form.remove();
            if (callback && typeof (callback) == 'function')
                callback();
        });
    },

    // 读取Mock数据库，从MockServer获取数据，反序列化后放在db和demo变量中
    load_db: function (callback) {
        $.ajax({
            url: Config.TestingConfig.MockServer + '/api/Mock/myLoad?project=' + Config.TestingConfig.ProjectKey + '&host=' + window.location.host,
            type: 'get',
            dataType: 'jsonp',
            success: function (data) {

                if (typeof (data) == 'string')
                    data = JSON.parse(data);
                if (typeof (data) == 'string')
                    data = JSON.parse(data);
                if (typeof (data) == 'string')
                    return;

                ApiMocker.db = data.db || {};
                ApiMocker.demo = data.demo || {};

                if (callback && typeof (callback) == 'function')
                    callback();
            }
        });

        /* 如果db加载失败 避免阻塞进程 */
        var head = document.head || $('head')[0] || document.documentElement;
        var script = $(head).find('script')[0];
        script.onerror = function () {
            console.log("db load failed");
            if (callback && typeof (callback) == 'function')
                callback();
        };
    },

    // 动态加载js文件
    load_dynamic_script: function (url, callback) {
        var that = this;

        var dynamic_script = {
            url: url,
            complete: 0
        };

        this.dynamic_scripts.push(dynamic_script);

        $.ajax({
            url: url,
            type: 'get',
            success: function (d) {

                if (callback && typeof (callback) == 'function')
                    callback();

                dynamic_script.complete = 1;
                that.check_ready();
            },
            error: function (a, b, c) {

                console.log('script ' + url + ' load failed! Error: ' + c)

                dynamic_script.complete = 2;
                that.check_ready();
            }
        })


    },

    // 判断是否所有动态加载的js文件已经完成
    all_scripts_ready: function () {
        for (var i in this.dynamic_scripts) {
            var item = this.dynamic_scripts[i];
            if (item && item.url && !item.complete) {
                return false;
            }
        }
        return true;
    },

    // 检查是否准备好了（1.mock数据库读取完毕 2.所有动态js文件加载完成）
    check_ready: function () {
        if (this.db_ready && this.all_scripts_ready()) {

            // 用demo_creators中的函数生成demo数据，如果与demo变量保存的不一致，说明demo数据更新了，则覆盖到db中
            for (var i in this.demo_creators) {
                var creator = this.demo_creators[i];

                if (!creator || typeof creator.key != 'string' || typeof creator.method != 'function') {
                    continue;
                }

                var key = creator.key;
                var data = creator.method();

                if (!data) {
                    continue;
                }

                //console.log('-------------------------------')
                //console.log(data);
                //console.log(JSON.stringify(data))
                //console.log(this.demo[key])
                //console.log(JSON.stringify(this.demo[key]))

                if (JSON.stringify(data) != JSON.stringify(this.demo[key])) {
                    this.db[key] = _.cloneDeep(data);
                    this.demo[key] = data;
                }
            }

            // 准备好之后，执行mock.js
            $.ajax({
                url: '/lib/mock.js',
                type: 'get',
                success: function (d) {
                    after_mock_js_load();
                },
                error: function (a, b, c) {
                    console.log('script /lib/mock.js load failed! Error: ' + c)
                }
            })
        }
    },

    decodeObj: function (obj) {

        if (typeof (obj) == 'string') {
            return decodeURIComponent(obj);
        }

        var json = JSON.stringify(obj);
        var str = decodeURIComponent(json);
        return JSON.parse(str);
    },

    create_id: function (arr, field) {
        var tmp = _.cloneDeep(arr);
        for (var i in tmp) {
            this.to_number(tmp[i], field);
        }
        var max = _.max(tmp, field);
        return -max ? "1" : (parseInt(_.result(max, field)) + 1).toString();
    },

    to_number: function (obj) {
        for (var i = 1; i < arguments.length; i++) {
            var field = arguments[i];
            var f = _.get(obj, field);
            var n = parseFloat(f);

            if (_.isFinite(n)) {
                _.set(obj, field, n);
            }
        }
    },

    get_modelbase_nodes_by_root: function (rootId) {

        var list = this.get('FactoryModelbase');
        var a = _(list).select(function (x) {
            return _.contains(x.Path.split('|'), rootId);
        }).value();

        var c = _.pluck(a, 'ModelBaseId');

        return c;
    },

    /* 保存session对象 (使用cookie模拟session) */
    save_session: function (sessionObj) {
        var str = encodeURIComponent(JSON.stringify(sessionObj));
        document.cookie = 'session=' + str;
    },

    /* 读取session对象(使用cookie模拟session) */
    read_session: function () {
        var str = getCookie('session');

        function getCookie(c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1
                    c_end = document.cookie.indexOf(";", c_start)
                    if (c_end == -1) c_end = document.cookie.length
                    return document.cookie.substring(c_start, c_end);
                }
            }
            return ""
        }

        try {
            return JSON.parse(decodeURIComponent(str));
        }
        catch (e) {
            return {};
        }
    },

    // 设置session键值对
    set_session: function (key, value) {
        var session = this.read_session();
        _.set(session, key, value);
        this.save_session(session);
    },

    // 读取session键值
    get_session: function (key) {
        var session = this.read_session();
        return _.get(session, key);
    }


};

ApiMocker.load_db(function () {
    ApiMocker.db_ready = true;
    ApiMocker.check_ready();
});

ApiMocker.load_dynamic_script('/develop/register-handlers.js');

function after_mock_js_load() {
    Mock.mock(/^\/api.*/, function (options, callback) {
        if (!callback)
            return;

        var url = options.url;
        var url_no_param = Util.parseURL(url).url_no_param;
        var url_params = ApiMocker.decodeObj(Util.parseURL(url).params);
        var type = options.type;
        var body = ApiMocker.decodeObj(options.body);

        var obj = {};
        if (body) {
            var arr = body.split('&');
            for (var i in arr) {
                if (!arr[i] || typeof (arr[i]) != 'string') continue;
                var s = arr[i].split('=');
                obj[s[0]] = s[1];
            }
        }
        body = obj;

        for (var i in ApiMocker.handlers) {
            var handler = ApiMocker.handlers[i];
            if (handler.url == url_no_param && handler.type.toLowerCase() == type.toLowerCase()) {
                var data = handler.method(url_params, body);
                data = data || {};
                callback(data);
                return;
            }
        }

        $.ajax({
            type: type,
            url: Config.TestingConfig.RapServer + url,
            dataType: 'json',
            data: body,
            success: function (data) {
                data = data || {};
                //console.log(data);
                callback(data);
            },
            error: function (req, msg, info) {
                info = info || {};
                //console.log(info);
                callback(info);
            }
        });
    });

    $.holdReady(false);
}

