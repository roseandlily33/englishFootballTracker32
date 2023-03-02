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

//matches();


