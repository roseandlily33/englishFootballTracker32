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
    getYoutube(searchedTeam);
  //  searchedTeam.value = "";
})
//Deals with the modal submit btn
submitBtn.addEventListener('click', function(e){
  e.preventDefault();
   modalEl.classList.add('hide');
   //get the value
   let searchedTeam = document.getElementById('modalSearch').value;
   savedTeam(searchedTeam);
   getYoutube(searchedTeam);
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
    fetch( `https://apiv3.apifootball.com/?action=get_events&from=2023-02-20&to=${tomorrow}&country_id=44&league_id=149&APIkey=` + footballAPIkey)
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
            awayStartLineupPlayer: item.lineup.away.starting_lineups


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
        homeMatchLineups.classList.add('pure-table');

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
        awayMatchLineups.classList.add('pure-table');

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
            exitButton.classList.add('pure-button', '#cancelMatchData');
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

// Video part

/* var API_key = 'AIzaSyB5AIbZ5SalzjOQv_gvCFoBPp_yCqj-oNU%20';

var searchBtn = document.getElementById('innerSubmit');

var teamName = '';



searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var userInput = document.getElementById('formSearch');
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

init(); */

displayUpcomingMatches();


})//&from=${today}&to=2023-03-09&league_id=153


