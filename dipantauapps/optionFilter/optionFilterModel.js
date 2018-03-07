app = require('../../indexApps');
var groupArray = require('group-array');
var math = require('mathjs');
var date = require('date-and-time');
db = app.db;

exports.optionFilterTipeJaringan = function(query, callback) {
    var querySelectTipeJaringan = "SELECT * FROM menara_tipe_jaringan";
    db.query(querySelectTipeJaringan, function(err, resultQuerySelectTipeJaringan, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectTipeJaringan);
        }
    });
};
exports.optionFilterTipeSite = function(query, callback) {
    var querySelectTipeSite = "SELECT * FROM menara_tipe_site";
    db.query(querySelectTipeSite, function(err, resultQuerySelectTipeSite, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectTipeSite);
        }
    });
};
exports.optionFilterStatusMenara = function(query, callback) {
    var querySelectStatusMenara = "SELECT * FROM menara_status";
    db.query(querySelectStatusMenara, function(err, resultQuerySelectStatusMenara, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectStatusMenara);
        }
    });
};
exports.optionFilterTipeMenara = function(query, callback) {
    var querySelectStatusMenara = "SELECT * FROM menara_tipe";
    db.query(querySelectStatusMenara, function(err, resultQuerySelectStatusMenara, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectStatusMenara);
        }
    });
};
exports.optionFilterKepemilikanMenara = function(query, callback) {
    var querySelectKepemilikanMenara = "SELECT * FROM menara_kepemilikan";
    db.query(querySelectKepemilikanMenara, function(err, resultQuerySelectKepemilikanMenara, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectKepemilikanMenara);
        }
    });
};
exports.optionFilterTipePemilikMenara = function(query, callback) {
    var querySelectTipePemilikMenara = "SELECT * FROM menara_tipe_pemilik";
    db.query(querySelectTipePemilikMenara, function(err, resultQuerySelectTipePemilikMenara, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, resultQuerySelectTipePemilikMenara);
        }
    });
};