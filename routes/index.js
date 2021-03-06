
/*
 * GET home page.
 */

var fs = require("fs");
var JSON = require("./json2").JSON;
var mongoDB = require("mongodb");
var dbport = 27017, db_options = {w: -1}, server_options = {};
var mongoserver = new mongoDB.Server('localhost', dbport, server_options );
var db = new mongoDB.Db("test", mongoserver, db_options);
var CAS = require('./myCas');
var cas = new CAS({base_url: 'http://bdfz-cas.pkuschool.edu.cn/cas', service: 'http://media.pkuschool.edu.cn/'});
var struct = require("./dataStruct");
var poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        var server_options={'auto_reconnect':false,poolSize:1};
        var db_options={w:-1};
        var mongoserver = new mongoDB.Server('localhost', 27017,server_options );
        var db=new mongoDB.Db('test', mongoserver, db_options);
        db.open(function(err,db){
            if(err)return callback(err);
            callback(null,db);
        });
    },
    destroy  : function(db) { db.close(); },
    max      : 1000,
    idleTimeoutMillis : 30000,
    log : false 
});

function searchAndSort(title, tags, sort, callback) {
    sortFunction = {
        viewTimes: function(a, b) {
            b.viewTimes - a.viewTimes;
        },
        rate: function(a, b) {
            b.rate - a.rate;
        },
        date: function(a, b) {
            return b.dateForCompare - a.dateForCompare;
        },
        commentTimes: function(a, b) {
            return b.comments.length - a.comments.length;
        }
    };
    pool.acquire(function(err, db) {
        db.collection("works").find({}).toArray(function(err, items) {
            var temp = [];
            function check(item) {
                for (var i = 0; i < title.length; ++i) {
                    if (item.name.indexOf(title[i]) === -1) {
                        return false;
                    }
                }
                for (var i = 0; i < tags.length; ++i) {
                    var match = false
                    for (var j = 0; j < item.tags.length; ++j) {
                        if (tags[i] === item.tags[j]) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        return false;
                    }
                }
                return true;
            }
            for (var i = 0; i < items.length; ++i) {
                if (check(items[i])) {
                    temp.push(items[i]);
                }
            }
            var result = temp.sort(function(a, b) {return b[sort] - a[sort];})
            console.log(result);
            pool.release(db);
            if (callback) {
                callback(result);
            }
        });
    });
};

function renderIndex(res, arg) {
    pool.acquire(function(err, db) {
        db.collection("works").find({type: "example"}).toArray(function(err, items) {
            arg.example = items.sort(function(a, b) {return b.dateForCompare - a.dateForCompare});
            db.collection("works").find({type: "documentory"}).toArray(function(err, items) {
                arg.documentory = items.sort(function(a, b) {return b.dateForCompare - a.dateForCompare});
                db.collection("works").find({type: "proma"}).toArray(function(err, items) {
                    arg.proma = items.sort(function(a, b) {return b.dateForCompare - a.dateForCompare});
                    db.collection("works").find({type: "paperMedia"}).toArray(function(err, items) {
                        arg.paperMedia = items.sort(function(a, b) {return b.dateForCompare - a.dateForCompare});
                        db.collection("works").find({type: "netMedia"}).toArray(function(err, items) {
                            arg.netMedia = items.sort(function(a, b) {return b.dateForCompare - a.dateForCompare});
                            db.collection("works").find({type: "poster"}).toArray(function(err, items) {
                                arg.poster = items.sort(function(a, b) {return b.dataForCompare - a.dataForCompare});
                                db.collection("works").find({type: "photo"}).toArray(function(err, items) {
                                    arg.photo = items.sort(function(a, b) {return b.dataForCompare - a.dataForCompare});
                                    db.collection("works").find({type: "song"}).toArray(function(err, items) {
                                        arg.song = items.sort(function(a, b) {return b.dataForCompare - a.dataForCompare});
                                        db.collection("works").find({type: "story"}).toArray(function(err, items) {
                                            arg.story = items.sort(function(a, b) {return b.dataForCompare - a.dataForCompare});
                                            db.collection("works").find({type: "activity"}).toArray(function(err, items) {
                                                arg.activity = items.sort(function(a, b) {return b.dataForCompare - a.dataForCompare});
                                                pool.release(db);
                                                console.log(arg);
                                                res.render("index", arg);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function cookieValidate(cookies, res, callback) {
    var username = cookies.username;
    var userID = Number(cookies.userID);
    var ret = {};
    pool.acquire(function(err, db) {
        db.collection("users").find({"username": username, "userID": userID}).toArray(function(err, items) {
            if (items.length !== 0) {
                ret = {"username": username, "userID": userID};
            }
            callback(ret);
            pool.release(db);
        });
    });
}

exports.index = function(req, res){
    var ticket = req.param("ticket");
    if (ticket) {
        try {
            cas.validate(ticket, function(err, status, username) {
                if (err) {
                    console.log("err:" + err);
                    renderIndex(res, {});
                } else {
                    console.log("status:" + status);
                    console.log("username:" + username);
                    if (!status) {
                        cookieValidate(req.cookies, res, function(user) {renderIndex(res, user)});
                        return;
                    }
                    var userID;
                    pool.acquire(function(err, db){
                        if (err) {
                            res.statusCode=500;
                            res.end(JSON.stringify(err,null,2));
                        } else {
                            db.collection("users").find({"username": username}).toArray(function(err, items) {
                                if (items.length === 0) {
                                    var newUser = struct.createUser(username);
                                    userID = newUser.userID;
                                    pool.acquire(function(err, db) {
                                        db.collection("users").save(newUser);
                                        pool.release(db);
                                    });
                                } else {
                                    userID = items[0].userID;
                                }
                                pool.release(db);
                                console.log(userID);
                                renderIndex(res, {"userID": userID, "username": username})
                            });
                        }
                    });
                }
            });
        } catch(e) {
            renderIndex(res, {});
        }
    } else {
        cookieValidate(req.cookies, res, function(user) {renderIndex(res, user)});
    }
};

exports.player = function(req, res) {
    var id = req.query.workID;
    cookieValidate(req.cookies, res, function(user) {
        var arg = user;
        pool.acquire(function(err, db) {
            db.collection("works").find({"id": Number(id)}).toArray(function(err, items) {
                arg.video = items[0];
                console.log(items);
                console.log(arg);
                res.render('player', arg);
                db.collection("works").update({"id": Number(id)}, {$inc: {"viewTimes": 1}}, function() {pool.release(db);});
            });
        });
    });
};

exports.submit = function(req, res) {
    res.render('submit');
};

exports.upload = function(req, res) {
    var nSubmit;
    pool.acquire(function(err, db) {
        db.collection("works").count({}, function(err, count) {
            nSubmit = count;
            console.log(nSubmit);
            var filePath, coverPath;
            if (!req.files || req.files.cover.name === "") {
                fs.unlink("./" + req.files.cover.path);
                fs.unlink("./" + req.files.file.path);
                res.writeHead(200, {'content-type': 'text/html'});
                res.write("<html><head><meta charset='utf-8' /></head><body>想调戏我？讨厌你哼~</body></html>");
                res.end();
                return;
            }
            fs.mkdir("./public/files/" + nSubmit, function() {
                if (req.files.file.name !== "") {
                    filePath = "/public/files/" + nSubmit + "/" + req.files.file.name;
                    fs.rename("./" + req.files.file.path, "." + filePath);
                } else {
                    fs.unlink("./" + req.files.file.path);
                }
                coverPath = "/public/files/" + nSubmit + "/" + req.files.cover.name;
                fs.rename("./" + req.files.cover.path, "." + coverPath);
                var field = req.body;
                var member = [];
                for (var i = 2; field._name[i] || field.work[i] || field._mobile[i] || field.eMail[i]; ++i) {
                    member.push(struct.createMember(field._name[i], field.work[i], field._mobile[i], field.eMail[i]));
                }
                var typeToTag = {
                    example: "案例",
                    documentory: "纪录片",
                    proma: "宣传片",
                    paperMedia: "纸质媒体",
                    netMedia: "网络媒体",
                    poster: "海报",
                    photo: "照片",
                    song: "校园歌曲",
                    story: "故事片",
                    activity: "活动纪实"
                };
                console.log(field.tags);
                field.tags = field.tags.split(',');
                field.tags.push(typeToTag[field.type]);
                var example = struct.createProject(field.type, field.tags, field.name, field.person, field.mobile, member, field.intro, filePath ? filePath.substr("/public".length) : undefined, coverPath.substr("/public".length), field.link, nSubmit. undefined, field.previous === "true" ? true : false);
                db.collection("works").insert(example, function() {pool.release(db)});
                res.writeHead(200, {'content-type': 'text/html'});
                res.write("<html><head><meta charset='utf-8' /></head><body>喵成功啦！</body></html>");
                res.end();
            });
        });
    });
};

exports.search = function(req, res) {
    var field = req.body;
    console.log(field.keywords);
    var keywords = field.keywords.split(' ');
    var tags = [], title = [];
    for (var i = 0; i < keywords.length; ++i) {
        if (keywords[i].charAt(0) !== "#") {
            title.push(keywords[i]);
        } else {
            tags.push(keywords[i].substr(1));
        }
    }
    var sort = field.sort;
    searchAndSort(title, tags, sort, function(result) {
        cookieValidate(req.cookies, res, function(user) {
            user.result = result;
            res.render("search", user);
        });
    });
};

exports.comment = function(req, res) {
    var field = req.body;
    if (!field.userID) {
        field.userID = 0;
    }
    console.log(field.userID);
    console.log(field);
    pool.acquire(function(err, db) {
        db.collection("users").find({userID: Number(field.userID)}).toArray(function(err, items) {
            var auther;
            if (items.length === 0) {
                auther = "匿名用户"
            } else {
                auther = items[0].username;
            }
            db.collection("works").update({id: Number(field.workID)}, {$push: {comments: struct.createComment(auther, field.comment)}}, function() {
                pool.release(db);
            });
        });
    });
    res.writeHead(301, {Location: "/player?workID=" + field.workID});
    res.end();
};
