
/*  数据获取模块  */

define(function (require) {
    var $ = require('jquery');
    var ret = {};

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
            error: function (req, msg) {
                console.log(msg);
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
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取企业
    ret.getEnterpriseList = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetEnterpriseList',
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
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //提交选择企业
    ret.postEnterpriseId = function (condition) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetCompany',
            type: 'get',
            data: condition,
            success: function (data) {             
                return;
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }
    //获取Grid
    ret.getGridData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetMaterialData',
            type: 'get',
            data: condition,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Models.length
                }
                if (item) {
                    callback(item);
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取能耗
    ret.getEnergyConsume = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetComEnergyConsume',
            type: 'get',
            data: condition,
            success: function (data) {
                var energyVaule;
                if (data) {
                    if (data.Models != null && data.Models != undefined) {
                        for (var i = 0; i < data.Models.length; i++) {
                            energyVaule = data.Models[i].RESULTVALUE;
                        }
                    }
                }
                callback(energyVaule)
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取碳排放
    ret.getGetCO2Consume = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetCO2Consume',
            type: 'get',
            data: condition,
            success: function (data) {
                var CO2Vaule;
                if (data) {
                    if (data.Models != null && data.Models != undefined) {
                        for (var i = 0; i < data.Models.length; i++) {
                            CO2Vaule = data.Models[i].RESULTVALUE;
                        }
                    }
                }
                callback(CO2Vaule)
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取综合能耗Line
    ret.getComEnergyConsumeLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetComEnergyConsumeLine',
            type: 'get',
            data: condition,
            async: false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    //获取指标能耗Line
    ret.getParaEnergyConsumeLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetParaEnergyConsumeLine',
            type: 'get',
            data: condition,
            async: false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    //获取能源能耗实物类别
    ret.getEnergyConsumeType = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetEnergyConsumeType',
            type: 'get',
            data: condition,
            success: function (data) {
                var arr = [];
                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].INDEXID,
                        itemName: data.Models[i].INDEXNAME
                    })
                }
                callback(arr)
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取能源能耗实物消耗Line
    ret.getEnergyConsumeDetailLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetEnergyConsumeDetail',
            type: 'get',
            data: condition,
            async: false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    //获取碳排放Line
    ret.getCO2ConsumeLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetCO2ConsumeLine',
            type: 'get',
            data: condition,
            async: false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    //获取碳排放实物类别
    ret.GetCO2ConsumeType = function (condition, callback) {
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetCO2ConsumeType',
            type: 'get',
            data: condition,
            success: function (data) {
                var arr = [];
                for (var i = 0; i < data.Models.length; i++) {
                    arr.push({
                        itemId: data.Models[i].INDEXID,
                        itemName: data.Models[i].INDEXNAME
                    })
                }
                callback(arr)
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
    }

    //获取碳排放实物曲线
    ret.getCO2ConsumeDetailLineData = function (condition, callback) {
        var item = null;
        $.ajax({
            url: '/api/EnergyUseEnterprise/GetCO2ConsumeDetail',
            type: 'get',
            data: condition,
            async: false,
            success: function (data) {
                item = {
                    list: data.Models,
                    total: data.Total
                }
            },
            error: function (req, msg) {
                console.log(msg);
            }
        })
        if (item) {
            callback(item)
        }
    }

    return ret;
})