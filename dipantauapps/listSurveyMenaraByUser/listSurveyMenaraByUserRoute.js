var express = require('express');
var router = express.Router();
var listSurveyMenaraByUserController = require('../listSurveyMenaraByUser/listSurveyMenaraByUserController');
var trim = require('trim');

router.post('/listsurveymenara', function(req, res, next) {
    if (!trim(req.body.userAccountId)) {
        res.status(200).send({ code: 6002, messages: "parameter tidak lengkap" });
    } else {
        listSurveyMenaraByUserController.showListSurveyMenaraByUserModel(req.body, function(err, result) {
            if (err) {
                res.status(200).send({ messages: "Server Bermasalah" });
            } else {
                res.status(200).send(result);
            }
        });
    }
});
module.exports = router;