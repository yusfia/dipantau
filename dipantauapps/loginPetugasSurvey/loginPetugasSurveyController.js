var loginPetugasSurveyModel = require('../loginPetugasSurvey/loginPetugasSurveyModel');
var messages = require('../../configuration/MESSAGE');

exports.checkingLoginPetugasSurvey = function(call, callback) {
    if (call.username != null && call.password != null) {
        loginPetugasSurveyModel.checkingLogin(call, function(err, result) {
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