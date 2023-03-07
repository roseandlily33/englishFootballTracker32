# Football Project
Group 1 Project - Football website to see stats, scores, and videos about English Football Teams.

## Description:
A non-premier league english football tracker that shows you your desired favourite team, stores that in a list on localStorage, and dynamically updates the infomation on that screen depending on the team you chose. It uses 2 API's: APIfootball (for the information about the team selected) and the youtube api(to show videos on the team selected). The motivation for creating this web application is becasue there are not many web applications that contain the whole non-premier league. Majority of web applications only show a single league at a time, it solves the problem of having to utilize multiple websites to track the league.

## Screenshots:
<img width="1279" alt="Screenshot 2023-03-06 at 4 14 58 PM" src="https://user-images.githubusercontent.com/109821108/223223606-4cc72831-2e67-4136-b915-f2210109654d.png">
<img width="1264" alt="Screenshot 2023-03-06 at 5 05 39 PM" src="https://user-images.githubusercontent.com/109821108/223230861-39977dc3-fa16-4954-bb1d-cc61a5386aaa.png">



## Live URL:
https://roseandlily33.github.io/englishFootballTracker32/

## Usage:
When the screen loads your presented with a input text box that shows a couple of different teams that you can search for if you don't know which one you want, on submit your taken to the main page, where you can see dynamically added information with a search bar on the side that keeps track of your searches for teams in local storage and displays them on the screen. To search for a new team, simply type in a team on the left hand side search bar and press search. 

## Difficulties:
The difficulties that we faced the most was the actual API's because we needed free ones, there was limited information that we could select from them, including the amount of it, then halfway through the project the API changed the information that it was giving us. For example found a free video API, and could only display one when we wanted too. We were also trying to display the information for the top players in that team, but the API we were using didn't let us do that so we had to change it to past games. We also encountar an API limit where we could not call "yesterday" variable to call only a set date from the current date. We set a fixed date to by pass that issue. The API also did not have the LineUp data or the Referee for most matches.

## Problem it solves:
The problem that it solves as being an avid non-premiere league english football watcher that I would like to see results based on the team that I chose. There isn't a whole lot of information about and now with our website you can see everything all in one spot.

## Future Development:
For future development we are looking to add the following:
- Individual player data
- Top Players section (Goal scorers, assists, and saves (Goalkeepers))
- The ability to click into a team on the league standings section
- Add last 5 game results within the league standings section
- More Statisics for past games (shots on goal, red cards, etc)
- Video section to include extra sections, including news and interviews
- The option to bring up a full schedule within the upcoming and past games sections

## Style Process:
Wireframe:
<img width="720" alt="Screenshot 2023-02-27 at 11 09 02 AM" src="https://user-images.githubusercontent.com/109821108/222232952-b8d4e0aa-edde-4496-92ec-ad7804cda158.png">
Google Fonts: We went with option #2
<img width="1166" alt="Screenshot 2023-02-27 at 12 21 24 PM" src="https://user-images.githubusercontent.com/109821108/222232959-4d92936e-d824-4dbf-a007-837755ffc572.png">
The colour story based on the english football league: 
-Colours in the webpage, are these exact colours using a colour selector to get the hex value.
![IMG_7273](https://user-images.githubusercontent.com/109821108/222234802-ff3cd3b3-86e4-4f7d-9b47-f21edcc614bd.PNG)

## Technologies Used
- Javascript
- HTML5
- PureCSS
  - https://purecss.io/

## Authors:
Jonson Allen, Jiasi Li, Jorge Reyes, & Victoria Benoit


