var optionFilterModel = require('../optionFilter/optionFilterModel');
var messages = require('../../configuration/MESSAGE');

exports.showTipeJaringan = function(call, callback) {
    optionFilterModel.optionFilterTipeJaringan(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
exports.showTipeSite = function(call, callback) {
    optionFilterModel.optionFilterTipeSite(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
exports.showStatusMenara = function(call, callback) {
    optionFilterModel.optionFilterStatusMenara(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
exports.showTipeMenara = function(call, callback) {
    optionFilterModel.optionFilterTipeMenara(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
exports.showKepemilikanMenara = function(call, callback) {
    optionFilterModel.optionFilterKepemilikanMenara(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
exports.showTipePemilikMenara = function(call, callback) {
    optionFilterModel.optionFilterTipePemilikMenara(call, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}