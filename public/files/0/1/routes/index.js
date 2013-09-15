
/*
 * GET home page.
 */

var fs = require("fs");
var JSON = require("./json2").JSON;
var mongoDB = require("mongodb");
var dbport = 27017, db_options = {w: -1}, server_options = {};
var mongoserver = new mongoDB.Server('localhost', dbport, server_options );
var worksDB = new mongoDB.Db("test", mongoserver, db_options);
worksDB.open(function(err, db) {
    worksDB.collection("works").insert({"zaiyu": "jilao"});
});

exports.index = function(req, res){
  res.render('index');
};

exports.examples = function(req, res){
  res.render('examples');
};

exports.submit = function(req, res) {
  res.render('submit');
};

var processSubmit = {};

processSubmit["exam"] = function(req, res, dataInfo) {
	var nSubmit = "案例" + dataInfo.nExamSubmit;
	dataInfo.nExamSubmit++;
	fs.writeFileSync("./dataInfo", JSON.stringify(dataInfo));
	fs.mkdir("./tmp/" + nSubmit, function() {
		if (req.files.file.name !== "") {
			fs.rename("./" + req.files.file.path, "./tmp/" + nSubmit + "/" + req.files.file.name);
		} else {
			fs.unlink("./" + req.files.file.path)
		}
		var field = req.body;
		var info = "项目名称：" + field.projectName + "\n负责人：" + field.person + "\n手机：" + field.mobile + "\n项目组成员\n姓名 分工 手机 邮箱\n";
		for (var i = 0; field._name[i] || field.work[i] || field._mobile[i] || field.eMail[i]; ++i) {
			info += field._name[i] + " " + field.work[i] + " " + field._mobile[i] + " " + field.eMail[i] + "\n";
		}
		info += "项目简介\n" + field.introduction;
		fs.writeFile("./tmp/" + nSubmit + "/txt.txt", info, function(err) {
			if (err) {
				throw err;
			}
			res.writeHead(200, {'content-type': 'text/html'});
			res.write("<html><head><meta charset='utf-8' /></head><body>喵成功啦！</body></html>");
			res.end();
		});
	});
};

processSubmit["video"] = function(req, res, dataInfo) {
	var nSubmit = "视频" + dataInfo.nVideoSubmit;
	dataInfo.nVideoSubmit++;
	fs.writeFileSync("./dataInfo", JSON.stringify(dataInfo));
	fs.mkdir("./tmp/" + nSubmit, function() {
		var field = req.body;
		var info = "类型" + field.type + "影片名称：" + field.projectName + "\n负责人：" + field.person + "\n手机：" + field.mobile + "\n剧组成员\n姓名 分工 手机 邮箱\n";
		console.log(field._mobile)
		for (var i = 2; i < field._name.length || i < field.work.length || i < field._mobile.length || i < field.eMail.length; ++i) {
			info += field._name[i] + " " + field.work[i] + " " + field._mobile[i] + " " + field.eMail[i] + "\n";
		}
		info += "影片简介\n" + field.introduction + "\n影片链接：" + field.url;
		fs.writeFile("./tmp/" + nSubmit + "/txt.txt", info, function(err) {
			if (err) {
				throw err;
			}
			res.writeHead(200, {'content-type': 'text/html'});
			res.write("<html><head><meta charset='utf-8' /></head><body>喵成功啦！</body></html>");
			res.end();
		});
	});
};

processSubmit["media"] = function(req, res, dataInfo) {
	var nSubmit = "媒体" + dataInfo.nMediaSubmit;
	dataInfo.nMediaSubmit++;
	fs.writeFileSync("./dataInfo", JSON.stringify(dataInfo));
	fs.mkdir("./tmp/" + nSubmit, function() {
		if (req.files.file.name !== "") {
			fs.rename("./" + req.files.file.path, "./tmp/" + nSubmit + "/" + req.files.file.name);
		} else {
			fs.unlink("./" + req.files.file.path)
		}
		var field = req.body;
		var info = "项目名称：" + field.projectName + "\n负责人：" + field.person + "\n手机：" + field.mobile + "\n项目组成员\n姓名 分工 手机 邮箱\n";
		for (var i = 0; field._name[i] || field.work[i] || field._mobile[i] || field.eMail[i]; ++i) {
			info += field._name[i] + " " + field.work[i] + " " + field._mobile[i] + " " + field.eMail[i] + "\n";
		}
		info += "项目简介\n" + field.introduction + "网站首页链接：" + field.url;
		fs.writeFile("./tmp/" + nSubmit + "/txt.txt", info, function(err) {
			if (err) {
				throw err;
			}
			res.writeHead(200, {'content-type': 'text/html'});
			res.write("<html><head><meta charset='utf-8' /></head><body>喵成功啦！</body></html>");
			res.end();
		});
	});
};

exports.upload = function(req, res) {
	fs.readFile("./dataInfo", function(err, data) {
		if (err) {
			throw err;
		}
		var dataInfo = JSON.parse(data);
		processSubmit[req.body.submitType](req, res, dataInfo);
	});
};

exports.search = function(req, res) {
    var field = req.body;
    var keywords = field.keywords.split(' ');
    var tags = [], title = [];
    for (var i = 0; i < keywords; ++i) {
        if (keywords[i].charAt(0) !== "#") {
            title.push(keywords[i]);
        } else {
            tags.push(keywords[i]);
        }
    }

};