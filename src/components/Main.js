import React, { useEffect, useState } from 'react';
import { FetchWrapper } from './fetch-wrapper';
import Table from 'react-bootstrap/Table';
import '../index.css';
import paper from './assets/hand-paper-solid.svg';
import rock from './assets/hand-rock-solid.svg';
import scissors from './assets/hand-scissors-solid.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveGames from './LiveGames';

const url = 'https://bad-api-assignment.reaktor.com';
const historyEndpoint = '/rps/history';
const API = new FetchWrapper(url);
const pagesToFetch = 20;

const Main = () => {
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);

    let page = 0;
    let allTimePlayers = [];

    const getGames = (cursor, historyGames = []) => {
        if (page < pagesToFetch) {  // max number of pages to fetch (total 1468 ca)
            try {
                // console.log('page', page);
                // recursion to get all historical data
                return API.get(cursor ? cursor : historyEndpoint)
                    .then(response => response.json()) 
                    .then(results => {
                        if (results.data.length < 1) return historyGames;
                        historyGames.push.apply(historyGames, results.data);
                        setGames(games => [...games, historyGames].flat());
                        page += 1;
                        // console.log('historyGames:', historyGames);
                        for (let game of historyGames) {
                            // add player if not in list
                            if (!allTimePlayers.some(player => player.name === game.playerA.name)) {
                                allTimePlayers.push({'name': game.playerA.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'hands': {
                                    'SCISSORS': 0, 'ROCK': 0, 'PAPER':0, 'mostPlayed': 'rock'
                                }})
                            }
                            if (!allTimePlayers.some(player => player.name ===game.playerB.name)) {
                                allTimePlayers.push({'name': game.playerB.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'hands': {
                                    'SCISSORS': 0, 'ROCK': 0, 'PAPER':0, 'mostPlayed': 'rock'
                                }})
                            }
                            // possibly add 1 to total game count, played hand, won/lost/draw  FOR PLAYER A
                            allTimePlayers.map(player => player.name === game.playerA.name ?
                            (player.totGames += 1)
                            && (player.hands[game.playerA.played] += 1)
                            && ((compareHands(game.playerA.played, game.playerB.played) === 'won') ? (player.wins += 1) : 'unknown') 
                            // updating wins ratio
                            && (player.winRatio = player.wins/player.totGames) 
                            // updating most played hand
                            && ((player.hands.SCISSORS > player.hands.ROCK && player.hands.SCISSORS > player.hands.PAPER) ? player.hands.mostPlayed = 'SCISSORS' :
                            (player.hands.ROCK > player.hands.SCISSORS &&  player.hands.ROCK > player.hands.PAPER) ? (player.hands.mostPlayed = 'ROCK') :
                            (player.hands.PAPER> player.hands.SCISSORS &&  player.hands.PAPER > player.hands.ROCK) ? (player.hands.mostPlayed = 'PAPER') : 'unknown')
                            : 'unknown');


                            // possibly add 1 to total game count, played hand, won/lost/draw FOR PLAYER B
                            allTimePlayers.map(player => player.name === game.playerB.name ?
                            (player.totGames += 1)
                            && (player.hands[game.playerB.played] += 1)
                            && ((compareHands(game.playerB.played, game.playerA.played) === 'won') ? (player.wins += 1) : 'unknown') 
                            // updating wins ratio
                            && (player.winRatio = (player.wins/player.totGames))
                            // updating most played hand
                            && ((player.hands.SCISSORS > player.hands.ROCK && player.hands.SCISSORS > player.hands.PAPER) ? player.hands.mostPlayed = 'SCISSORS' :
                            (player.hands.ROCK > player.hands.SCISSORS &&  player.hands.ROCK > player.hands.PAPER) ? (player.hands.mostPlayed = 'ROCK') :
                            (player.hands.PAPER> player.hands.SCISSORS &&  player.hands.PAPER > player.hands.ROCK) ? (player.hands.mostPlayed = 'PAPER') : 'unknown')
                            : 'unknown');                       

                        }
                        return getGames(results.cursor, historyGames);
                    });
            } catch (err) {
                console.error(err);
            }
        }         
        setPlayers(players => allTimePlayers.filter(player => !players.includes(player)));
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


    useEffect(() => {
        getGames();
    }, []);


    return (
        <div className="main">
            <div className="history">
                <h2>Games played: {games.length}</h2>
                <h2>Players in total: {players.length}</h2>
                <h3>[Fetched pages:{pagesToFetch}]</h3>
                <Table striped bordered hover size="sm" className='history_table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Total games</th>
                            <th>Wins</th>
                            <th>Win ratio</th>
                            <th>{<img src={rock} alt='rock'/>}</th>
                            <th>{<img src={paper} alt='paper'/>}</th>
                            <th>{<img src={scissors} alt='scissor'/>}</th>
                            <th>Most played</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players ? (players.map((player, i) => {
                            return (<tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{player ? player.name : '---'}</td>
                                        <td>{player ? player.totGames : '---'}</td>
                                        <td>{player ? player.wins : '---'}</td>
                                        <td>{player ? (Math.round(player.winRatio  * 100) / 100).toFixed(2) : '---'}</td>
                                        <td>{player.hands.ROCK}</td>
                                        <td>{player.hands.PAPER}</td>
                                        <td>{player.hands.SCISSORS}</td>
                                        <td><img src={player.hands.mostPlayed==='ROCK' ? rock : player.hands.mostPlayed==='SCISSORS' ? scissors : player.hands.mostPlayed==='PAPER' ? paper : 'unknown'} alt={player.hands.mostPlayed}/></td>
                            </tr>)
                        })) : 'unknown'}
                    </tbody>
                </Table>
            </div>
            <LiveGames />
        </div>
    );
};

export default Main;