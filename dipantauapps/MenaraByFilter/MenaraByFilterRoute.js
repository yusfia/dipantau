var express = require('express');
var router = express.Router();
var MenaraByFilterController = require('../MenaraByFilter/MenaraByFilterController');
var trim = require('trim');

router.get('/menarabyfilter', function (req, res, next) {
    console.log("Menara by Filter");
    if (!trim(req.query.datatipesite) &&
        !trim(req.query.datatipejaringan) &&
        !trim(req.query.datatipemenara) &&
        !trim(req.query.datakepemilikanmenara) &&
        !trim(req.query.datatipepemilikmenara) &&
        !trim(req.query.datastatusmenara)) {
        console.log("aq");
        res.status(200).send({code: 6002, messages: "parameter tidak lengkap"});
    } else {
        MenaraByFilterController.showListMenaraByFilter(req.query, function (err, result) {
            if (err) {
                res.status(200).send({code: 6003, messages: "Server Bermasalah"});
            } else {
                res.status(200).send(result);
            }
        });
    }
});

router.get('/filterbyusergroup/:idUserGroup', function (req, res, next) {
    console.log("Usergroup Menara Filter");
    if (req.params.idUserGroup === undefined) {
        res.status(200).send({code: 6002, success: false, messages: "parameter tidak lengkap"});
    } else {
        MenaraByFilterController.showListMenaraByGroup(req.params, function (err, result) {
            if (err) {
                res.status(200).send({code: 6003, success: false, messages: "Server Bermasalah"});
            } else {
                res.status(200).send({code: 2000, success: true, messages: "data ditemukan", data: result});
            }
        });
    }
});

module.exports = router;