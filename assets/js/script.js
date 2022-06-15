
var songkickAPIKey = "io09K9l3ebJxmxe2"

var artistNameInput = document.querySelector("#input-artist-name");
var artistNameLocation = document.querySelector("#artist-name");
var artistDiscographyLocation = document.querySelector("#artist-discography");

var artistNameSplit = [];
var ArtistFirstName = "";
var ArtistLastName = "";
var artistNameSearchCriteria = "";
var artistFullName = "";
var artistFullID = "";
var ArtistName = "Jones,Grace";
var ArtistID = "";


var setDataToHTML = function() {
    document.getElementById("artist-name").innerHTML = artistFullName;

    // var createLiItem = document.createElement("li");
    // createLiItem.innerHTML = 
    // artistDiscographyLocation.appendChild(createLiItem)

    // for (i=0; i <= 10 ; i ++) {
    //     var createLiItem = document.createElement("li");
    //         createLiItem.classList = "";
    //         createLiItem.innerHTML = data.release-groups[i].title;
    //         artistDiscographyLocation.appendChild(createLiItem);       
        
    // }
}


var getArtistConcerts = function (){
    var apiURL = "https://api.songkick.com/api/3.0/artists/mbid:"+ artistFullID + "/calendar.json?apikey=" + songkickAPIKey;

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            })
}
    })
    setDataToHTML();
}

var getArtistReleases = function () {
    var apiURL = "https://musicbrainz.org/ws/2/release-group?artist=" + artistFullID + "&type=album|ep&fmt=json";
    
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                var firstAlbum = data.release-groups[0].title;
                console.log("This is the first release" + firstAlbum);
            })
        }
    })
   
    getArtistConcerts();
}

var getArtistInformation = function () {
 var apiURL = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistNameSearchCriteria +"%20AND%20&fmt=json";
    
   

 // fetching data and JSON the data
 fetch(apiURL).then(function(response) {
     if (response.ok) {
    console.log(response);
    response.json().then(function(data){
        console.log(data);

        // setting id for artist name

        var artistID = data.artists[0].id;
        console.log(artistID);
        artistFullID = artistID;

        getArtistReleases();

 });
}
 });
}

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




    // artistNameSplit[1] = ArtistLastName;
    // console.log(artistNameSplit[1]);

}

// getArtistConcerts();


artistNameInput.addEventListener("change", getArtistName);
