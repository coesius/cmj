exports.createComment = function(_user, _content) {
    return {
        user: _user,
        content: _content
    };
};

exports.createMember = function(name, work, mobile, eMail) {
    var ret = {};
    ret.name = name;
    ret.work = work;
    ret.mobile = mobile;
    ret.eMail = eMail;
    return ret;
};

exports.createExample = function(tag, name, mobile, member, intro, fileURL) {
    var ret = {};
    ret.tags = tag;
    ret.name = name;
    ret.person = person;
    ret.mobile = mobile;
    ret.member = member;
    ret.introduction = intro;
    ret.fileURL = fileURL;
    return ret;
};

exports.createVideo = function() {
    var ret = {};
    return ret;
};

exports.createMedia = function() {
    var ret = {};
    return ret;
};