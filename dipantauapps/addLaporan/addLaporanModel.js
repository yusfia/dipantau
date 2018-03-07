app = require('../../indexApps');
db = app.db;
var date = require('date-and-time');

exports.addLaporanPetugas = function (query, callback) {
    var tanggalLaporan = new Date();
    var postLaporanPetugas = {
        userId: query.userId,
        fotoMenaraLaporanPath: query.fotoMenaraLaporanPath,
        longitudeMenaraLaporan: query.longitudeMenaraLaporan,
        latitudeMenaraLaporan: query.latitudeMenaraLaporan,
        menaraId: query.menaraId,
        laporanDescription: query.laporanDescription,
        tanggalLaporan: tanggalLaporan
    };
    db.query('INSERT INTO laporan_ set ? ', postLaporanPetugas, function (err, resultLaporanPetugas, fields) {
        if (err) callback(err, null);
        else {
            db.query('SELECT * FROM laporan_ WHERE userId = ' + query.userId, function (err, resultSelectLaporanPetugas, fields) {
                if (err) callback(err, null);
                else {
                    callback(null, resultSelectLaporanPetugas);
                }
            });
        }
    });
};

exports.getLaporanPetugas = function (query, callback) {
    db.query('SELECT * FROM laporan_ WHERE userId = ' + query.userId + ' ORDER BY tanggalLaporan DESC LIMIT 5', function (err, resultLaporanPetugas, fields) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, resultLaporanPetugas);
        }
    });
};