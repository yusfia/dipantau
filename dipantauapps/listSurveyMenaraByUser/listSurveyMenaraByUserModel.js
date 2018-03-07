app = require('../../indexApps');
var groupArray = require('group-array');
var math = require('mathjs');
var date = require('date-and-time');
db = app.db;

exports.listSurveyMenaraByUser = function(query, callback) {
    var queryListSurveyMenaraByUser = "SELECT user_account.userId,user_group.userGroupName, " +
        "user_group_survey.userGroupSurveyNumber, menara.kodeMenara, menara.namaMenara, menara.alamatMenara " +
        "FROM user_account " +
        "INNER JOIN user_group ON user_account.groupId = user_group.userGroupId " +
        "INNER JOIN user_group_survey ON user_group_survey.userGroupId = user_group.userGroupId " +
        "INNER JOIN menara ON user_group_survey.menaraId = menara.menaraId " +
        "WHERE user_account.userId = " + query.userAccountId;
    console.log(queryListSurveyMenaraByUser);
    db.query(queryListSurveyMenaraByUser, function(err, resultQueryListSurveyMenaraByUser, fields) {
        if (err)
            callback(err, null);
        else {
            if (resultQueryListSurveyMenaraByUser.length === 0) {
                callback(null, { messages: "data tidak ditemukan" });
            } else {
                callback(null, { code: 2000, messages: "data ditemukan", data: resultQueryListSurveyMenaraByUser });
            }
        }
    });
};