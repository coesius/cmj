$(document).ready(function() {
    $(".background").hide();
    $("#background1").show();
    $(".buttonGray").click(function() {
        $(".buttonBlue").hide();
        $(".buttonGray").show();
        $(".background").hide();
    });
    $("#introGray").click(function() {
        $("#introGray").hide();
        $("#introBlue").show();
        $("#background1").show();
    });
    $("#beforeGray").click(function() {
        $("#beforeGray").hide();
        $("#beforeBlue").show();
        $("#background2").show();
    });
    $("#hotGray").click(function() {
        $("#hotGray").hide();
        $("#hotBlue").show();
        $("#background3").show();
    });
    $("#logout").click(function() {
        document.cookie = "username=";
        document.cookie = "userID=";
		location = location;
    });
    $("#background1").click(function() {
        $("#introContainer").show();
    });
    $("#introExit").click(function() {
        $("#introContainer").hide();
    });
});
