//Pop up modal:
let htmlSubmitBtn = document.getElementById('innerSubmit');
let submitBtn = document.getElementById('submit');
let modalEl = document.getElementById('modal');
let mainContent = document.getElementById('mainContent')
let cancelBtn = document.getElementById('cancel');
let faveTeamCont = document.getElementById('faveTeams');

let storedTeams = [];
//Cancel btn
cancelBtn.addEventListener('click', function(e){
   e.preventDefault();
   modalEl.classList.add('hide');
})
//Deals with the on html submit btn
htmlSubmitBtn.addEventListener('click', function(e){
    e.preventDefault();
    let searchedTeam = document.getElementById('formSearch').value;
    savedTeam(searchedTeam);
  //  searchedTeam.value = "";
})
//Deals with the modal submit btn
submitBtn.addEventListener('click', function(e){
  e.preventDefault();
   modalEl.classList.add('hide');
   //get the value
   let searchedTeam = document.getElementById('modalSearch').value;
   savedTeam(searchedTeam);
});
//Store in local storage:
function savedTeam(searchedTeam){
    storedTeams.push(searchedTeam);
     localStorage.setItem('storedTeams', JSON.stringify(storedTeams));
     console.log(storedTeams);
     returnTeam();
}
//Return from local storage:
function returnTeam(){
    faveTeamCont.innerHTML = "";
    let storedParse = JSON.parse(localStorage.getItem('storedTeams'));
    for(let i = 0; i < storedParse.length; i++){
        let showTeam = storedParse[i];
        let newli = document.createElement('h6');
        newli.textContent = showTeam;
        newli.classList.add('searchedFor');
        faveTeamCont.append(newli);
    }
}

document.addEventListener('DOMContentLoaded', function() {

const footballAPIkey = 'caf956943f00c7484c8ee343fb5a56b22a6b7195aa7db3bc3ec6bb4d64097792'

//{"country_id":"44","country_name":"England","league_id":"153","league_name":"Championship","league_season":"2022/2023"

//Formats the API call to only call the current day and to a specified date
//Set tommorrow to 5 days so that there is always games displaying
//A future update could allow the user to choose the specified number fo games they went to see and when
let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+5);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd

dd = String(tomorrow.getDate()).padStart(2, '0');
mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
yyyy = tomorrow.getFullYear();

tomorrow = yyyy + '-' + mm + '-' + dd

function upcomingMatches(team) {
    fetch( `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${tomorrow}&country_id=44&league_id=149&APIkey=` + footballAPIkey)
    .then(function(resp) {
        return resp.json()

})
    .then(function(data) {
         const matchData = data.map(item => {
            return {
            matchID: item.match_id,
            matchDate: item.match_date,
            time: item.match_time,
            hometeamID: item.match_hometeam_id,
            awayteamID: item.match_awaytem_id,
            hometeamName: item.match_hometeam_name,
            awayteamName: item.match_awayteam_name,
            stadium: item.match_stadium,
            homeBadge: item.team_home_badge,
            awayBadge: item.team_away_badge,
            matchRef: item.match_referee,
            leagueName: item.league_name,
            homeLineUp: item.lineup.home,
            awayLineUp: item.lineup.away
        };
    });
        console.log('--->'+(JSON.stringify(matchData)));
        displayUpcomingMatches(matchData);
    })
    
    .catch(function()  {
    }) 
}

//match_date, match_time, match_hometeam_id/match_awayteam_id, match_hometeam_name/match_awayteam_name, match_stadium, team_home/away_badge, match_referee, league_year
//possibilities - lineup
upcomingMatches();

//Displays Upcoming games
function displayUpcomingMatches(data) {
    const upcomingGamesContainer = document.querySelector('#upcomingCont');
    const allUpcomingGamesContainer = document.querySelector('#display-all-division');
    const southernLeagueContainer = document.querySelector('#southern-south-upcoming');
    const southernCentralLeagueContainer = document.querySelector('#southern-central-upcoming');
    const northernLeagueContainer = document.querySelector('#northern-upcoming');
    const isthmianLeagueContainer = document.querySelector('#isthmian-upcoming');
    const matchDataModal = document.querySelector ('#modalUpcoming');
    const matchDataModalCont = document.querySelector ('#modalContUpcoming')
    matchDataModal.style.display = 'none';

    function upcomingDataModal(matchID) {
        for (let i = 0; i < data.length; i++) {

        

        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');

        const matchDate = document.createElement('h2');
        matchDate.classList.add('match-date');

        const matchTime = document.createElement('h2');
        matchTime.classList.add('match-time');

        const divisionName = document.createElement('h2');
        divisionName.classList.add('division-name-upcoming');

        const matchUp = document.createElement('h2');
        matchUp.classList.add('match-up');

        const homeTeamBadge = document.createElement('img');
        homeTeamBadge.classList.add('match-up');
        homeTeamBadge.src = data[i].homeBadge;

        const awayTeamBadge = document.createElement('img');
        awayTeamBadge.classList.add('match-up');
        awayTeamBadge.src = data[i].awayBadge;

        const exitButton = document.createElement('button');
        exitButton.classList.add('pure-button', '#cancelMatchData');

            matchDate.textContent = data[i].matchDate;
            matchTime.textContent = data[i].time;
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            exitButton.textContent = 'Match Data';

            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(exitButton);
            matchDataModalCont.appendChild(matchDiv);
        }
        
    }

    // displays upcoming games for the next 5 days
    //display the data of the given match

    function displayAll () {
        for (let i = 0; i < data.length; i++) {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchTime = document.createElement('h2');
            matchTime.classList.add('match-time');

            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-upcoming');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('match-up');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            const moreButton = document.createElement('button');
            moreButton.classList.add('pure-button');
            
            
            matchDate.textContent = data[i].matchDate;
            matchTime.textContent = data[i].time;
            //Removes the non premier league portion of the league name
                if (data[i].leagueName === "Non League Premier - Northern") {
                    divisionName.textContent = 'Northern'
                } else if (data[i].leagueName === "Non League Premier - Southern South") {
                    divisionName.textContent = 'Southern South'
                } else if (data[i].leagueName === "Non League Premier - Southern Central") {
                    divisionName.textContent = 'Southern Central'
                } else if (data[i].leagueName === "Non League Premier - Isthmian") {
                    divisionName.textContent = 'Isthmian'
                }
            
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            //Match Data will appear in a modal when clicked
            //Take match ID and send it to the modal
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
                console.log(data[i].matchID)
                matchDataModal.style.display = 'block'
                upcomingDataModal(data[i].matchID)
              });
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchTime);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(moreButton);
            allUpcomingGamesContainer.appendChild(matchDiv);
        }
    }

    //displays southern south leagye
    function southernSouth() {
    for (let i = 0; i < data.length; i++) {
                
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');

        const matchDate = document.createElement('h2');
        matchDate.classList.add('match-date');

        const matchTime = document.createElement('h2');
        matchTime.classList.add('match-time');

        const matchUp = document.createElement('h2');
        matchUp.classList.add('match-up');

        const homeTeamBadge = document.createElement('img');
        homeTeamBadge.classList.add('match-up');
        homeTeamBadge.src = data[i].homeBadge;

        const awayTeamBadge = document.createElement('img');
        awayTeamBadge.classList.add('match-up');
        awayTeamBadge.src = data[i].awayBadge;

        const moreButton = document.createElement('button');
        moreButton.classList.add('pure-button');
        
        
        matchDate.textContent = data[i].matchDate;
        matchTime.textContent = data[i].time;
        matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
        moreButton.textContent = 'Match Data';
        moreButton.addEventListener('click', () => {
            console.log(data[i].stadium)
          });
        console.log(data[i].matchDate);

        southernLeagueContainer.appendChild(matchDiv);
        matchDiv.appendChild(matchUp);
        matchDiv.appendChild(homeTeamBadge);
        matchDiv.appendChild(awayTeamBadge);
        matchDiv.appendChild(matchTime);
        matchDiv.appendChild(matchDate);
        matchDiv.appendChild(moreButton);
    
    }
    }

    //displays southern central league
    function southernCentral() {


        for (let i = 0; i < data.length; i++) {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

             const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchTime = document.createElement('h2');
            matchTime.classList.add('match-time');

            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up');

            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('match-up');
            homeTeamBadge.src = data[i].homeBadge;

            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('match-up');
            awayTeamBadge.src = data[i].awayBadge;

            const moreButton = document.createElement('button');
            moreButton.classList.add('pure-button');

            matchDate.textContent = data[i].matchDate;
            matchTime.textContent = data[i].time;
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
              });
            console.log(data[i].matchDate);

            southernCentralLeagueContainer.appendChild(matchDiv);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchTime);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(moreButton);
            }
    }
    
    //displays northern league
    function northern() {
        
        for (let i = 0; i < data.length; i++) {
            
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchTime = document.createElement('h2');
            matchTime.classList.add('match-time');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up');

            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('match-up');
            homeTeamBadge.src = data[i].homeBadge;

            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            const moreButton = document.createElement('button');
            moreButton.classList.add('pure-button');

            matchDate.textContent = data[i].matchDate;
            matchTime.textContent = data[i].time;
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium);
                console.log(data[i].matchRef);
              });
            console.log(data[i].matchDate);
            northernLeagueContainer.appendChild(matchDiv);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchTime);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(moreButton);
            
      } 
        
    }

    //displays isthmian league
    function isthmian() {
        
        for (let i = 0; i < data.length; i++) {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchTime = document.createElement('h2');
            matchTime.classList.add('match-time');

            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up');

            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('match-up');
            homeTeamBadge.src = data[i].homeBadge;

            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('match-up');
            awayTeamBadge.src = data[i].awayBadge;


            const moreButton = document.createElement('button');
            moreButton.classList.add('pure-button');

            matchDate.textContent = data[i].matchDate;
            matchTime.textContent = data[i].time;
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
              });
            console.log(data[i].matchDate);
            isthmianLeagueContainer.appendChild(matchDiv)
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchTime);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(moreButton);
            
        }
    }

    //This section Configures the buttons to show desired league
    //Default is all leagues
    const displaySouthSouth = document.querySelector('#display-south-south');
    const displaySouthCentral = document.querySelector('#display-south-central');
    const displayNorth = document.querySelector('#display-north');
    const displayIsthmian = document.querySelector('#display-isthmian');
    const displayAllButton = document.querySelector('#display-all');

    southernLeagueContainer.style.display='none';
    southernCentralLeagueContainer.style.display='none';
    northernLeagueContainer.style.display='none';
    isthmianLeagueContainer.style.display='none';
    allUpcomingGamesContainer.style.display='block';

    displayAll();

    displaySouthSouth.addEventListener('click', function(){
        southernSouth(); 
        southernLeagueContainer.style.display='block';
        southernCentralLeagueContainer.style.display='none';
        northernLeagueContainer.style.display='none';
        isthmianLeagueContainer.style.display='none';
        allUpcomingGamesContainer.style.display='none';
       })
    
    displaySouthCentral.addEventListener('click', function(){
        southernCentral();
        southernLeagueContainer.style.display='none';
        southernCentralLeagueContainer.style.display='block';
        northernLeagueContainer.style.display='none';
        isthmianLeagueContainer.style.display='none';
        allUpcomingGamesContainer.style.display='none';
    })
    
    displayNorth.addEventListener('click', function(){
        northern();
        southernLeagueContainer.style.display='none';
        southernCentralLeagueContainer.style.display='none';
        northernLeagueContainer.style.display='block';
        isthmianLeagueContainer.style.display='none';
        allUpcomingGamesContainer.style.display='none';
    })

    displayIsthmian.addEventListener('click', function(){
         isthmian();
         southernLeagueContainer.style.display='none';
        southernCentralLeagueContainer.style.display='none';
        northernLeagueContainer.style.display='none';
        isthmianLeagueContainer.style.display='block';
        allUpcomingGamesContainer.style.display='none';
    })

    displayAllButton.addEventListener('click', function(){
        displayAll();
        southernLeagueContainer.style.display='none';
       southernCentralLeagueContainer.style.display='none';
       northernLeagueContainer.style.display='none';
       isthmianLeagueContainer.style.display='none';
       allUpcomingGamesContainer.style.display='block';
   })
   

return upcomingGamesContainer;
}


displayUpcomingMatches();

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


displayUpcomingMatches();


})//&from=${today}&to=2023-03-09&league_id=153


