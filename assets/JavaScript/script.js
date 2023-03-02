document.addEventListener('DOMContentLoaded', function() {
const footballAPIkey = 'caf956943f00c7484c8ee343fb5a56b22a6b7195aa7db3bc3ec6bb4d64097792'

//{"country_id":"44","country_name":"England","league_id":"153","league_name":"Championship","league_season":"2022/2023"

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+3);
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

//Display items 
function displayUpcomingMatches(data) {
    let counter = 0
    const upcomingGamesContainer = document.querySelector('#upcomingCont');
    const allUpcomingGamesContainer = document.querySelector('#display-all-division');
    const southernLeagueContainer = document.querySelector('#southern-south-upcoming');
    const southernCentralLeagueContainer = document.querySelector('#southern-central-upcoming');
    const northernLeagueContainer = document.querySelector('#northern-upcoming');
    const isthmianLeagueContainer = document.querySelector('#isthmian-upcoming')

    function displayAll () {
        for (let i = 0; i < data.length; i++) {

            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');
    
            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const divisionName = document.createElement('h3');
            divisionName.classList.add('division-name');
    
            const matchUp = document.createElement('h3');
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
            divisionName.textContent = data[i].leagueName;
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
              });
            console.log(data[i].matchDate);
    
            
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(divisionName);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(moreButton);
            allUpcomingGamesContainer.appendChild(matchDiv);
        }
    }

    function southernSouth() {
    for (let i = 0; i < data.length; i++) {
        
        if (data[i].leagueName === "Non League Premier - Southern South") {
            if (counter < 3) {
                
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');

        const matchDate = document.createElement('h2');
        matchDate.classList.add('match-date');

        const matchUp = document.createElement('h3');
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
        matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
        moreButton.textContent = 'Match Data';
        moreButton.addEventListener('click', () => {
            console.log(data[i].stadium)
          });
        console.log(data[i].matchDate);

        southernLeagueContainer.appendChild(matchDiv);
        matchDiv.appendChild(matchDate);
        matchDiv.appendChild(homeTeamBadge);
        matchDiv.appendChild(awayTeamBadge);
        matchDiv.appendChild(matchUp);
        matchDiv.appendChild(moreButton);
        counter++;
        } else {
            break;
        }
    }
    }
    }

    function southernCentral() {
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Southern Central") {
                if (counter < 3) {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

             const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchUp = document.createElement('h3');
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
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
              });
            console.log(data[i].matchDate);

            southernCentralLeagueContainer.appendChild(matchDiv);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(moreButton);
            counter++;
            }else {
                break;
            }}}
    }
    
    function northern() {
        let counter = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].leagueName === "Non League Premier - Northern") {
                if (counter < 3) {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');
    
            const matchUp = document.createElement('h3');
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
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium);
                console.log(data[i].matchRef);
              });
            console.log(data[i].matchDate);
            northernLeagueContainer.appendChild(matchDiv);
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(moreButton);
            counter++
            } else {
                break;
            }
        }
      } 
        
    }

    function isthmian() {
        let counter = 0
        for (let i = 0; i < data.length; i++) {

            if (data[i].leagueName === "Non League Premier - Isthmian") {
            if (counter < 3) {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');

            const matchDate = document.createElement('h2');
            matchDate.classList.add('match-date');

            const matchUp = document.createElement('h3');
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
            matchUp.textContent = data[i].hometeamName + ' VS. ' + data[i].awayteamName;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].stadium)
              });
            console.log(data[i].matchDate);
            isthmianLeagueContainer.appendChild(matchDiv)
            matchDiv.appendChild(matchDate);
            matchDiv.appendChild(homeTeamBadge);
            matchDiv.appendChild(awayTeamBadge);
            matchDiv.appendChild(matchUp);
            matchDiv.appendChild(moreButton);
            counter++;
            } else {
                break;
            }
        }}
    }
    const displaySouthSouth = document.querySelector('#display-south-south');
    const displaySouthCentral = document.querySelector('#display-south-central');
    const displayNorth = document.querySelector('#display-north');
    const displayIsthmian = document.querySelector('#display-isthmian');
    const displayAllButton = document.querySelector('#display-all');



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

})//&from=${today}&to=2023-03-09&league_id=153