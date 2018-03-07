var express = require('express');
var router = express.Router();
var loginPetugasSurveyController = require('../loginPetugasSurvey/loginPetugasSurveyController');
var trim = require('trim');

router.post('/loginpetugassurvey', function(req, res, next) {
    if (!trim(req.body.username) || !trim(req.body.password)) {
        res.status(200).send({ code: 6002, messages: "parameter tidak lengkap" });
    } else {
        console.log("Login")
        loginPetugasSurveyController.checkingLoginPetugasSurvey(req.body, function(err, result) {
            if (err) {
                res.status(200).send({ messages: "Server Bermasalah" });
            } else {
                res.status(200).send({ code: 2000, data: result });
            }
        });
    }
});
module.exports = router;