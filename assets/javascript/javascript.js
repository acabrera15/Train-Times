/*
    TODO: LInk and configure firebase
*/
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCafaCMpaYr7QZeBSHu3V5yDUibyHqBqOM",
  authDomain: "trainsproj.firebaseapp.com",
  databaseURL: "https://trainsproj.firebaseio.com",
  projectId: "trainsproj",
  storageBucket: "",
  messagingSenderId: "67900234466",
  appId: "1:67900234466:web:98853b97de0ffb73"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).ready(function() {
  calculateNextArrivalTime("sd");
});

$("#submit").on("click", function(event) {
  event.preventDefault();

  $('#trainTimeError').empty();
  $("#frequencyError").empty();
  let frequency = $("#frequencyInput")
    .val()
    .trim();

  if (!isNaN(frequency)) {
    let firstTrainTime = $("#firstTrainTimeInput")
    .val()
    .trim();
    console.log(firstTrainTime);

    if (moment(firstTrainTime, "HH:mm").isValid()) {
      let trainName = $("#trainNameInput")
      .val()
      .trim();
    let destination = $("#destinationInput")
      .val()
      .trim();


    console.log(trainName, destination, firstTrainTime, frequency);
    database.ref().push({
      trainName,
      destination,
      firstTrainTime,
      frequency
    });
    } else {
      $(
        "<p class='text-danger' id='trainTimeError'>Error: please type in a valid time!</p>"
      ).appendTo("#trainTimeDiv");
    }

  } else {
    $(
      "<p class='text-danger' id='frequencyError'>Error: please type in a valid number!</p>"
    ).appendTo("#frequencyDiv");
  }
});

database.ref().on("child_added", function(snapshot) {
  const minutesUntilArrival = calculateMinutesToNextArrivalTime(
    moment(snapshot.val().firstTrainTime, "HH:mm"),
    snapshot.val().frequency
  );
  const nextArrivalTime = calculateNextArrivalTime(minutesUntilArrival);

  $("#trainSchedules").append(`<tr>
    <td>${snapshot.val().trainName}</td>
    <td>${snapshot.val().destination}</td>
    <td>${snapshot.val().frequency}</td>
    <td>${nextArrivalTime}</td>
    <td>${minutesUntilArrival}</td>
  </tr>`);
});

let calculateMinutesToNextArrivalTime = function(
  trainTimeStartTime,
  frequency
) {
  const currentTime = moment();
  var diff = currentTime.diff(trainTimeStartTime, "minutes") % frequency;
  return frequency - diff;
};

let calculateNextArrivalTime = function(minutesAway) {
  currentTime = moment();

  return currentTime.add(minutesAway, "minutes").format("h:mm A");
};
