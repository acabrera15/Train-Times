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
  var a = moment().format("HH");
  console.log(a);
});

$("#submit").on('click', function(event) {
    event.preventDefault();

    let trainName = $('#trainNameInput').val().trim();
    let destination = $('#destinationInput').val().trim();
    let firstTrainTime = $('#firstTrainTimeInput').val().trim();
    let frequency = $('#frequencyInput').val().trim();
    console.log(trainName, destination, firstTrainTime, frequency)
    database.ref().push({
        trainName,
        destination,
        firstTrainTime,
        frequency
    })
})

database.ref().on('child_added', function(snapshot) {

    $("#trainSchedules").append(`<tr>
    <td>${snapshot.val().trainName}</td>
    <td>${snapshot.val().destination}</td>
    <td>${snapshot.val().frequency}</td>
    <td>${snapshot.val().firstTrainTime}</td>
    <td>${'test'}</td>
  </tr>`);
})

let calculateNextArrivalTime = function() {
    
}