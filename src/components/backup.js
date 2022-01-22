import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { FetchWrapper } from './fetch-wrapper';

const url = 'https://bad-api-assignment.reaktor.com';
const resultEndpoint = '/rps/history';
// const API = new FetchWrapper(url);

const History = () => {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    // const [playerChosen, setPlayerChosen] = useState("");
    const [playerGames, setPlayerGames] = useState({});


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
                    default: return ''   
                }
            case 'PAPER':
                switch(opponent) {
                    case 'ROCK':
                        return 'won';
                    case 'PAPER':
                        return 'draw';
                    case 'SCISSORS':
                        return 'lost';
                    default: return ''
                }
            case 'SCISSORS':
                switch(opponent) {
                    case 'ROCK':
                        return 'lost';
                    case 'PAPER':
                        return 'won';
                    case 'SCISSORS':
                        return 'draw';
                    default: return ''
                }
            default: return ''
        }
    }

    // const log = () => {
    //     // console.log(compareHands("rock", "scissors"));
    //     // console.log('hook players:', players);
    // }

useEffect(() => {
        let thisPagePlayers = [];
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(url+resultEndpoint);
                setGames(response);
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        };
        // let resultsJson = API.get(resultEndpoint);
        // resultsJson.then((data) => {
        //     // console.log('data', data.data);
        //     for (let game of data.data) {
        //         if (!thisPagePlayers.includes(game.playerA.name)) {
        //             thisPagePlayers.push(game.playerA.name);
        //             // setPlayers(players => [...players, game.playerA.name]);
        //         }
        //         if (!thisPagePlayers.includes(game.playerB.name)) {
        //             thisPagePlayers.push(game.playerB.name);
        //             // setPlayers(players => [...players, game.playerB.name])
        //         } 
        //     }
        //     setPlayers(thisPagePlayers);
        // });
        fetchData();
    }, []);

    console.log(games.data);

    const playerStats = (player) => {
        let games = [];
        let totGames = 0;
        let won = 0;
        let lost = 0;
        let draw = 0;
        let scissors = 0;
        let rock = 0;
        let paper = 0;
        // let resultsJson = API.get(resultEndpoint);
        // resultsJson.then((data) => {
        //     for (let game of data.data) {
        //         if (game.playerA.name === player ||
        //             game.playerB.name === player) {
        //             games.push(game);
        //         }
        //     }
        //     setPlayerGames(games);
        //     console.log("Player games:", games);
        //     for (let game of games) {
        //         totGames += 1;
        //         if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerA.name === player) {
        //             won += 1;
        //         } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerA.name === player) {
        //             lost += 1;
        //         } else if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerB.name === player) {
        //             lost += 1;
        //         } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerB.name === player) {
        //             won += 1;
        //         } else {
        //             draw += 1;
        //         }
        //     }
        //     console.log('Games:', totGames, 'won:', won, 'lost:', lost, 'draw:', draw);

        //     return (<div className="stats">
        //                 <p>Number of games: {totGames}</p>
        //                 <p>Wins:</p>
        //                 <p>Win ratio:</p>
        //                 <p>Most played hand:</p>
        //             </div>)
        // });
    }

    // useEffect(() => {
    //     firstPagePlayers();
    // }, []);

    return (
        <div className="history">
            <p> Players:</p>
            {/* {log()} */}
            {/* <select placeholder="player"
                onChange={(e) => {
                playerStats(e.target.value);
            }}
            >
                <option key="default" value="" disabled selected>
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
            {/* <h2>Stats for {playerChosen}:</h2> */}
            {/* <div className="stats">
                <p>Number of games:</p>
                <p>Wins:</p>
                <p>Win ratio:</p>
                <p>Most played hand:</p>
            </div> */}
        </div>
    );
};

export default History;