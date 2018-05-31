
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var util = require('util');
    var ret = {};

    var demo = (function () {
        var _demo = {};
        _demo.initData = function () {
            var areaSource = [{
                areaId: '1',
                areaName: '云南'
            }, {
                areaId: '2',
                areaName: '新疆'
            }];

            var businessSource = [{
                businessId: '1',
                businessName: '水泥'
            }, {
                businessId: '2',
                businessName: '电力'
            }];

            var companySource = [];
            for (var i = 0; i < 5; i++) {
                companySource.push({
                    companyId: (i + 1).toString(),
                    companyName: '某水泥厂' + (i + 1)
                })
            }

            var sequenceBoundary = {
                startYear: 2015,
                startMonth: 1,
                endYear: 2017,
                endMonth: 5
            }

            var targetSource = [{
                targetId: '1',
                targetName: '熟料综合煤耗'
            }, {
                targetId: '2',
                targetName: '某某指标'
            }];

            var obj = {
                areaSource: areaSource,
                businessSource: businessSource,
                companySource: companySource,
                sequenceBoundary: sequenceBoundary,
                targetSource: targetSource,
                uncertainty: 105
            }

            return obj;
        }
        _demo.companySource = function (condition) {
            var areaName
            if (condition.areaId == 1) {
                areaName = '云南';
            } else {
                areaName = '新疆';
            }

            var companySource = [];
            for (var i = 0; i < 5; i++) {
                companySource.push({
                    companyId: (i + 1).toString(),
                    companyName: areaName + '水泥厂' + (i + 1)
                })
            }

            return companySource;
        }
        _demo.targetSource = function (condition) {
            var source = [];
            source.push({
                targetId: '1',
                targetName: '塑料综合煤耗'
            });

            source.push({
                targetId: '2',
                targetName: '某某指标'
            });

            return source;
        }
        _demo.calcData = function (condition) {
            var grid1Data = [];
            var sequences = [];

            for (var i = condition.beginYear; i <= condition.endYear; i++) {
                var _beginMonth = i == condition.beginYear ? condition.beginMonth : 1;
                var _endMonth = i == condition.endYear ? condition.endMonth : 12;
                for (var j = _beginMonth; j <= _endMonth; j++) {
                    grid1Data.push({
                        sequence: i + '.' + j,                        
                        name: '某名称',
                        cost: 100,
                        uncertainty: 100
                    })

                    sequences.push(i + '.' + j)
                }
            } 

            var grid2Data = [];

            for (var i = 0; i < 20; i++) {
                var pt = i + 1;
                grid2Data.push({
                    name: '某名称',
                    valueBonudary: '某范围',
                    uncertainty: 100
                })
            }

            function random_data(min, max) {
                var temp;
                temp = ((max - min) * Math.random()) + min;
                temp = temp.toFixed(2);
                return temp;
            }

            var chartData = {
                ymax: 1000,
                ymin: 200,
                xaxis: sequences,
                //yunit: '单位名称',
                linedata: []
            };

            for (var i = 0; i < sequences.length; i++) {
                chartData.linedata.push(random_data(200, 1000));
            }

            return {
                grid1Data: grid1Data,
                grid2Data: grid2Data,
                chartData: chartData
            }
        }
        _demo.uncertainty = function (condition) {

            if (condition.targetId === '1')
                return 105;
            
            return 95;
        }
        _demo.goal = function (condition) {
            return 100 + parseInt(Math.random() * 200);
        }

        function getRandom(min, max) {
            return min + (max - min) * Math.random();
        }
        return _demo;
    })()

    //获取省份
    ret.getProvinceList = function (callback) {

        $.ajax({

            url: '/api/ProvinceCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].PROVINCEID,
                        itemName: data.Models[i].PROVINCENAME
                    })
                }
                callback(arr)

            },
            error: function (a,b,c) {
                console.log(a,b,c)
            }
        })


    }

    //获取行业
    ret.getBusinessList = function (callback) {

        $.ajax({

            url: '/api/BusinessCode/GetList',
            type: 'get',
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].BUSINESSID,
                        itemName: data.Models[i].BUSINESSNAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }

    //获取企业
    ret.getEnterpriseList = function (callback) {

        $.ajax({

            url: '/api/EnterpriseInfo/GetSome',
            type: 'get',
            data: {
                PROVINCEID: '',
                BUSINESSID:''
            },
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].ENTERPRISEID,
                        itemName: data.Models[i].ENTERPRISENAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })
    }





    ret.getInitData = function (condition, callback) {
        var data = demo.initData();
        callback(data);
    }

    //不确定度
    ret.getUncertainty = function (condition, callback) {
        var data = demo.uncertainty(condition);
                callback(data);

        //$.ajax({
        //    url: '',
        //    type: 'get',
        //    data: condition,
        //    success: function () {


        //        callback(data);

        //    },
        //    error: function (a,b,c) {
        //        console.log(a,b,c)
        //    }
        //})
    }

    ret.getCompanySource = function (condition, callback) {


        $.ajax({

            url: '/api/EnterpriseInfo/GetSome',
            type: 'get',
            data: condition,
            success: function (data) {

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].ENTERPRISEID,
                        itemName: data.Models[i].ENTERPRISENAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a, b, c)
            }
        })

    }

    //指标
    ret.getTargetSource = function (condition, callback) {
        //var data = demo.targetSource();

        $.ajax({
            url: '/api/EnergyIndex/GetSome',
            type: 'get',
            data:condition,
            success:function(data){

                var arr = [];

                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].EINDEXID,
                        itemName: data.Models[i].INDEXNAME
                    })
                }
                callback(arr)

            },
            error: function (a, b, c) {
                console.log(a,b,c)
            }
        })

    }

    //计算返回数据
    ret.getCalcData = function (condition, callback) {
        //var data = demo.calcData(condition);
        $.ajax({
            url: '/api/EnergyComputeResult/EexcuteFormula',
            type: 'post',
            data: condition,
            success: function (data) {

                if (!data.Models) { util.alert('计算失败，不好意思，请检查填写项是否正确') }
                else { callback(data.Models[0]); }
               

            },
            error: function (a, b, c) {
                
                console.log(a,b,c)
            }

        })
    }    

    //能耗目标值
    ret.getGoal = function (condition, callback) {
        //var data = demo.goal();

        $.ajax({
            url: '/api/EnergySavingIndex/GetSome',
            type: 'get',
            data: condition,
            success: function (data) {

                if (!data.Models.length) { console.log('这个目标值是假的');callback(200)}
                else {
                    callback(data.Models[0].SAVINGVALUE)
                }
                
            },
            error: function (a, b, c) {
                console.log(condition)

                console.log(a, b, c)
            }

        })
    }

    //获取公式
    ret.getFormula = function (condition, callback) {

        $.ajax({
        	url: '/api/FormulaFactor/GetEnergyFormula',
            type: 'get',
            data: condition,
            success: function (data) {


                if(data.Models[0])
                var temp = (data.Models[0].FORMULANOTE).replace(/(\|)/g, '');
                callback(temp)


            },
            error: function (a, b, c) {
                console.log(condition)

                console.log(a, b, c)
            }

        })
    }

    return ret;
})