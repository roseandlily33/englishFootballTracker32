const footballAPIkey = 'caf956943f00c7484c8ee343fb5a56b22a6b7195aa7db3bc3ec6bb4d64097792'

//{"country_id":"44","country_name":"England","league_id":"153","league_name":"Championship","league_season":"2022/2023"

function matches(team) {
    fetch('https://apiv3.apifootball.com/?action=get_teams&league_id=153&APIkey=' + footballAPIkey)
    .then(function(resp) {
        return resp.json()

})
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
    })
    
    .catch(function()  {
    })
}

matches();

// Video part

var API_key = 'AIzaSyB5AIbZ5SalzjOQv_gvCFoBPp_yCqj-oNU%20';

var searchBtn = document.getElementById('searchButton');

var teamName = '';



searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var userInput = document.getElementById('searchInput');
    var teamName = userInput.value + " matches round";
    getYoutube(teamName);


});


function getYoutube(teamName) {

// q=England%20Championship
    console.log(teamName);

    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&order=date&q=${teamName}&topicId=sport&type=video&key=${API_key}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        
        var videoContainer = document.getElementById("youtube_container")
        
        // set video 1
        var video1Title = data.items[0].snippet.title;
        var videoSrc1 = "https://www.youtube.com/embed/" + data.items[0].id.videoId;

        console.log(video1Title);
        console.log(videoSrc1);

        var video1Tl = document.getElementById('video1Tl');
        var youtubeVideo1 = document.getElementById('youtubeVideo1');


        video1Tl.textContent = video1Title;
        youtubeVideo1.setAttribute('src', videoSrc1);
         
        // set video 2
        var video2Title = data.items[1].snippet.title;
        var  videoSrc2 = "https://www.youtube.com/embed/" + data.items[1].id.videoId;

        console.log(video2Title);
        console.log(videoSrc2);

        var video2Tl = document.getElementById('video2Tl');
        var youtubeVideo2 = document.getElementById('youtubeVideo2');

        video2Tl.textContent = video2Title;
        youtubeVideo2.setAttribute('src', videoSrc2);

        }
            
            
        


    );

}

function init() {
    var teamName = 'England%20Championship';
    getYoutube(teamName);


};

init();

    