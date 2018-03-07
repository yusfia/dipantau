app = require('../../indexApps');
var groupArray = require('group-array');
var math = require('mathjs');
var date = require('date-and-time');
var md5 = require('md5');
db = app.db;

exports.checkingLogin = function(query, callback) {
    var passwordMD5 = md5(query.password);
    var queryCheckingLogin = "SELECT * FROM user_account WHERE username = '" + query.username + "' AND `password` = '" + passwordMD5 + "'";
    db.query(queryCheckingLogin, function(err, resultCheckingLogin, fields) {
        if (err)
            callback(err, null);
        else {
            if (resultCheckingLogin.length === 0) {
                callback(null, { messages: "Username dan Password yang anda masukkan salah" });
            } else {
                callback(null, { code: 2000, messages: "Login Sukses", data: resultCheckingLogin });
            }
        }
    });
};