var BandsInTownAPIKey = "5d493638-f008-4575-8af2-f799806c784e"
var TicketMasterAPIKey = "9nXT8eGYX3feuBixAjH6OjuUYJOitJlo"

// var getArtistInformation = function () {
//  var apiURL = "https://rest.bandsintown.com/artists/Grace%20Jones?app_id=5d493638-f008-4575-8af2-f799806c784e";
// //  var apiURL = "https://app.ticketmaster.com/discovery/v1/events.json?apikey=" + TicketMasterAPIKey;
   

//  // fethcing data and JSON the data
//  fetch(apiURL).then(function(response) {
//     console.log(response);
//  });
// }

// getArtistInformation();


$.getJSON("http://api.bandsintown.com/artists/weezer/events.json?callback=?&app_id=" + BandsInTownAPIKey , function(result) {

    $.each(result, function(key, val) {
      alert(key + val);
    });
});