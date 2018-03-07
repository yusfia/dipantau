var express = require('express');
var router = express.Router();
var optionFilterController = require('../optionFilter/optionFilterController');
var trim = require('trim');

router.get('/optionfilter', function(req, res, next) {
    optionFilterController.showTipeJaringan(req.body, function(err, resultTipeJaringan) {
        if (err) {
            res.status(200).send({ success: false, messages: "Server bermasalah" });
        } else {
            optionFilterController.showTipeSite(req.body, function(err, resultTipeSite) {
                if (err) {
                    res.status(200).send({ success: false, messages: "Server bermasalah" });
                } else {
                    optionFilterController.showKepemilikanMenara(req.body, function(err, resultKepemilikanMenara) {
                        if (err) {
                            res.status(200).send({ success: false, messages: "Server bermasalah" });
                        } else {
                            optionFilterController.showStatusMenara(req.body, function(err, resultStatusMenara) {
                                if (err) {
                                    res.status(200).send({ success: false, messages: "Server bermasalah" });
                                } else {
                                    optionFilterController.showTipeMenara(req.body, function(err, resultTipeMenara) {
                                        if (err) {
                                            res.status(200).send({ success: false, messages: "Server bermasalah" });
                                        } else {
                                            optionFilterController.showTipePemilikMenara(req.body, function(err, resultTipePemilikMenara) {
                                                if (err) {
                                                    res.status(200).send({ success: false, messages: "Server bermasalah" });
                                                } else {
                                                    res.status(200).send({
                                                        dataTipeSite: resultTipeSite,
                                                        dataTipeJaringan: resultTipeJaringan,
                                                        dataTipeMenara: resultTipeMenara,
                                                        dataKepemilikanMenara: resultKepemilikanMenara,
                                                        dataTipePemilikMenara: resultTipePemilikMenara,
                                                        dataStatusMenara: resultStatusMenara
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
module.exports = router;