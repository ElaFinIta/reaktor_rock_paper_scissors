import React, { useEffect, useState } from 'react';
import { FetchWrapper } from './fetch-wrapper';
import Table from 'react-bootstrap/Table';
import '../index.css';
import paper from './assets/hand-paper-solid.svg';
import rock from './assets/hand-rock-solid.svg';
import scissors from './assets/hand-scissors-solid.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'https://bad-api-assignment.reaktor.com';
const historyEndpoint = '/rps/history';
const API = new FetchWrapper(url);
const pagesToFetch = 10;

const History = () => {
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);

    let page = 0;
    let allTimePlayers = [];

    const getGames = (cursor, historyGames = []) => {
        if (page < pagesToFetch) {  // max number of pages to fetch (total 1468 ca)
            try {
                console.log('page', page);
                // recursion to get all historical data
                return API.get(cursor ? cursor : historyEndpoint)
                    .then(response => response.json()) 
                    .then(results => {
                        if (results.data.length < 1) return historyGames;
                        historyGames.push.apply(historyGames, results.data);
                        setGames(games => [...games, historyGames].flat());
                        page += 1;
                        console.log('historyGames:', historyGames);
                        for (let game of historyGames) {
                            if (!allTimePlayers.some(player => player.name === game.playerA.name)) {
                                allTimePlayers.push({'name': game.playerA.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'mostPlayed': 'rock'})
                            }
                            if (!allTimePlayers.some(player => player.name ===game.playerB.name)) {
                                allTimePlayers.push({'name': game.playerB.name, 'totGames': 0, 'wins': 0, 'winRatio': 0, 'mostPlayed': 'scissors'})
                            }
                            
                        }
                        return getGames(results.cursor, historyGames);
                    });
            } catch (err) {
                console.error(err);
            }
        }         
        setPlayers(players => allTimePlayers.filter(player => !players.includes(player)));
        console.log('allTimePlayers', allTimePlayers);
        console.log('players', players);
    }

    const compareHands = (playerA, playerB) => {
        switch(playerA+playerB) {
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
        console.log('match:', compareHands('ROCK', 'PAPER'));
    }, []);

    // const playerStats = (player) => {

    //     let totGames = 0;
    //     let won = 0;
    //     let lost = 0;
    //     let draw = 0;
    //     let scissors = 0;
    //     let rock = 0;
    //     let paper = 0;

    //     resultsJson.then((data) => {
    //         for (let game of data.data) {
    //             if (game.playerA.name === player ||
    //                 game.playerB.name === player) {
    //                 games.push(game);
    //             }
    //         }
    //         setPlayerGames(games);
    //         console.log("Player games:", games);
    //         for (let game of games) {
    //             totGames += 1;
    //             if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerA.name === player) {
    //                 won += 1;
    //             } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerA.name === player) {
    //                 lost += 1;
    //             } else if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerB.name === player) {
    //                 lost += 1;
    //             } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerB.name === player) {
    //                 won += 1;
    //             } else {
    //                 draw += 1;
    //             }
    //         }
    //         console.log('Games:', totGames, 'won:', won, 'lost:', lost, 'draw:', draw);

    //         return (<div className="stats">
    //                     <p>Number of games: {totGames}</p>
    //                     <p>Wins:</p>
    //                     <p>Win ratio:</p>
    //                     <p>Most played hand:</p>
    //                 </div>)
    //     });
    // }

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
                            <th>Win ration</th>
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
                            <td>{player ? player.winRatio : '---'}</td>
                            <td><img src={(player.mostPlayed==='rock') ? rock : (player.mostPlayed==='scissors') ? scissors : (player.mostPlayed==='paper') ? paper : 'unknown'} alt={player.mostPlayed}/></td>
                            </tr>)
                        })) : 'unknown'}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default History;