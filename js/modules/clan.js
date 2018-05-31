; (function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(function (require) {
            var jquery = require('jquery');
            return factory(jquery);
        })
    }
    else {
        root.clan = factory(root.$)
    }
}(this, function ($) {

    if (typeof $ !== 'function')
        throw new Error('模块$获取失败');

    var manager = (function ($) {
        return {
            privates: [],
            instances: [],
            ctor: null,
            create: function () {
                if (typeof ctor !== 'function')
                    throw new Error('ctor不是函数');

                var obj = new ctor();
                this.privates.push({});
                this.instances.push(obj);
                return obj;

            },
            getp: function (obj, key) {
                if (!obj || typeof key !== 'string')
                    throw new Error('getp函数参数不正确');

                for (var i = 0; i < this.instances.length; i++) {
                    if (this.instances[i] === obj) {
                        return this.privates[i][key];
                    }
                }

            },
            setp: function (obj, key, value) {

                if (!obj || typeof key !== 'string')
                    throw new Error('getp函数参数不正确');

                for (var i = 0; i < this.instances.length; i++) {
                    if (this.instances[i] === obj) {
                        this.privates[i][key] = value;
                    }
                }
            },
            fac: function (ctor) {
                var that = this;
                this.ctor = ctor;
                var dfObj = this.create();
                function ret() {
                    return that.create();
                };
                $.extend(ret, dfObj);
                ret.version = typeof version === 'string' ? version : undefined;
                this.instances[0] = ret;
                return ret;
            }
        };
    })($);





    var calc = (function () {

        var _calc = {};

        var root;

        var options;

        // 计算
        // 输入参数inputData是树形结构，格式为：id、width、children
        // 返回也是树形结构，格式为：nodeId、width、children、level、dx、rank、x
        _calc.calculate = function (inputData, _options) {

            options = _options;

            // 把输入数据转化为Node对象格式
            root = new Node();
            root.level = 0;
            read(inputData, root);

            // 读取输入的数据，复制inputData的数据
            // 同时计算level、rank、parent
            function read(item, target) {
                target.source = item;
                target.nodeId = item.id;
                target.width = item.width || options.width;
                if (!item.children) return;
                for (var i = 0; i < item.children.length; i++) {
                    var child = new Node();
                    child.level = target.level + 1;
                    child.rank = i;
                    child.parent = target;
                    target.children.push(child);
                    read(item.children[i], child);
                }
            }

            // 递归遍历计算dx  dx：该节点的孩子节点的间距
            root.traversal();

            return root;
        }



        function Node() {
            this.nodeId;
            this.width;
            this.parent;
            this.children = [];
            this.source;

            this.level;   // 层数（root是0层）
            this.rank;    // 兄弟排行（老大是0）

            this.dx = -1;  // 孩子之间的距离
            this.x = 0;   // 相对于root的水平偏移值
            this.shiftx = 0;  // 相对于parent的水平偏移值

            this.descendants = [];  // 后代情况
        }

        Node.prototype.traversal = function () {

            this.analyzeDescendants();

            this.getdx();

            this.getx();
        }

        // 分析后代情况
        Node.prototype.analyzeDescendants = function () {

            // 后代情况是一个二维数组 第一维是层数，第二维是该层的所有节点（从左向右）
            this.descendants = [[this]];
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child.descendants.length == 0) child.analyzeDescendants();
                var cd = child.descendants;
                for (var j = 0; j < cd.length; j++) {
                    for (var k = 0; k < cd[j].length; k++) {
                        if (typeof this.descendants[j + 1] === 'undefined') {
                            this.descendants[j + 1] = [];
                        }
                        this.descendants[j + 1].push(cd[j][k]);
                    }
                }
            }
        }

        Node.prototype.getMaxLevel = function () {
            return this.level + this.descendants.length - 1;
        }

        // 计算第level层后代的最左节点的左边界相对于自己的水平偏移
        Node.prototype.getLeft = function (level) {
            var d = level - this.level;
            var list = this.descendants[d];
            var node = list[0];
            var total = 0;
            var tmp = node;
            for (var i = 0; i < d; i++) {
                var p = tmp.parent;
                total += tmp.shiftx;
                tmp = p;
            }
            total = -total;
            total += node.width / 2;
            return total;
        }

        // 计算第level层后代的最右节点的右边界相对于自己的水平偏移
        Node.prototype.getRight = function (level) {
            var d = level - this.level;
            var list = this.descendants[d];
            var node = list[list.length - 1];
            var total = 0;
            var tmp = node;
            for (var i = 0; i < d; i++) {
                var p = tmp.parent;
                total += tmp.shiftx;
                tmp = p;
            }
            total = total;
            total += node.width / 2;
            return total;
        }

        // 计算两个节点间的距离
        function getDistance(node1, node2) {

            var level = node1.level;
            var maxLevel = Math.min(node1.getMaxLevel(), node2.getMaxLevel());
            var maxDistance = 0;
            for (var i = level; i <= maxLevel; i++) {
                var _distance = getDistanceOnLevel(node1, node2, i);
                maxDistance = Math.max(_distance, maxDistance);
            }
            return maxDistance;
        }

        // 计算两个节点间在某一层的最小距离
        function getDistanceOnLevel(node1, node2, level) {

            var right = node1.getRight(level);
            var left = node2.getLeft(level);
            return right + left + options.gap;
        }

        // 计算每两个孩子之间的距离
        Node.prototype.getdx = function () {

            var children = this.children;  // 该节点的所有孩子
            var _dx = 0;           // 待计算的结果

            for (var i = 0; i < children.length; i++) {
                if (children[i].dx < 0) {
                    children[i].getdx();
                }
            }

            for (var i = 0 ; i < children.length - 1; i++) {
                for (var j = i + 1; j < children.length; j++) {
                    var iChild = children[i];
                    var jChild = children[j];
                    var distance = getDistance(iChild, jChild);
                    var tmp = distance / (j - i);
                    if (tmp > _dx) _dx = tmp;
                }
            }

            this.dx = _dx;       // 保存计算结果

            // 下面计算shiftx
            for (var i = 0 ; i < children.length; i++) {
                var child = children[i];
                child.shiftx = (i + 0.5 - children.length / 2.0) * this.dx;
            }
        }

        // 计算每个孩子的x值   x表示对root的水平偏移量
        Node.prototype.getx = function () {
            var children = this.children;  // 该节点的所有孩子           

            for (var i = 0 ; i < children.length; i++) {
                var child = children[i];
                child.x = this.x + (i + 0.5 - children.length / 2.0) * this.dx;
                child.getx();
            }
        }

        return _calc;

    })()






















    var defOptions = {
        selector: '.clan',
        padding: 50,
        gap: 50,
        width: 200,
        height: 80,
        seg1: 20,
        seg2: 20
    };

    function ctor() {
        this.el = null;  // jquery元素  
        this.options = defOptions;
        this.boxPainter = null;
    }

    ctor.prototype.config = function (_options) {
        this.options = $.extend(true, {}, this.options, _options);
        return this;
    }

    // 初始化（jquery元素创建、事件绑定）
    ctor.prototype.init = function () {

        var that = this;

        // jquery元素创建
        this.el = $(this.options.selector);


        return this;
    }

    ctor.prototype.setBoxPainter = function (func) {
        this.boxPainter = func;
    }

    ctor.prototype.draw = function (data) {

        var that = this;

        // 先清空
        $('.inner', this.el).html('');

        // 使用calc对象来计算dx
        var root = calc.calculate(data, this.options);

        // 计算宽高
        var seg1 = this.options.seg1;   // 竖线1的长度
        var seg2 = this.options.seg2;   // 竖线2的长度
        var boxHeight = this.options.height;  // 方块的高
        var padding = this.options.padding;   // 内边距
        var inner = $('.inner', this.el);   // 容器元素
        var boundary = getBoundary(root);  // 计算树的水平边距
        var totalWidth = boundary.right - boundary.left + padding * 2;  // 总宽度
        var middleX = Math.abs(boundary.left) + padding;  // root所在的坐标
        var levelNum = root.descendants.length;  // 总层数
        var totalHeight = levelNum * (boxHeight + seg1 + seg2) + padding * 2;  // 总高度

        inner.width(totalWidth);
        inner.height(totalHeight);

        // 绘制
        drawNode(root);

        // 每一层的高度计算函数
        function getY(level) {
            var y = padding + level * (boxHeight + seg1 + seg2);
            return y;
        }

        // 绘制节点
        function drawNode(node) {

            var nodeX = node.x;  // 计算获得的x
            var x = nodeX + middleX;
            var w = node.width || that.options.width;
            var level = node.level;
            var y = getY(level);
            var children = node.children;  // 该节点的所有孩子      

            // 画框
            var box = $("<div class='box'></div>");
            box.attr('nodeId', node.nodeId);
            box.css('left', (x - w / 2) + 'px');
            box.css('top', y + 'px');
            box.width(w);
            inner.append(box);

            if (typeof that.boxPainter === 'function') {
                that.boxPainter(box, node.source)
            }

            if (!children || children.length == 0) return;

            // 画线1
            var vline1 = $("<div class='vline'></div>");
            vline1.height(seg1);
            vline1.css('left', x + 'px');
            vline1.css('top', y + boxHeight + 2 + 'px');
            inner.append(vline1);

            // 画线2            
            for (var i = 0 ; i < children.length; i++) {
                var child = children[i];
                var vline2 = $("<div class='vline'></div>");
                vline2.height(seg2);
                vline2.css('left', child.x + middleX + 'px');
                vline2.css('top', y + boxHeight + seg1 + 'px');
                inner.append(vline2);
            }

            // 画水平线
            if (children.length > 1) {
                var hline = $("<div class='hline'></div>");
                hline.width(children[children.length - 1].x - children[0].x);
                hline.css('left', children[0].x + middleX + 'px');
                hline.css('top', y + boxHeight + seg1 + 'px');
                inner.append(hline);
            }



            // 递归
            for (var i = 0 ; i < children.length; i++) {
                var child = children[i];
                drawNode(child);
            }
        }
    }





    // 遍历节点，获得左右边界
    function getBoundary(root) {

        var left = 9999, right = -9999;
        loop(root);

        function loop(node) {

            var _left = node.x - node.width / 2;
            var _right = node.x + node.width / 2;

            if (_left < left) left = _left;
            if (_right > right) right = _right;

            for (var i = 0 ; i < node.children.length; i++) {
                loop(node.children[i]);
            }
        }

        return { left: left, right: right };
    }

    return manager.fac(ctor);
}))