var addLaporanModel = require('../addLaporan/addLaporanModel');
var messages = require('../../configuration/MESSAGE');

exports.addLaporan = function(call, callback) {
    if (call.userId != null &&
        call.fotoMenaraLaporanPath != null &&
        call.longitudeMenaraLaporan != null &&
        call.latitudeMenaraLaporan != null &&
        call.menaraId != null &&
        call.laporanDescription != null) {
        addLaporanModel.addLaporanPetugas(call, function(err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, { code: 3000, messages: "Anda berhasil menambahkan laporan!", data: result });
            }
        });
    } else {
        callback(null, messages.parameter_not_completed);
    }
}

exports.getLaporan = function (call, callback) {
    addLaporanModel.getLaporanPetugas(call, function(err, result) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}