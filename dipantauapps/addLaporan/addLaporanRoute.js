var express = require('express');
var router = express.Router();
var addLaporanController = require('../addLaporan/addLaporanController');
var trim = require('trim');
var multer = require('multer');

const UPLOAD_PATH = './uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.post('/file/', upload.single('photo'), function (req, res) {
    if (req.file) {
        console.dir(req.file);
        res.status(200).send({
            success: true,
            messages: "File berhasil diupload",
            filename: req.file.filename,
            code: "000"
        });
    } else {
        res.status(200).send({success: false, messages: "Server bermasalah"});
    }
});

router.post('/addlaporanpetugas', function (req, res, next) {
    console.log(req.body);
    if (!trim(req.body.userId) ||
        !trim(req.body.fotoMenaraLaporanPath) ||
        !trim(req.body.longitudeMenaraLaporan) ||
        !trim(req.body.latitudeMenaraLaporan) ||
        !trim(req.body.menaraId) ||
        !trim(req.body.laporanDescription)) {
        res.status(200).send({success: false, messages: "parameter tidak lengkap"});
    } else {
        addLaporanController.addLaporan(req.body, function (err, result) {
            if (err) {
                res.status(200).send({success: false, messages: "Server bermasalah"});
            } else {
                res.status(200).send({success: true, data: result, messages: "Laporan telah berhasil dikirim"});
            }
        });
    }
});

router.get('/getlaporan/:userId', function (req, res, next) {
    console.log(req.params);
    if (req.params.userId === undefined) {
        res.status(200).send({success: false, messages: "parameter tidak lengkap"});
    } else {
        addLaporanController.getLaporan(req.params, function (err, result) {
            if (err) {
                res.status(200).send({success: false, messages: "Server bermasalah"});
            } else {
                res.status(200).send({success: true, data: result, messages: "Laporan berhasil dimuat!"});
            }
        });
    }
});

module.exports = router;