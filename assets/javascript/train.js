$(document).ready(function(){



var config = {
  apiKey: "AIzaSyCmsLym98Q7bO-3M10X6yqYNrsNqpGRuWA",
  authDomain: "sample-project-b5626.firebaseapp.com",
  databaseURL: "https://sample-project-b5626.firebaseio.com",
  projectId: "sample-project-b5626",
  storageBucket: "sample-project-b5626.appspot.com",
  messagingSenderId: "351431174883"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
  event.preventDefault();

  var TNAME = $("#Name").val().trim();
  var TDES = $("#Destination").val().trim();
  var TFRE = $("#Frequency").val().trim();
  var TTIME = $("#Arrival").val().trim();



  var TrainInfo = {
    Name: TNAME,
    Destination: TDES,
    Frequency: TFRE,
    Time: TTIME
  };


  database.ref().push(TrainInfo);


  $("#Train-Name").val("");
  $("#Destination").val("");
  $("#Frequency").val("");
  $("#Arrival").val("");

  return false;
});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var TNAME = childSnapshot.val().name;
  var TDES = childSnapshot.val().destination;
  var TFRE = childSnapshot.val().frequency
  var TTIME = childSnapshot.val().TRAINTIME;


  var TRNARR = TRAINTIME.split(":");
  var TRAINTIME = moment().hours(TRNARR[0]).minutes(TRNARR[1]);


  var CURRENTTRAIN = moment();
  console.log("CURRENT TIME: " + moment(CURRENTTRAIN).format("hh:mm"));


  var MINUTES2GO = moment().diff(moment(TRAINTIME), "minutes");
  console.log("DIFFERENCE IN TIME: " + MINUTES2GO);


  var TRMDR = MINUTES2GO % frequency;
  console.log(TRMDR);


  var TMIN = frequency - TRMDR;
  console.log("Train arrives in: " + TMIN);

  var TXTRN = moment().add(TMIN, "m").format("hh:mm");
  console.log("TRAIN ARRIVAL TIME: " + moment(TXTRN).format("hh:mm"));


  var newRow = $("<tr>").append(TNAME);


  $("tbody").append(newRow);

})
});
