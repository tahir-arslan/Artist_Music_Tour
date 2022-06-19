var videoContainer = document.querySelector(".video-container");
var apiLink = "https://www.googleapis.com/youtube/v3/search?";
var youtubeKey = "AIzaSyAVipUFCUajMgvasF6xv_p18pu4uLXmhcE";
var youtubeUrl = 'https://www.youtube.com/watch?v=';
var search = "";
//console.log(apiLink)

//get 3 videos based on the user's serch
var getVideos = function(search) {
    videoContainer.innerHTML = "";
    //if no entree on the user's input stop the function
    if (!search) {
        return
    } else {
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeKey}&q=${search}&maxResults=3`;
        fetch(url).then(function(response) {
            console.log(url + "check this")
            console.log(response)
            if (response.ok) {
                response.json().then(function(data) {
                    var videos = data.items;
                    //get video name, youtube link and video img. not adding video into the APP yet
                    for (video of videos) {
                        videoContainer.innerHTML += `
                        <div class="grid-cols-1 flex flex-col h-80 rounded-md color-bg shadow-xl">
                            <a href="${youtubeUrl + video.id.videoId}" class="p-4 video-link" target="_blank"> 
                            ${video.snippet.title}</a>
                            <img class="h-full rounded-b-md bg-cover bg-center" src="${video.snippet.thumbnails.default.url}" />
                        </div>`
                    };
                });

            } else {
                console.log("error")
            }
        });
    }
};


// songkick APi Key
var songkickAPIKey = "io09K9l3ebJxmxe2";


// variables for document locations the input text field, the artist name locationa nd the discography location
var artistNameInput = document.querySelector("#input-artist-name");
var artistNameLocation = document.querySelector("#artist-name");
var artistDiscographyLocation = document.querySelector("#artist-discography");

// variables used to split name and reconfigure to format last name, first name
var artistNameSplit = [];
var ArtistFirstName = "";
var ArtistLastName = "";
// this is the appended result to send to the musicbrainz API search in the last name, first name format
var artistNameSearchCriteria = "";


// artist id as brought back from  musicbrainz
var artistFullID = "";

// global variable for the artist name entered so it can be used in other functions
var artistFullName = "";

// artist discography variables
var ArtistDiscogFirstAlbum = "";


// function to set data elements in HTML - so far just Artist Name
var setArtistName = function() {
    document.getElementById("artist-name").innerHTML = artistFullName;


}

// function to get artist concerts from songkick api using the Artist ID obtained from musicbrainz
var getArtistConcerts = function() {
    var apiURL = "https://api.songkick.com/api/3.0/artists/mbid:" + artistFullID + "/calendar.json?apikey=" + songkickAPIKey;

    // fethcing data and returning in JSON format
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

                // variable for concerts location on page to append <li> elements
                var Concertslocation = document.querySelector("#concert-listings");

                // setting variable for location of UL for concerts, creating li element and giving it value, appending
                var Concertlistings = parseInt(data.resultsPage.totalEntries);

                // if there are concert listings, clearing previous search results and adding new ones
                if (Concertlistings > 0) {
                    // clearing previous search li elements
                    Concertslocation.innerHTML = "";

                    // for loop to cycle through concert listings until the array length or 10 items is reached
                    for (i = 0; i < Concertlistings && i < 11; i++) {

                        // displaying the results returned from API
                        ConcertList = data.resultsPage.results.event[i].displayName;

                        // creating <li> elements and appending them to concerts location on page
                        var createLiItem = document.createElement("li");
                        createLiItem.innerHTML = ConcertList;
                        Concertslocation.appendChild(createLiItem);
                    }
                    // error control for if there are no concert listings returned from API
                    // adding a message to the concert listings portion of the page
                } else if (Concertlistings === 0) {

                    // clearing previous search li elements
                    Concertslocation.innerHTML = "";

                    // creating new <li> element with message that there are no concerts to display
                    var createLiItemNone = document.createElement("li");
                    createLiItemNone.innerHTML = "Sorry looks like there are no upcoming concert dates";
                    Concertslocation.appendChild(createLiItemNone);

                }
            })
        }
    })
}


// function to get artist releases and set them as <li> DOM elements in the discography section
var getArtistReleases = function() {
    // api url includes artistfullID variable and search for albums and return JSON format
    var apiURL = "https://musicbrainz.org/ws/2/release-group?artist=" + artistFullID + "&type=album&!secondary-types&fmt=json";

    // fetching data and returning response in JSON format
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

                // The first album in discography is set here for testing purposes 
                var firstAlbum = data["release-groups"][0].title;


                ArtistDiscogFirstAlbum = firstAlbum;
                console.log("the first album in discog is " + ArtistDiscogFirstAlbum);

                // variable for discography UL location  so <li> elements can be appended there
                var discographylocation = document.querySelector("#artist-discography");

                // clearing any <li> elements from previous search 
                discographylocation.innerHTML = "";

                // parsing the length of the array so that we can use it in the for loop
                var ArtistAlbums = parseInt(data["release-groups"].length);

                // for loop which will cycle through the array until it meets 10 or the length of the array
                // then setting the album title and the album release date
                for (i = 0; i < ArtistAlbums && i < 11; i++) {
                    var firstAlbumList = data["release-groups"][i].title;
                    var albumReleaseDate = data["release-groups"][i]["first-release-date"];
                    // creating <li> elements here and appending them to the discography location on page
                    var createLiItem = document.createElement("li");
                    createLiItem.innerHTML = firstAlbumList + "(" + albumReleaseDate + ")";
                    discographylocation.appendChild(createLiItem);
                }
            })
        }
    })

    // function to call out and get artist concerts
    getArtistConcerts();
}


// function to get artist information - mostly to grab ID so we can send it to get discography
var getArtistInformation = function() {
    // varible for URL that includes artist name in new format last name, first name and asking for JSON format
    var apiURL = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistNameSearchCriteria + "%20AND%20&fmt=json";



    // fetching data and JSON the data
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

                // setting id for artist name so we can pass it through the  get discopgraphy releases function
                var artistID = data.artists[0].id;
                console.log(artistID);
                artistFullID = artistID;

                // calling function to get artist discography releases from musicbrainz API
                getArtistReleases();

            });
        }
    });
}

// function to get artist name from input and split and remormat to lasnt name, first name
var getArtistName = function() {
    var ArtistNameEntered = artistNameInput.value.trim();
    artistFullName = ArtistNameEntered;

    // splitting the artist name entered at the space
    artistNameSplit = artistFullName.split(" ");

    //setting the first name of the artist search 
    ArtistFirstName = artistNameSplit[0];

    // setting the last name of the artist search
    ArtistLastName = artistNameSplit[1];

    // creating teh musicbrainz required search query format of artist last name, first name
    artistNameSearchCriteria = (ArtistLastName + "," + ArtistFirstName);

    // calling the function to get youtube content and passing it the artist's full name
    getVideos(artistFullName);


    // calling the function to call teh musicbrainz api to get artist ID and info
    getArtistInformation();

    //function to set the artist name as search entered
    setArtistName();
}



// event listener to get artist name input by user in the input text box
artistNameInput.addEventListener("change", getArtistName);