var index = true;
$(document).ready(function() {
	$("#ball1").mouseover(function() {
		if (index) {
			$("#exam_ear").fadeIn();
		}
	});
	$("#ball1").mouseout(function() {
		if (index) {
			$("#exam_ear").fadeOut();
		}
	});
	$("#ball2").mouseover(function() {
		if (index) {
			$("#video_ear").fadeIn();
		}
	});
	$("#ball2").mouseout(function() {
		if (index) {
			$("#video_ear").fadeOut();
		}
	});
	$("#ball3").mouseover(function() {
		if (index) {
			$("#mage_ear").fadeIn();
		}
	});
	$("#ball3").mouseout(function() {
		if (index) {
			$("#mage_ear").fadeOut();
		}
	});
	$("#ball1").click(function() {
		index = false;
		$("#ball1").animate({height: "784px", width: "784px", marginLeft: "-202px", marginTop: "-332px"});
		$("#exam_ear").fadeOut();
		$("#exam_title").animate({marginLeft: "-428px", marginTop: "100px"});
		$("#video_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#mage_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#ball2").animate({height: "120px", width: "120px", marginLeft: "582px", marginTop: "0px"}, function() {
			$("#video_ear").css("margin-left", "712px").fadeIn();
		});
		$("#ball3").animate({height: "120px", width: "120px", marginLeft: "702px", marginTop: "0px"}, function() {
			$("#mage_ear").css("margin-left", "863px").fadeIn();
		});
		$(".video_arrow").fadeOut();
		$(".mage_arrow").fadeOut();
	});
	$("#ball2").click(function() {
		index = false;
		$("#ball2").animate({height: "784px", width: "784px", marginLeft: "-82px", marginTop: "-332px"}, function() {
			$(".video_arrow").fadeIn();
		});
		$("#video_title").animate({marginLeft: "627px", marginTop: "375px"});
		$("#exam_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#mage_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#ball1").animate({height: "120px", width: "120px", marginLeft: "-202px", marginTop: "0px"}, function() {
			$("#exam_ear").css("margin-left", "-328px").fadeIn();
		});
		$("#ball3").animate({height: "120px", width: "120px", marginLeft: "702px", marginTop: "0px"}, function() {
			$("#mage_ear").css("margin-left", "863px").fadeIn();
		});
		$(".mage_arrow").fadeOut();
	});
	$("#ball3").click(function() {
		index = false;
		$("#ball3").animate({height: "784px", width: "784px", marginLeft: "38px", marginTop: "-332px"}, function() {
			$(".mage_arrow").fadeIn();
		});
		$("#mage_ear").fadeOut();
		$("#mage_title").animate({marginLeft: "-428px", marginTop: "100px"});
		$("#exam_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#video_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#ball1").animate({height: "120px", width: "120px", marginLeft: "-202px", marginTop: "0px"}, function() {
			$("#exam_ear").css("margin-left", "-328px").fadeIn();
		});
		$("#ball2").animate({height: "120px", width: "120px", marginLeft: "-82px", marginTop: "0px"}, function() {
			$("#video_ear").css("margin-left", "-115px").fadeIn();
		});
		$(".video_arrow").fadeOut();
	});
	$("#background").click(function() {
		index = true;
		$("#ball1").animate({height: "120px", width: "120px", marginLeft: "0px", marginTop: "0px"});
		$("#ball2").animate({height: "120px", width: "120px", marginLeft: "250px", marginTop: "0px"});
		$("#ball3").animate({height: "120px", width: "120px", marginLeft: "500px", marginTop: "0px"});
		$("#exam_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#video_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#mage_title").animate({marginLeft: "0px", marginTop: "43.2px"});
		$("#mage_ear").animate({marginLeft: "610px"}).fadeOut();
		$("#video_ear").animate({marginLeft: "300px"}).fadeOut();
		$("#exam_ear").animate({marginLeft: "-75px"}).fadeOut();
		$(".arrow").fadeOut();
	});
	$("#doc_arrow").click(function() {
		$("#if_doc").show().animate({top: "0"});
		$("#container").animate({top: "100%"});
	});
	$("#pro_arrow").click(function() {
		$("#if_pro").show().animate({top: "0"});
		$("#container").animate({top: "-100%"});
	});
	$(".buttonX").click(function() {
		$(".iframe_top").animate({top: "-100%"}, function() {$(".iframe_top").hide();});
		$(".iframe_bottom").animate({top: "100%"}, function() {$(".iframe_bottom").hide();});
		$("#container").animate({top: "0"});
	});
});
