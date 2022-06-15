// songkick APi Key
var songkickAPIKey = "io09K9l3ebJxmxe2"

// variables for document locatiions
var artistNameInput = document.querySelector("#input-artist-name");
var artistNameLocation = document.querySelector("#artist-name");
var artistDiscographyLocation = document.querySelector("#artist-discography");

// variables used to split name and reconfigure to format last name, first name
var artistNameSplit = [];
var ArtistFirstName = "";
var ArtistLastName = "";
var artistNameSearchCriteria = "";
var artistFullName = "";

// artist id as brought back from  musicbrainz
var artistFullID = "";
var ArtistName = "Jones,Grace";
var ArtistID = "";

// artist discography variables

var ArtistDiscogFirstAlbum = "";


// function to set data elements in HTML - so far Atist Name
var setDataToHTML = function() {
    document.getElementById("artist-name").innerHTML = artistFullName;

}



// function to get artist concerts from songkick api 
var getArtistConcerts = function (){
    var apiURL = "https://api.songkick.com/api/3.0/artists/mbid:"+ artistFullID + "/calendar.json?apikey=" + songkickAPIKey;

    // fethcing data and returning in JSON format
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                console.log("The first event is " + data.resultsPage.results.event[0].displayName)

                // setting variable for location of UL for discography, creating li element and giving it value, appending
                firstConcert = data.resultsPage.results.event[0].displayName;
                var Concertslocation = document.querySelector("#concert-listings");
                var createLiItem = document.createElement("li");
                createLiItem.innerHTML = firstConcert;
                Concertslocation.appendChild(createLiItem);
            })
}
    })

    // calling function to set data to HMTL elements
    setDataToHTML();
}

// function to get artist releases and set them as list items
var getArtistReleases = function () {
    // api url includes artistfullID variable and search by album
    var apiURL = "https://musicbrainz.org/ws/2/release-group?artist=" + artistFullID + "&type=album|ep&fmt=json";
    
    // fetching data and returning response in JSON format
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);

                // setting the albums in discography here 
                var firstAlbum = data["release-groups"][0].title;
                console.log("This is the first release " + firstAlbum);
                ArtistDiscogFirstAlbum = firstAlbum;
                console.log("the first album in discog is " + ArtistDiscogFirstAlbum);

                // setting variable for location of UL for discography, creating li element and giving it value, appending
                var discographylocation = document.querySelector("#artist-discography");
                var createLiItem = document.createElement("li");
                createLiItem.innerHTML = firstAlbum;
                discographylocation.appendChild(createLiItem);
            })
        }
    })
   
    // function to call out and get artist concerts
    getArtistConcerts();
}


// function to get artist information - mostly to grab ID so we can send it to get discography
var getArtistInformation = function () {
    // varible for URL that includes artist name in new format last name, first name
 var apiURL = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistNameSearchCriteria +"%20AND%20&fmt=json";
    
   

 // fetching data and JSON the data
 fetch(apiURL).then(function(response) {
     if (response.ok) {
    console.log(response);
    response.json().then(function(data){
        console.log(data);

        // setting id for artist name so we can pass it through the  get releases function
        var artistID = data.artists[0].id;
        console.log(artistID);
        artistFullID = artistID;

        getArtistReleases();

 });
}
 });
}

// function to get artist name from input and split and remormat to lasnt name, first name
var getArtistName = function() {
    var ArtistNameEntered = artistNameInput.value.trim();
    artistFullName = ArtistNameEntered
    console.log(artistFullName);
    artistNameSplit = artistFullName.split(" ");
    console.log(artistNameSplit[0] + artistNameSplit[1]);
    ArtistFirstName = artistNameSplit[0];
    console.log("Artist first name is " + ArtistFirstName);
    ArtistLastName = artistNameSplit[1];
    console.log("Artist Last name is " + ArtistLastName);
    artistNameSearchCriteria = (ArtistLastName + "," + ArtistFirstName);
    console.log("artist search criteria is " + artistNameSearchCriteria);




    getArtistInformation();





}

// getArtistConcerts();


artistNameInput.addEventListener("change", getArtistName);
