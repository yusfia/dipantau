var MenaraByFilterModel = require('../MenaraByFilter/MenaraByFilterModel');
var messages = require('../../configuration/MESSAGE');

exports.showListMenaraByFilter = function(call, callback) {
    if (call.datatipesite != null ||
        call.datatipejaringan != null ||
        call.datatipemenara != null ||
        call.datakepemilikanmenara != null ||
        call.datatipepemilikmenara != null ||
        call.datastatusmenara != null) {
        MenaraByFilterModel.listMenaraByFilter(call, function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    } else {
        console.log("ab");
        callback(null, messages.parameter_not_completed);
    }
}

exports.showListMenaraByGroup = function(call, callback) {
    MenaraByFilterModel.listMenarayByGroup(call, function(err, result){
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}