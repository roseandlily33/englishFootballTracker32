const footballAPIkey = 'caf956943f00c7484c8ee343fb5a56b22a6b7195aa7db3bc3ec6bb4d64097792'

//{"country_id":"44","country_name":"England","league_id":"153","league_name":"Championship","league_season":"2022/2023"

let today = new Date();
let tomorrow = new Date();
let tomorrowDate = tomorrow.setDate(tomorrow.getDate()+1);
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd
tomorrowDate = yyyy + '-' + mm + '-' + dd

function matches(team) {
    fetch(`https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${tomorrowDate}&league_id=153&APIkey=` + footballAPIkey)
    .then(function(resp) {
        return resp.json()

})
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
    })
    
    .catch(function()  {
    })
}

//match_date, match_time, match_hometeam_id/match_awayteam_id, match_hometeam_name/match_awayteam_name, match_stadium, team_home/away_badge, match_referee, league_year
//possibilities - lineup
matches();
