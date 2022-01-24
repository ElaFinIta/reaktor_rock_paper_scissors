# Rock-paper-scissors match results from API

A pre-assignment for Reaktor summer 2022 developer 

Link to live site:
https://festive-curran-ea684c.netlify.app/


### Task

Your task is to implement a web application that displays rock-paper-scissors match results. The web application must display the games as they are in progress, and you must also be able to look at historical results of individual players. In addition, the currently ongoing games must be visible at all times.

The historical results must include all games that a player has played and it must also include the following aggregate data: win ratio, total number of matches played, and the most played hand (rock, paper, or scissors).

There are two API endpoints running at https://bad-api-assignment.reaktor.com. /rps/history which returns a page of historical data, and a path for the next page of data. Be aware that there are many pages of data. The other endpoint /rps/live is a WebSocket API and will send events to connected clients as they happen.

Your application does not need to look especially pretty (but it won’t hurt) but it should be fast and snappy, showing data to the end user as fast as possible and being up-to-date with the backend.

In no particular order, we especially pay attention to the following details when looking at your submission:

- Readability of the code as whole
- Performance and maintainability
- Technology and library choices made
- User interface and experience

## Technology and libraries
- REACT
- React-boostrap for Table

## Steps
1. [x] get a response from the history endpoint https://bad-api-assignment.reaktor.com/rps/history
Error message:
Access to fetch at 'https:...' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
Dirty workaround that won't work in production:
Chrome CORS extension: adds the Access-Control-Allow-Origin: * header to all responses.

2. [x] Get list of players from the first page of history data: match results displayed vary, not a static page. Players for the first page are 150+
3. [x] Put players into hook
4. [x] Get stats for selected player
5. [x] Get total number of data pages to check how many they are: 1460+
6. [x] Get all players (170) from history pages. After 499 pages fetched >>> 420 error (Too Many Requests)
Attempted to slow down fetches with setTimeout() but it turned out to be to slow. Only fetching a small amount of pages (20) at first stage of development.
7. [x] Show stats decently. Icons showing too, yay! :D
8. [x] Show live games from websocket :D
9. [ ] Get all and updated history data. Tic tac, tic tac...  time is unfortunately almost over.
10. [ ] Add sorting for stats...

## Screenshots:

![screenshot of the paper-rock-scissors UI](screenshot.png?raw=true "screenshot of the paper-rock-scissors UI")

## Self-assessment

This assignment was great fun and also a bit of a pain :D
I learned a lot and I'm looking forwards to seeing a model solution. 

- Readability of the code as whole: some parts are neat and clean, some others horrible and I won't probably be able to read them myself in a couple of weeks
- Performance and maintainability: not fetching ALL historical data. I wonder how it is properly done. I really would like to see a model solution for it. Websocket was totally unknow to me.
- Technology and library choices made: REACT and a little bit of bootstrap fro the Table to practise it. I did not invest much time in CSS.
-  User interface and experience: to be improved >>> user could be able to select a player. Sorting the list would also be nice.



### Credits:

- Scissors, rock, paper icons from Font Awasome. License: https://fontawesome.com/license
- emotional support from Business College Helsinki Full Stack programme dear fellow students :D https://github.com/SaaraLeppis, https://github.com/martin-holland, https://github.com/KatiRemo