// const handlebars = require("hbs");
// var myTemplate = $("#myTempId").html();
// var compiled = handlebars.compile(myTemplate);

$("#buttonId").click(function () {
  console.log("hey");
  if ($("#buttonId").text() == "Read More...") {
    $("#vis").hide();
    $("#hidden").show();
    $("#buttonId").text("Read Less...");
  } else {
    $("#vis").show();
    $("#hidden").hide();
    $("#buttonId").text("Read More...");
  }
});
