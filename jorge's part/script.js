const footballAPIkey = 'c66d1b90ed21e945a34e8153c2cc93ab9f41916e4b6cd9e5553bde102fcd08be'

//{"country_id":"44","country_name":"England","league_id":"153","league_name":"Championship","league_season":"2022/2023"

https://apiv3.apifootball.com/?action=get_standings&league_id=149&APIkey=c66d1b90ed21e945a34e8153c2cc93ab9f41916e4b6cd9e5553bde102fcd08be

fetch("https://apiv3.apifootball.com/?action=get_standings&league_id=149&APIkey=c66d1b90ed21e945a34e8153c2cc93ab9f41916e4b6cd9e5553bde102fcd08be").then((data)=>{
//console.log(data);
return data.json(); //converted data to json
}).then((objectData)=>{
console.log(objectData[0].title);
let tableData="";
objectData.filter((values) => values.stage_name === 'Northern').map((values)=>{


  tableData+=`<tr>
  <td>${values.stage_name}</td>
  <td>${values.overall_league_position}</td>
  <td>${values.team_name}</td>
  <td>${values.overall_league_W}</td>
  <td>${values.overall_league_D}</td>
  <td>${values.overall_league_L}</td>
  <td>${values.overall_league_PTS}</td>
</tr>`
  


});
console.log(tableData);
document.getElementById("the_table").innerHTML=tableData;

})




