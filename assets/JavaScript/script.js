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
            awayBadge: item.away_home_badge,
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
    const southernLeagueContainer = document.querySelector('#southern-south-upcoming');
    const southernCentralLeagueContainer = document.querySelector('#southern-central-upcoming');
    const northernLeagueContainer = document.querySelector('#northern-upcoming');
    const isthmianLeagueContainer = document.querySelector('#isthmian-upcoming')
    function southernSouth() {
    for (let i = 0; i < data.length; i++) {
        
        if (data[i].leagueName === "Non League Premier - Southern South") {
            if (counter < 3) {
        
        const matchDate = document.createElement('h2');
        const homeTeam = document.createElement('h3');
        const awayTeam = document.createElement('h3');
        const leagueDivison = document.createElement('h4');
        const matchStadium = document.createElement('h5');
        const moreButton = document.createElement('button');
        
        
        matchDate.textContent = data[i].matchDate;
        leagueDivison.textContent = data[i].leagueName;
        homeTeam.textContent = data[i].hometeamName + ' VS.';
        awayTeam.textContent = data[i].awayteamName;
        matchStadium.textContent = data[i].stadium;
        moreButton.textContent = 'Match Data';
        moreButton.addEventListener('click', () => {
            console.log(data[i].homeLineUp)
          });
        console.log(data[i].matchDate);
        console.log(data[i].stadium);
        
        southernLeagueContainer.appendChild(matchDate);
        southernLeagueContainer.appendChild(leagueDivison);
        southernLeagueContainer.appendChild(homeTeam);
        southernLeagueContainer.appendChild(awayTeam);
        southernLeagueContainer.appendChild(matchStadium);
        southernLeagueContainer.appendChild(moreButton);
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
            const matchDate = document.createElement('h2');
            const homeTeam = document.createElement('h3');
            const awayTeam = document.createElement('h3');
            const leagueDivison = document.createElement('h4');
            const matchStadium = document.createElement('h5');
            const moreButton = document.createElement('button');
            matchDate.textContent = data[i].matchDate;
            leagueDivison.textContent = data[i].leagueName;
            homeTeam.textContent = data[i].hometeamName + ' VS.';
            awayTeam.textContent = data[i].awayteamName;
            matchStadium.textContent = data[i].stadium;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].homeLineUp)
              });
            console.log(data[i].matchDate);
            southernCentralLeagueContainer.appendChild(matchDate);
            southernCentralLeagueContainer.appendChild(leagueDivison);
            southernCentralLeagueContainer.appendChild(homeTeam);
            southernCentralLeagueContainer.appendChild(awayTeam);
            southernCentralLeagueContainer.appendChild(matchStadium);
            southernCentralLeagueContainer.appendChild(moreButton);
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
            const matchDate = document.createElement('h2');
            const homeTeam = document.createElement('h3');
            const awayTeam = document.createElement('h3');
            const leagueDivison = document.createElement('h4');
            const matchStadium = document.createElement('h5');
            const moreButton = document.createElement('button');
            matchDate.textContent = data[i].matchDate;
            leagueDivison.textContent = data[i].leagueName;
            homeTeam.textContent = data[i].hometeamName + ' VS.';
            awayTeam.textContent = data[i].awayteamName;
            matchStadium.textContent = data[i].stadium;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].homeLineUp);
                console.log(data[i].matchRef);
              });
            console.log(data[i].matchDate);
            northernLeagueContainer.appendChild(matchDate);
            northernLeagueContainer.appendChild(leagueDivison);
            northernLeagueContainer.appendChild(homeTeam);
            northernLeagueContainer.appendChild(awayTeam);
            northernLeagueContainer.appendChild(matchStadium);
            northernLeagueContainer.appendChild(moreButton);
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
            const matchDate = document.createElement('h2');
            if (counter < 3) {
            const homeTeam = document.createElement('h3');
            const awayTeam = document.createElement('h3');
            const leagueDivison = document.createElement('h4');
            const matchStadium = document.createElement('h5');
            const moreButton = document.createElement('button');
            matchDate.textContent = data[i].matchDate;
            leagueDivison.textContent = data[i].leagueName;
            homeTeam.textContent = data[i].hometeamName + ' VS.';
            awayTeam.textContent = data[i].awayteamName;
            matchStadium.textContent = data[i].stadium;
            moreButton.textContent = 'Match Data';
            moreButton.addEventListener('click', () => {
                console.log(data[i].homeLineUp)
              });
            console.log(data[i].matchDate);
            isthmianLeagueContainer.appendChild(matchDate);
            isthmianLeagueContainer.appendChild(leagueDivison);
            isthmianLeagueContainer.appendChild(homeTeam);
            isthmianLeagueContainer.appendChild(awayTeam);
            isthmianLeagueContainer.appendChild(matchStadium);
            isthmianLeagueContainer.appendChild(moreButton);
            counter++;
            } else {
                break;
            }
        }}
    }
    southernSouth();
    southernCentral();
    northern();
    isthmian();

return upcomingGamesContainer;
}

displayUpcomingMatches();

})//&from=${today}&to=2023-03-09&league_id=153