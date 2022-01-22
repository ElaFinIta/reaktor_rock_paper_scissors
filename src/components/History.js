import React, { useEffect, useState } from 'react';
import { FetchWrapper } from './fetch-wrapper';
import Table from 'react-bootstrap/Table';
import '../index.css';
import paper from './assets/hand-paper-solid.svg';
import rock from './assets/hand-rock-solid.svg';
import scissors from './assets/hand-scissors-solid.svg';

const url = 'https://bad-api-assignment.reaktor.com';
const historyEndpoint = '/rps/history';
const API = new FetchWrapper(url);

const History = () => {
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);

    let page = 0;

    const getGames = (cursor, historyGames = []) => {
        if (page < 10) {  // max number of pages to fetch (total 1468 ca)
            try {
                // recursion to get all historical data
                setTimeout(() => {  // timeout to avoid 429 (Too Many Request)
                    return API.get(cursor ? cursor : historyEndpoint)
                        .then(response => response.json()) 
                        .then(results => {
                            if (results.data.length < 1) return historyGames;
                            historyGames.push.apply(historyGames, results.data);
                            setGames(games => [...games, historyGames].flat());
                            page += 1;
                            return getGames(results.cursor, historyGames);
                        });
                    }, 1);  // 30 or 40 is the limit to make it work, too slow...
            } catch (err) {
                console.error(err);
            }
            console.log('page', page);
        }
    }

    const getPlayers = () => {
        if (games) {
            games.map((game) => {
                if (!players.includes(game.playerA.name)) {
                    setPlayers(players => [...players, game.playerA.name]);
                }
                if (!players.includes(game.playerB.name)) {
                    setPlayers(players => [...players, game.playerB.name]);
                }
                return true; 
            })
        }
    }

    const compareHands = (player, opponent) => {
        switch(player) {
            case 'ROCK':
            switch(opponent) {
                    case 'ROCK':
                        return 'draw';
                    case 'PAPER':
                        return 'lost';
                    case 'SCISSORS':
                        return 'won'
                    default: return 'result unknown'   
                }
            case 'PAPER':
                switch(opponent) {
                    case 'ROCK':
                        return 'won';
                    case 'PAPER':
                        return 'draw';
                    case 'SCISSORS':
                        return 'lost';
                    default: return 'result unknown' 
                }
            case 'SCISSORS':
                switch(opponent) {
                    case 'ROCK':
                        return 'lost';
                    case 'PAPER':
                        return 'won';
                    case 'SCISSORS':
                        return 'draw';
                    default: return 'result unknown' 
                }
            default: return 'result unknown' 
        }
    }

    useEffect(() => {
        getGames();
    }, []);

    // const playerStats = (player) => {
    //     let games = [];
    //     let totGames = 0;
    //     let won = 0;
    //     let lost = 0;
    //     let draw = 0;
    //     let scissors = 0;
    //     let rock = 0;
    //     let paper = 0;
    //     let resultsJson = API.get(historyEndpoint);
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
        <div className="history">
            <p> Players:</p>
            {/* <select defaultValue={'DEFAULT'}
                onChange={(e) => {
                setPlayerChosen(e.target.value);
            }}>
                <option key="default" value="DEFAULT" disabled>
                    Select player*
                </option>
                {players.map(obj => {
                    return (
                <option key={obj} value={obj}>
                    {obj}
                </option>
                );
                })}
            </select> */}
            {/* {playerChosen ? <PlayerStatsCard name={playerChosen} gamesCount={games} wins={games} winRatio={games} mostPlayed={games}/> : <div></div>} */}
            <Table striped bordered hover size="sm">
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
                    {games ? (games.map((game, i) => {
                        return (<tr key={i}>
                        <td>---</td>
                        <td>{game ? game.playerA.name : '---'}</td>
                        <td>3</td>
                        <td>0.33</td>
                        <td>0.3</td>
                        <td><img src={paper}alt='paper'></img></td>
                        </tr>)
                    })) : 'unknown'}
                </tbody>
            </Table>
        </div>
    );
};

export default History;