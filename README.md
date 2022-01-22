# Rock-paper-scissors match results from API


## Steps
1. [x] get a response from the history endpoint https://bad-api-assignment.reaktor.com/rps/history
Error message:
Access to fetch at 'https:...' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
Dirty workaround that won't work in production:
Chrome CORS extension: adds the Access-Control-Allow-Origin: * header to all responses.

2. [x] Get list of players from the first page of history data: match results displayed vary, not a static page. Players for the first page are 150+
3. [x] Put players into hook
4. [x] Get stats for selected player
4. [ ] Show stats decently
3. [ ] Get total number of data pages to check how many they are
4. [ ] Get all player from history pages
5. [ ]
6. [ ]



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

### Credits:

- Scissors, rock, paper icons from Font Awasome. License: https://fontawesome.com/license