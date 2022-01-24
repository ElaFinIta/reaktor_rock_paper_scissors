class FetchWrapper {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    get(endpoint) {
      return fetch(this.baseURL + endpoint);
    }
}


const compareHands = (firstPlayer, opponent) => {
  switch(firstPlayer+opponent) {
      case 'SCISSORSPAPER':
      case 'ROCKSCISSORS':
      case 'PAPERROCK':
          return 'won';
      case 'PAPERSCISSORS':
      case 'SCISSORSROCK':
      case 'ROCKPAPER':
          return 'lost';
      case 'SCISSORSSCISSORS':
      case 'PAPERPAPER':
      case 'ROCKROCK':
          return 'DRAW';
      default: return 'unknown';
  }
};
 
// add possibly 2 players if not in players list
const addPlayerObjectFromGame = (playersObjectsList, game) => {
  if (!playersObjectsList.some(player => player.name === game.playerA.name)) {
      playersObjectsList.push({'name': game.playerA.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'hands': {
          'SCISSORS': 0, 'ROCK': 0, 'PAPER':0, 'mostPlayed': 'rock'
      }})
  }
  if (!playersObjectsList.some(player => player.name === game.playerB.name)) {
      playersObjectsList.push({'name': game.playerB.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'hands': {
          'SCISSORS': 0, 'ROCK': 0, 'PAPER':0, 'mostPlayed': 'rock'
      }})
  }
}

// add stats to 2 players from one game
const addOneGameStats = (playersObjectsList, game) => {
  const playerA = game.playerA;
  const playerB = game.playerB;
  const playersStats = playersObjectsList;

  const addStatsToPlayer = (playerA, playerB) => {
    playersStats.map(player => player.name === playerA.name ?
      (player.totGames += 1)
      && (player.hands[playerA.played] += 1)
      && ((compareHands(playerA.played, playerB.played) === 'won') ? (player.wins += 1) : 'unknown') 
      // updating wins ratio
      && (player.winRatio = (player.wins/player.totGames))
      // updating most played hand
      && ((player.hands.SCISSORS > player.hands.ROCK && player.hands.SCISSORS > player.hands.PAPER) ? player.hands.mostPlayed = 'SCISSORS' :
      (player.hands.ROCK > player.hands.SCISSORS &&  player.hands.ROCK > player.hands.PAPER) ? (player.hands.mostPlayed = 'ROCK') :
      (player.hands.PAPER> player.hands.SCISSORS &&  player.hands.PAPER > player.hands.ROCK) ? (player.hands.mostPlayed = 'PAPER') : 'unknown')
      : 'unknown');   
  }


  // possibly add 1 to total game count, played hand, won/lost/draw  FOR PLAYER A
  addStatsToPlayer(playerA, playerB);
  // possibly add 1 to total game count, played hand, won/lost/draw  FOR PLAYER A
  addStatsToPlayer(playerB, playerA);

                      
}

module.exports = { FetchWrapper, compareHands, addOneGameStats, addPlayerObjectFromGame};