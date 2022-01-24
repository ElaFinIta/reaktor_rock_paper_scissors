import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FetchWrapper, addOneGameStats, addPlayerObjectFromGame} from './utils';
import LiveGames from './LiveGames';
import History from './History';

const url = 'https://bad-api-assignment.reaktor.com';
const historyEndpoint = '/rps/history';
const API = new FetchWrapper(url);
const pagesToFetch = 20;

const Main = () => {
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    // const [reverseWinRatio, setReverseWinRatio] = useState(false);

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
                            addPlayerObjectFromGame(allTimePlayers, game);
                            addOneGameStats(allTimePlayers, game);
                        }
                        return getGames(results.cursor, historyGames);
                    });
            } catch (err) {
                console.error(err);
            }
        }
        const playersSortedWinRatio= _.sortBy(allTimePlayers, 'winRatio');
        setPlayers(players => _.reverse(playersSortedWinRatio.filter(player => !players.includes(player))));
    }

    const reverseWinRatio = () => {
        setPlayers(players => players.reverse());
    }

    useEffect(() => {
        getGames();
        reverseWinRatio();
    }, []);


    return (
        <div className="main">
            <History games={games} players={players} fetchedPages={pagesToFetch}/>
            <LiveGames />
        </div>
    );
};

export default Main;