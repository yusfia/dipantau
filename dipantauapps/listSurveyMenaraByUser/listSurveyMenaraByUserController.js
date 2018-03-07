var listSurveyMenaraByUserModel = require('../listSurveyMenaraByUser/listSurveyMenaraByUserModel');
var messages = require('../../configuration/MESSAGE');

exports.showListSurveyMenaraByUserModel = function(call, callback) {
    if (call.userAccountId != null) {
        listSurveyMenaraByUserModel.listSurveyMenaraByUser(call, function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    } else {
        callback(null, messages.parameter_not_completed);
    }
}