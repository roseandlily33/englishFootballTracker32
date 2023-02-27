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