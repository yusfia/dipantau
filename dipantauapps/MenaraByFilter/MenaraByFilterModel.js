app = require('../../indexApps');
var groupArray = require('group-array');
var math = require('mathjs');
var date = require('date-and-time');
db = app.db;

var QUERY_AND_STRING = " AND ";
var QUERY_OR_STRING = " OR ";
var QUERY_OPEN_CLOSURE_STRING = " ( ";
var QUERY_CLOSE_CLOSURE_STRING = " ) ";
var QUERY_FILTER_OPTIONS_DELIMITTER = ",";
var QUERY_EQUALS_STRING = " = ";
var MENARA_FILTER_BY_TIPESITE_COLUMN = " menara.tipeSiteId ";
var MENARA_FILTER_BY_TIPEJARINGAN_COLUMN = " menara.tipeJaringanMenaraId ";
var MENARA_FILTER_BY_TIPEMENARA_COLUMN = " menara.tipeMenaraId ";
var MENARA_FILTER_BY_KEPEMILIKAN_COLUMN = " menara.kepemilikanMenaraId ";
var MENARA_FILTER_BY_TIPEPEMILIK_COLUMN = " menara.tipePemilikId ";
var MENARA_FILTER_BY_STATUSMENARA_COLUMN = " menara.statusMenaraId ";

exports.listMenarayByGroup = function (query, callback) {
    var queryGroup = "SELECT * FROM user_group_survey INNER JOIN menara ON user_group_survey.menaraId = menara.menaraId WHERE user_group_survey.userGroupId = " + query.idUserGroup;
    db.query(queryGroup, function (err, result, fields) {
        if (err)
            callback(err, null);
        else {
            callback(null, result);
        }
    });
}

exports.listMenaraByFilter = function (query, callback) {
    var filterdataTipeSite = getFilterdataTipeSiteQuery(query);
    var filterdataTipeJaringan = getFilterdataTipeJaringanQuery(query);
    var filterdataTipeMenara = getFilterdataTipeMenaraQuery(query);
    var filterdataTipeKepemilikan = getFilterdataTipeKepemilikanQuery(query);
    var filterdataTipePemilik = getFilterdataTipePemilikQuery(query);
    var filterdataStatusMenara = getFilterdataStatusMenaraQuery(query);

    var queryListMenaraByFilter = "SELECT * FROM menara " +
        "WHERE menara.tipeJaringanMenaraId > 0 " + filterdataTipeSite + filterdataTipeJaringan + filterdataTipeMenara + filterdataTipeKepemilikan + filterdataTipePemilik + filterdataStatusMenara;
    console.log(queryListMenaraByFilter);
    db.query(queryListMenaraByFilter, function (err, resultQueryListMenaraByFilter, fields) {
        if (err)
            callback(err, null);
        else {
            if (resultQueryListMenaraByFilter.length === 0) {
                callback(null, {messages: "data tidak ditemukan"});
            } else {
                callback(null, {code: 2000, messages: "data ditemukan", data: resultQueryListMenaraByFilter});
            }
        }
    });
};

//start 1
function getFilterdataTipeSiteQuery(query) {
    if (query.datatipesite) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataTipeSiteQuery(query.datatipesite) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataTipeSiteQuery(tipeSiteFilter) {
    var tipeSiteFilterList = getQueryTipeSiteFilterByDelimitter(tipeSiteFilter);
    var resultQuery = getMultipleTipeSiteFilterQueryOptions(tipeSiteFilterList, MENARA_FILTER_BY_TIPESITE_COLUMN);
    return getMultipleTipeSiteFilterQueryOptions(tipeSiteFilterList, MENARA_FILTER_BY_TIPESITE_COLUMN);
}

function getQueryTipeSiteFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipeSiteFilterQueryOptions(tipeSiteFilter, columnName) {
    var resultQuery = "";
    if (tipeSiteFilter.length == 1) {
        return getSingleQueryOption(columnName, tipeSiteFilter);
    } else {
        for (i = 0; i < tipeSiteFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, tipeSiteFilter[i]);
            if (i < (tipeSiteFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}
//end 1
//start 2
function getFilterdataTipeJaringanQuery(query) {
    if (query.datatipejaringan) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataTipeJaringanQuery(query.datatipejaringan) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataTipeJaringanQuery(TipeJaringanFilter) {
    var TipeJaringanFilterList = getQueryTipeJaringanFilterByDelimitter(TipeJaringanFilter);
    var resultQuery = getMultipleTipeJaringanFilterQueryOptions(TipeJaringanFilterList, MENARA_FILTER_BY_TIPEJARINGAN_COLUMN);
    return getMultipleTipeJaringanFilterQueryOptions(TipeJaringanFilterList, MENARA_FILTER_BY_TIPEJARINGAN_COLUMN);
}

function getQueryTipeJaringanFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipeJaringanFilterQueryOptions(TipeJaringanFilter, columnName) {
    var resultQuery = "";
    if (TipeJaringanFilter.length == 1) {
        return getSingleQueryOption(columnName, TipeJaringanFilter);
    } else {
        for (i = 0; i < TipeJaringanFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, TipeJaringanFilter[i]);
            if (i < (TipeJaringanFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}
//end 2
//start 3
function getFilterdataTipeMenaraQuery(query) {
    if (query.datatipemenara) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataTipeMenaraQuery(query.datatipemenara) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataTipeMenaraQuery(tipeMenaraFilter) {
    var tipeMenaraFilterList = getQueryTipeMenaraFilterByDelimitter(tipeMenaraFilter);
    var resultQuery = getMultipleTipeMenaraFilterQueryOptions(tipeMenaraFilterList, MENARA_FILTER_BY_TIPEMENARA_COLUMN);
    return getMultipleTipeMenaraFilterQueryOptions(tipeMenaraFilterList, MENARA_FILTER_BY_TIPEMENARA_COLUMN);
}

function getQueryTipeMenaraFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipeMenaraFilterQueryOptions(tipeMenaraFilter, columnName) {
    var resultQuery = "";
    if (tipeMenaraFilter.length == 1) {
        return getSingleQueryOption(columnName, tipeMenaraFilter);
    } else {
        for (i = 0; i < tipeMenaraFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, tipeMenaraFilter[i]);
            if (i < (tipeMenaraFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}
//end 3
//start 4
function getFilterdataTipeKepemilikanQuery(query) {
    if (query.datakepemilikanmenara) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataTipeKepemilikanQuery(query.datakepemilikanmenara) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataTipeKepemilikanQuery(tipeKepemilikanFilter) {
    var tipeKepemilikanFilterList = getQueryTipeKepemilikanFilterByDelimitter(tipeKepemilikanFilter);
    var resultQuery = getMultipleTipeKepemilikanFilterQueryOptions(tipeKepemilikanFilterList, MENARA_FILTER_BY_KEPEMILIKAN_COLUMN);
    return getMultipleTipeKepemilikanFilterQueryOptions(tipeKepemilikanFilterList, MENARA_FILTER_BY_KEPEMILIKAN_COLUMN);
}

function getQueryTipeKepemilikanFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipeKepemilikanFilterQueryOptions(tipeKepemilikanFilter, columnName) {
    var resultQuery = "";
    if (tipeKepemilikanFilter.length == 1) {
        return getSingleQueryOption(columnName, tipeKepemilikanFilter);
    } else {
        for (i = 0; i < tipeKepemilikanFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, tipeKepemilikanFilter[i]);
            if (i < (tipeKepemilikanFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}
//end 4
//start 5
function getFilterdataTipePemilikQuery(query) {
    if (query.datatipepemilikmenara) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataTipePemilikQuery(query.datatipepemilikmenara) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataTipePemilikQuery(tipePemilikFilter) {
    var tipePemilikFilterList = getQueryTipePemilikFilterByDelimitter(tipePemilikFilter);
    var resultQuery = getMultipleTipePemilikFilterQueryOptions(tipePemilikFilterList, MENARA_FILTER_BY_TIPEPEMILIK_COLUMN);
    return getMultipleTipePemilikFilterQueryOptions(tipePemilikFilterList, MENARA_FILTER_BY_TIPEPEMILIK_COLUMN);
}

function getQueryTipePemilikFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipePemilikFilterQueryOptions(tipePemilikFilter, columnName) {
    var resultQuery = "";
    if (tipePemilikFilter.length == 1) {
        return getSingleQueryOption(columnName, tipePemilikFilter);
    } else {
        for (i = 0; i < tipePemilikFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, tipePemilikFilter[i]);
            if (i < (tipePemilikFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}
//end 5
//start 6
function getFilterdataStatusMenaraQuery(query) {
    if (query.datastatusmenara) {
        return QUERY_AND_STRING + QUERY_OPEN_CLOSURE_STRING + getFilterOptionDataStatusMenaraQuery(query.datastatusmenara) + QUERY_CLOSE_CLOSURE_STRING;
    } else {
        return "";
    }
}

function getFilterOptionDataStatusMenaraQuery(tipeStatusMenaraFilter) {
    var tipeStatusMenaraFilterList = getQueryTipeStatusMenaraFilterByDelimitter(tipeStatusMenaraFilter);
    var resultQuery = getMultipleTipeStatusMenaraFilterQueryOptions(tipeStatusMenaraFilterList, MENARA_FILTER_BY_STATUSMENARA_COLUMN);
    return getMultipleTipeStatusMenaraFilterQueryOptions(tipeStatusMenaraFilterList, MENARA_FILTER_BY_STATUSMENARA_COLUMN);
}

function getQueryTipeStatusMenaraFilterByDelimitter(source) {
    return source.split(QUERY_FILTER_OPTIONS_DELIMITTER);
}

function getMultipleTipeStatusMenaraFilterQueryOptions(tipeStatusMenaraFilter, columnName) {
    var resultQuery = "";
    if (tipeStatusMenaraFilter.length == 1) {
        return getSingleQueryOption(columnName, tipeStatusMenaraFilter);
    } else {
        for (i = 0; i < tipeStatusMenaraFilter.length; i++) {
            resultQuery += getSingleQueryOption(columnName, tipeStatusMenaraFilter[i]);
            if (i < (tipeStatusMenaraFilter.length - 1)) {
                resultQuery += QUERY_OR_STRING;
            }
        }
    }
    return resultQuery;
}

function getSingleQueryOption(columnName, value) {
    return columnName + QUERY_EQUALS_STRING + value;
}


//end 6