exports.createComment = function(_user, _content) {
    return {
        user: _user,
        content: _content
    };
};

exports.createUser = function(username) {
    var user = {
        userID: Math.random() + 1,
        works: []
    };
    user.username = username;
    return user;
}

exports.createMember = function(name, work, mobile, eMail) {
    var ret = {};
    ret.name = name;
    ret.work = work;
    ret.mobile = mobile;
    ret.eMail = eMail;
    return ret;
};

exports.createProject = function(type, tag, name, person, mobile, member, intro, fileURL, coverURL, link, id, pictures, previous, visible) {
    var ret = {};
    ret.type = type;
    ret.tags = tag || [];
    ret.name = name;
    ret.person = person;
    ret.mobile = mobile;
    ret.member = member;
    ret.introduction = intro;
    ret.fileURL = fileURL;
    ret.coverURL = coverURL;
    ret.link = link;
    ret.id = id;
    ret.comments = [];
    ret.picture = pictures || [];
    var date = new Date();
    ret.dateForPresent = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    ret.dataForCompare = date.getTime();
    ret.previous = false || previous;
    ret.viewTimes = 0;
    ret.rate = 0;
    ret.visible = false;
    return ret;
};
