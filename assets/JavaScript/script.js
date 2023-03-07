//Wrapped everything in the on doc load:
document.addEventListener('DOMContentLoaded', function() {
 //Pop up modal:
let htmlSubmitBtn = document.getElementById('innerSubmit');
let submitBtn = document.getElementById('submit');
let modalEl = document.getElementById('modal');
let cancelBtn = document.getElementById('cancel');
let faveTeamCont = document.getElementById('faveTeams');
//Deals with the on html submit btn
htmlSubmitBtn.addEventListener('click', function(e){
    e.preventDefault();
    let searchedTeam = document.getElementById('formSearch').value;
    savedTeam(searchedTeam);
    let teamName = searchedTeam + " highlight round";
    getYoutube(teamName);
    formSearch.value = '';
})
//Deals with the modal submit btn:
submitBtn.addEventListener('click', function(e){
  e.preventDefault();
   modalEl.classList.add('hide');
   let searchedTeam = document.getElementById('modalSearch').value;
   savedTeam(searchedTeam);
   let teamName = searchedTeam + " highlight round";
   getYoutube(teamName);
   formSearch.value = '';
});
let storedTeams = JSON.parse(localStorage.getItem('storedTeams')) || [];
//Cancel btn:
cancelBtn.addEventListener('click', function(e){
   e.preventDefault();
   modalEl.classList.add('hide');
})
faveClearBtn.addEventListener('click', function(){
    window.localStorage.clear();
    storedTeams = [];
    faveTeamCont.innerHTML = '';
})
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
    //Gets the teams saved on load:
    returnTeam();

const footballAPIkey = 'caf956943f00c7484c8ee343fb5a56b22a6b7195aa7db3bc3ec6bb4d64097792'
let today = new Date();
let yesterdayminus5 = new Date();
let yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);
yesterdayminus5.setDate(yesterdayminus5.getDate()-5);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();




dd = String(yesterday.getDate()).padStart(2, '0');
mm = String(yesterday.getMonth() + 1).padStart(2, '0');
yyyy = yesterday.getFullYear();


yesterday = yyyy + '-' + mm + '-' + dd

dd = String(yesterdayminus5.getDate()).padStart(2, '0');
mm = String(yesterdayminus5.getMonth() + 1).padStart(2, '0');
yyyy = yesterdayminus5.getFullYear();

yesterdayminus5 = yyyy + '-' + mm + '-' + dd

function pastMatches (stageName) {
    fetch(`https://apiv3.apifootball.com/?action=get_events&from=${yesterdayminus5}&to=${yesterday}&country_id=44&league_id=149&APIkey=` + footballAPIkey)
    .then(function(resp) {
        return resp.json()
})
    .then(function(data) {
        const pastMatchData = data.map(item => {
            return {
            matchID: item.match_id,
            Date: item.match_date,
            hometeamName: item.match_hometeam_name,
            awayteamName: item.match_awayteam_name,
            homeBadge: item.team_home_badge,
            awayBadge: item.team_away_badge,
            leagueName: item.league_name,
            homeScore: item.match_hometeam_ft_score,
            awayScore: item.match_awayteam_ft_score

        };
    });
    console.log('--->'+(JSON.stringify(pastMatchData)));
        displayPastMatches(pastMatchData);
})
}
pastMatches();

function displayPastMatches (data) {
    const pastGamesContainer = document.querySelector('#pastCont');
    const allPastGamesContainer = document.querySelector('#display-all-past-division');
    const pastSouthernLeagueContainer = document.querySelector('#southern-south-past');
    const pastSouthernCentralLeagueContainer = document.querySelector('#southern-central-past');
    const pastNorthernLeagueContainer = document.querySelector('#northern-past');
    const pastIsthmianLeagueContainer = document.querySelector('#isthmian-past');

    function displayAllPast () {
        for (let i = 0; i < data.length; i++) {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('pastmatch');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('past-match-date');
            matchDate.textContent = data[i].Date;

            const homeMatchScore = document.createElement('h2');
            homeMatchScore.classList.add('home-match-result');
            homeMatchScore.textContent = data[i].homeScore + ' - ' + data[i].awayScore

            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-past');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up2');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('past-match-up', 'homeBadgePast');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('past-match-up', 'awayBadgePast');
            awayTeamBadge.src = data[i].awayBadge;
    
            
            
            matchDate.textContent = data[i].matchDate;
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
            //data.find searches for the match ID that corresponds with the current iteration and applies that to the upcmomingData Modal
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeMatchScore);
            matchDiv.appendChild(matchDate);
            allPastGamesContainer.appendChild(matchDiv);
        }
    }
    function displaySouthSouthPast () {
        for (let i = 0; i < data.length; i++) {
            
            if (data[i].leagueName === "Non League Premier - Southern South") {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('pastmatch');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('past-match-date');
            matchDate.textContent = data[i].Date;

            const homeMatchScore = document.createElement('h2');
            homeMatchScore.classList.add('home-match-result');
            homeMatchScore.textContent = data[i].homeScore + ' - ' + data[i].awayScore


            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-past');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up2');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('past-match-up');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('past-match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeMatchScore);
            matchDiv.appendChild(matchDate);
            pastSouthernLeagueContainer.appendChild(matchDiv);
            }}
    }
    function displaySouthCentralPast () {
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Southern Central") {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('pastmatch');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('past-match-date');
            matchDate.textContent = data[i].Date;

            const homeMatchScore = document.createElement('h2');
            homeMatchScore.classList.add('home-match-result');
            homeMatchScore.textContent = data[i].homeScore + ' - ' + data[i].awayScore

            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-past');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up2');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('past-match-up');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('past-match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
           
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeMatchScore);
            matchDiv.appendChild(matchDate);
            pastSouthernCentralLeagueContainer.appendChild(matchDiv);
            }
    }
    }
    function displayNorthPast () {
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Northern") {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('pastmatch');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('past-match-date');
            matchDate.textContent = data[i].Date;

            const homeMatchScore = document.createElement('h2');
            homeMatchScore.classList.add('home-match-result');
            homeMatchScore.textContent = data[i].homeScore + ' - ' + data[i].awayScore

            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-past');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up2');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('past-match-up');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('past-match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
           
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeMatchScore);
            matchDiv.appendChild(matchDate);
            pastNorthernLeagueContainer.appendChild(matchDiv);
        }
        
    }
    }
    function displayIshtmianPast () {
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Isthmian") {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('pastmatch');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('past-match-date');
            matchDate.textContent = data[i].Date;

            const homeMatchScore = document.createElement('h2');
            homeMatchScore.classList.add('home-match-result');
            homeMatchScore.textContent = data[i].homeScore + ' - ' + data[i].awayScore

            const divisionName = document.createElement('h2');
            divisionName.classList.add('division-name-past');
    
            const matchUp = document.createElement('h2');
            matchUp.classList.add('match-up2');
    
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('past-match-up');
            homeTeamBadge.src = data[i].homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('past-match-up');
            awayTeamBadge.src = data[i].awayBadge;
    
            
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
           
            console.log(data[i].matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeMatchScore);
            matchDiv.appendChild(matchDate);
            pastIsthmianLeagueContainer.appendChild(matchDiv);
            }
    }
    }
    const displayPastSouthSouthBtn = document.querySelector('#display-past-south-south');
    const displayPastSouthCentralBtn = document.querySelector('#display-past-south-central');
    const displayPastNorthBtn = document.querySelector('#display-past-north');
    const displayPastIsthmianBtn = document.querySelector('#display-past-isthmian');
    const displayPastAllButtonbtn = document.querySelector('#display-past-all');

    pastSouthernLeagueContainer.style.display='none';
    pastSouthernCentralLeagueContainer.style.display='none';
    pastNorthernLeagueContainer.style.display='none';
    pastIsthmianLeagueContainer.style.display='none';
    allPastGamesContainer.style.display='block';

    displayAllPast();

    displayPastSouthSouthBtn.addEventListener('click', function(){
        pastSouthernLeagueContainer.style.display='block';
        pastSouthernCentralLeagueContainer.style.display='none';
        pastNorthernLeagueContainer.style.display='none';
        pastIsthmianLeagueContainer.style.display='none';
        allPastGamesContainer.style.display='none';
        displaySouthSouthPast();
       })
    
    displayPastSouthCentralBtn.addEventListener('click', function(){
        pastSouthernLeagueContainer.style.display='none';
        pastSouthernCentralLeagueContainer.style.display='block';
        pastNorthernLeagueContainer.style.display='none';
        pastIsthmianLeagueContainer.style.display='none';
        allPastGamesContainer.style.display='none';
        displaySouthCentralPast();
    })
    
    displayPastNorthBtn.addEventListener('click', function(){
        pastSouthernLeagueContainer.style.display='none';
        pastSouthernCentralLeagueContainer.style.display='none';
        pastNorthernLeagueContainer.style.display='block';
        pastIsthmianLeagueContainer.style.display='none';
        allPastGamesContainer.style.display='none';
        displayNorthPast();
    })

    displayPastIsthmianBtn.addEventListener('click', function(){
        pastSouthernLeagueContainer.style.display='none';
        pastSouthernCentralLeagueContainer.style.display='none';
        pastNorthernLeagueContainer.style.display='none';
        pastIsthmianLeagueContainer.style.display='block';
        allPastGamesContainer.style.display='none';
        displayIshtmianPast();
    })

    displayPastAllButtonbtn.addEventListener('click', function(){
        pastSouthernLeagueContainer.style.display='none';
        pastSouthernCentralLeagueContainer.style.display='none';
        pastNorthernLeagueContainer.style.display='none';
        pastIsthmianLeagueContainer.style.display='none';
        allPastGamesContainer.style.display='block';
        displayAllPast();
   })
   return pastGamesContainer;
}

//Formats the API call to only call the current day and to a specified date
//Set tommorrow to 5 days so that there is always games displaying
//A future update could allow the user to choose the specified number fo games they went to see and when
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+5);

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
            awayLineUp: item.lineup.away,
            homeStartLineupPlayer: item.lineup.home.starting_lineups,
            awayStartLineupPlayer: item.lineup.away.starting_lineups,
            stagekey: item.fk_stage_key
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
        matchDataModalCont.innerHTML = '';

            const clickedMatch = data.find(match => match.matchID === matchID);

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('modal-match');
          
            const matchDate = document.createElement('h2');
            matchDate.classList.add('modal-match-date');
            matchDate.textContent = 'Date: ' + clickedMatch.matchDate;
          
            const matchTime = document.createElement('h2');
            matchTime.classList.add('modal-match-time');
            matchTime.textContent = 'Time: ' + clickedMatch.time;
           
            const homeTeamBadge = document.createElement('img');
            homeTeamBadge.classList.add('modal-match-up-img-1');
            homeTeamBadge.src = clickedMatch.homeBadge;
    
            const awayTeamBadge = document.createElement('img');
            awayTeamBadge.classList.add('modal-match-up-img-2');
            awayTeamBadge.src = clickedMatch.awayBadge;
          
            const divisionName = document.createElement('h2');
            divisionName.classList.add('modal-division-name-upcoming');
          
            const matchUp = document.createElement('h1');
            matchUp.classList.add('modal-match-up');
            matchUp.textContent = clickedMatch.hometeamName + ' VS. ' + clickedMatch.awayteamName;

            const matchDataStadium = document.createElement('h3');
            matchDataStadium.classList.add('match-data-stadium');
            matchDataStadium.textContent = 'Stadium: ' + clickedMatch.stadium;

        //  home player line ups table
           
        const homeMatchLineups = document.createElement('table'); 
        homeMatchLineups.classList.add('pure-table', 'homeTable');

        const homeLineupHeader = document.createElement('h3');
        homeLineupHeader.classList.add('homeLineupHeader');
        homeLineupHeader.textContent = 'Home Starting Line up';

        const homethead = document.createElement('thead');
        const hometr = document.createElement('tr');
        const homethPlayer = document.createElement('th');
        homethPlayer.textContent = 'Player';
        const homethNumber = document.createElement('th');
        homethNumber.textContent = 'Number';
        const homethPosition = document.createElement('th');
        homethPosition.textContent = 'Position';

        hometr.appendChild(homethPlayer);
        hometr.appendChild(homethNumber);
        hometr.appendChild(homethPosition);
        homethead.appendChild(hometr);
        homeMatchLineups.appendChild(homethead);
        const teamhomeLineUp = clickedMatch.homeStartLineupPlayer;
        const hometbody = document.createElement('tbody');

        console.log(teamhomeLineUp);
if (clickedMatch.homeStartLineupPlayer.length !== 0){
        teamhomeLineUp.forEach(item => {
        const hometr = document.createElement('tr');
        const hometdPlayer = document.createElement('td');
        hometdPlayer.textContent = item.lineup_player
        const hometdNumber = document.createElement('td');
        hometdNumber.textContent = item.lineup_number
        const hometdPosition = document.createElement('td');
        if (item.lineup_position === '1') {
        hometdPosition.textContent = 'GoalKeeper'
        } else if (item.lineup_position === '2') {
        hometdPosition.textContent = 'Right Center Back'
        } else if (item.lineup_position === '3') {
            hometdPosition.textContent = 'Left Wing Back'
        } else if (item.lineup_position === '4') {
            hometdPosition.textContent = 'Left Center Back'
        } else if (item.lineup_position === '5') {
            hometdPosition.textContent = 'Center Back'
        } else if (item.lineup_position === '6') {
            hometdPosition.textContent = 'Defensive MidField'
        } else if (item.lineup_position === '7') {
            hometdPosition.textContent = 'Right Wing Back'
        } else if (item.lineup_position === '8') {
            hometdPosition.textContent = 'Central Midfield'
        } else if (item.lineup_position === '9') {
            hometdPosition.textContent = 'Striker'
        } else if (item.lineup_position === '10') {
            hometdPosition.textContent = 'Attacking Midfield'
        } else if (item.lineup_position === '11') {
            hometdPosition.textContent = 'Central Forward'
        } else {
            hometdPosition.textContent = 'N/A' 
        }
        hometr.appendChild(hometdPlayer);
        hometr.appendChild(hometdNumber);
        hometr.appendChild(hometdPosition);
        hometbody.appendChild(hometr);
        });
    } else if (clickedMatch.homeStartLineupPlayer.length === 0) {
            const NAhometr = document.createElement('tr');
            const NAhometdPlayer = document.createElement('td');
            NAhometdPlayer.textContent = 'N/A'
            const NAhometdNumber = document.createElement('td');
            NAhometdNumber.textContent = 'N/A'
            const NAhometdPosition = document.createElement('td');
            NAhometdPosition.textContent = 'N/A'
            NAhometr.appendChild(NAhometdPlayer);
            NAhometr.appendChild(NAhometdNumber);
            NAhometr.appendChild(NAhometdPosition);
            hometbody.appendChild(NAhometr);
    }
        //away players lineup   
        const awayMatchLineups = document.createElement('table'); 
        awayMatchLineups.classList.add('pure-table', 'awayTable');

        const awayLineupHeader = document.createElement('h3');
        awayLineupHeader.classList.add('awayLineupHeader');
        awayLineupHeader.textContent = 'Away Starting Line up';

        const awaythead = document.createElement('thead');
        const awaytr = document.createElement('tr');
        const awaythPlayer = document.createElement('th');
        awaythPlayer.textContent = 'Player';
        const awaythNumber = document.createElement('th');
        awaythNumber.textContent = 'Number';
        const awaythPosition = document.createElement('th');
        awaythPosition.textContent = 'Position';

        awaytr.appendChild(awaythPlayer);
        awaytr.appendChild(awaythNumber);
        awaytr.appendChild(awaythPosition);
        awaythead.appendChild(awaytr);
        awayMatchLineups.appendChild(awaythead);
        const awayteamLineUp = clickedMatch.awayStartLineupPlayer;
        const awaytbody = document.createElement('tbody');
        //Table container:
    
        if (clickedMatch.awayStartLineupPlayer.length !== 0) {
        awayteamLineUp.forEach(item => {
        const awaytr = document.createElement('tr');
        const awaytdPlayer = document.createElement('td');
        awaytdPlayer.textContent = item.lineup_player
        const awaytdNumber = document.createElement('td');
        awaytdNumber.textContent = item.lineup_number
        const awaytdPosition = document.createElement('td');
        if (item.lineup_position === '1') {
        awaytdPosition.textContent = 'GoalKeeper'
        } else if (item.lineup_position === '2') {
        awaytdPosition.textContent = 'Right Center Back'
        } else if (item.lineup_position === '3') {
            awaytdPosition.textContent = 'Left Wing Back'
        } else if (item.lineup_position === '4') {
            awaytdPosition.textContent = 'Left Center Back'
        } else if (item.lineup_position === '5') {
            awaytdPosition.textContent = 'Center Back'
        } else if (item.lineup_position === '6') {
            awaytdPosition.textContent = 'Defensive MidField'
        } else if (item.lineup_position === '7') {
            awaytdPosition.textContent = 'Right Wing Back'
        } else if (item.lineup_position === '8') {
            awaytdPosition.textContent = 'Central Midfield'
        } else if (item.lineup_position === '9') {
            awaytdPosition.textContent = 'Striker'
        } else if (item.lineup_position === '10') {
            awaytdPosition.textContent = 'Attacking Midfield'
        } else if (item.lineup_position === '11') {
            awaytdPosition.textContent = 'Central Forward'
        } else {
            awaytdPosition.textContent = 'N/A' 
        }
        awaytr.appendChild(awaytdPlayer);
        awaytr.appendChild(awaytdNumber);
        awaytr.appendChild(awaytdPosition);
        awaytbody.appendChild(awaytr);
        });
    } else if (clickedMatch.awayStartLineupPlayer.length === 0) {
            const NAawaytr = document.createElement('tr');
            const NAawaytdPlayer = document.createElement('td');
            NAawaytdPlayer.textContent = 'N/A'
            const NAawaytdNumber = document.createElement('td');
            NAawaytdNumber.textContent = 'N/A'
            const NAawaytdPosition = document.createElement('td');
            NAawaytdPosition.textContent = 'N/A'
            NAawaytr.appendChild(NAawaytdPlayer);
            NAawaytr.appendChild(NAawaytdNumber);
            NAawaytr.appendChild(NAawaytdPosition);
            awaytbody.appendChild(NAawaytr);
    }

            const dataMatchRef = document.createElement('h3');
            dataMatchRef.classList.add('match-data-stadium');
            dataMatchRef.textContent = 'Match Referee: ' + clickedMatch.matchRef;
          
            const exitButton = document.createElement('button');
            exitButton.classList.add('pure-button', 'cancelMatchData');
            exitButton.textContent = 'Close';

            exitButton.addEventListener('click',() => {
                matchDataModal.style.display = 'none'
            })

            console.log(clickedMatch.homeStartLineupPlayer);
            
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchTime);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(matchDataStadium);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(dataMatchRef);
            matchDiv.appendChild(homeMatchLineups);
            homeMatchLineups.appendChild(hometbody);
            awayMatchLineups.appendChild(awaytbody);
            matchDiv.appendChild(homeLineupHeader);
            matchDiv.appendChild(homeMatchLineups);
            matchDiv.appendChild(awayLineupHeader);
            matchDiv.appendChild(awayMatchLineups);
            matchDiv.appendChild(exitButton);
            matchDataModalCont.appendChild(matchDiv);
        
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
            //data.find searches for the match ID that corresponds with the current iteration and applies that to the upcmomingData Modal
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                const clickedMatchID = data[i].matchID;
                const clickedMatch = data.find(match => match.matchID === clickedMatchID);
                
                console.log(clickedMatch.matchID);
              
                matchDataModal.style.display = 'block';
                upcomingDataModal(clickedMatchID);
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
        if (data[i].leagueName === "Non League Premier - Southern South") {
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
            const clickedMatchID = data[i].matchID;
            const clickedMatch = data.find(match => match.matchID === clickedMatchID);
            
            console.log(clickedMatch.matchID);
          
            matchDataModal.style.display = 'block';
            upcomingDataModal(clickedMatchID);
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
    }

    //displays southern central league
    function southernCentral() {
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Southern Central") {
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
                const clickedMatchID = data[i].matchID;
                const clickedMatch = data.find(match => match.matchID === clickedMatchID);
                
                console.log(clickedMatch.matchID);
              
                matchDataModal.style.display = 'block';
                upcomingDataModal(clickedMatchID);
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
    }
    //displays northern league
    function northern() {
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Northern") {
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
                const clickedMatchID = data[i].matchID;
                const clickedMatch = data.find(match => match.matchID === clickedMatchID);
                
                console.log(clickedMatch.matchID);
              
                matchDataModal.style.display = 'block';
                upcomingDataModal(clickedMatchID);
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
    }

    //displays isthmian league
    function isthmian() {
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Isthmian") {
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
                const clickedMatchID = data[i].matchID;
                const clickedMatch = data.find(match => match.matchID === clickedMatchID);
                
                console.log(clickedMatch.matchID);
              
                matchDataModal.style.display = 'block';
                upcomingDataModal(clickedMatchID);
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
//matches();
// Video part

 var API_key = 'AIzaSyBC4cr3gdI2bXZmNufq6UTyeadrAIdRb4Y';

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

//Jorge Standngs
function displayStandingsTable(stageName) {
const footballAPIkey2 = 'b68068c14aa1be71d20cd0ab16889081f580d11f4a028a039beaf15cf855e34d'

fetch("https://apiv3.apifootball.com/?action=get_standings&league_id=149&APIkey=" + footballAPIkey2).then((data)=>{
//console.log(data);
return data.json(); //converted data to json
}).then((objectData)=>{
let tableData="";
tableData += `
<thead>
  <tr class="league-standings-container">
    <th class="league-standings-column" scope="col"><h3 class="positionTitle">Position</h3></th>
    <th class="league-standings-column" scope="col"><h3 class="teamTitle">Team</h3></th>
    <th class="league-standings-column" scope="col"><h3 class="winsTitle">W</h3></th>
    <th class="league-standings-column" scope="col"><h3 class="drawTitle">D</h3></th>
    <th class="league-standings-column" scope="col"><h3 class="lossTitle">L</h3></th>
    <th class="league-standings-column" scope="col"><h3 class="totalTitle">PTS</h3></th>
  </tr>
</thead>
`;
objectData.filter((values) => values.stage_name === stageName)
    .forEach(values => {

  tableData+=`<tr class="teamRow">
  <td class="teamPosition">#${values.overall_league_position}</td>
  <td class="teamName">${values.team_name}</td>
  <td class="teamWins">${values.overall_league_W}</td>
  <td class="teamDraw">${values.overall_league_D}</td>
  <td class="teamLoss">${values.overall_league_L}</td>
  <td class="teamTotal">${values.overall_league_PTS}</td>
</tr>`
  
});
console.log('--->'+(JSON.stringify(objectData)));
document.querySelector('.league-table').innerHTML = tableData;

})
.catch(error => console.error(error));

}
const displaySouthSouthTable = document.querySelector('#display-south-south-league');
const displaySouthCentralTable = document.querySelector('#display-south-central-league');
const displayNorthTable = document.querySelector('#display-north-league');
const displayIsthmianTable = document.querySelector('#display-isthmian-league');

const southernSouthTableHeading = document.querySelector("#south-south-table-heading");
southernSouthTableHeading.style.display = "block";

displayStandingsTable('Southern South');

const southernCentralTableHeading = document.querySelector("#southern-central-table-heading");
southernCentralTableHeading.style.display = "none";

const northernTableHeading = document.querySelector("#northern-table-heading");
northernTableHeading.style.display = "none";

const isthmianTableHeading = document.querySelector("#isthmian-table-heading");
isthmianTableHeading.style.display = "none";

// Event handler for displaySouthSouthTable
displaySouthSouthTable.addEventListener('click', function() {
    console.log('Displaying South South Table');
    southernSouthTableHeading.style.display = "block";
    southernCentralTableHeading.style.display = "none";
    northernTableHeading.style.display = "none";
    isthmianTableHeading.style.display = "none";
    // Call function to display South South table
    displayStandingsTable('Southern South');
  });
  
  // Event handler for displaySouthCentralTable
  displaySouthCentralTable.addEventListener('click', function() {
    console.log('Displaying South Central Table');
    southernSouthTableHeading.style.display = "none";
    southernCentralTableHeading.style.display = "block";
    northernTableHeading.style.display = "none";
    isthmianTableHeading.style.display = "none";
    // Call function to display South Central table
    displayStandingsTable('Southern Central');
  });
  
  // Event handler for displayNorthTable
  displayNorthTable.addEventListener('click', function() {
    console.log('Displaying North Table');
    southernSouthTableHeading.style.display = "none";
    southernCentralTableHeading.style.display = "none";
    northernTableHeading.style.display = "block";
    isthmianTableHeading.style.display = "none";
    // Call function to display North table
    displayStandingsTable('Northern');
  });
  
  // Event handler for displayIsthmianTable
  displayIsthmianTable.addEventListener('click', function() {
    console.log('Displaying Isthmian Table');
    southernSouthTableHeading.style.display = "none";
    southernCentralTableHeading.style.display = "none";
    northernTableHeading.style.display = "none";
    isthmianTableHeading.style.display = "block";
    // Call function to display Isthmian table
    displayStandingsTable('Isthmian');
  });

  displayPastMatches();
  displayUpcomingMatches();

})//&from=${today}&to=2023-03-09&league_id=153

