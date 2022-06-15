var videoContainer = document.querySelector(".video-container");

var apiLink = "https://www.googleapis.com/youtube/v3/search?"
var youtubeKey = "AIzaSyAVipUFCUajMgvasF6xv_p18pu4uLXmhcE"
var youtubeUrl = 'https://www.youtube.com/watch?v='
var search = "The offspring"
console.log(apiLink)
var url= `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeKey}&q=${search}&maxResults=3`;

var myFunction = function(){
    fetch(url).then(function(response){
        console.log(url)
        console.log(response)
        if(response.ok){
            response.json().then(function(data){

                var videos = data.items;
                for(video of videos){
                    videoContainer.innerHTML += `
                    <div class="video-item">
                        <a href="${youtubeUrl + video.id.videoId}" class="video-link" target="_blank"> 
                        ${video.snippet.title}</a>
                        <img class="video-img" src="${video.snippet.thumbnails.default.url}" />
                    </div>
                    `
                    // console.log(video.snippet.title)
                    // console.log(video.snippet.thumbnails.default.url)
                    // console.log( youtubeUrl + video.id.videoId )

                }
            })
            
        }
        else{
            console.log("error")
        }
    })
}
// myFunction()