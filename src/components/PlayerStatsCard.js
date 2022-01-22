import React from 'react';
import paper from './assets/hand-paper-solid.svg';
import rock from './assets/hand-rock-solid.svg';
import scissors from './assets/hand-scissors-solid.svg';

const PlayerStatsCard = ({name, gamesCount, wins, winRatio, mostPlayed}) => {
    return (
        <div className="card_wrapper">
            <div className="stats_card">
                <h1>{name.toUpperCase()}</h1>
                <p>Total games: {gamesCount}</p>
                <p>Wins: {wins}</p>
                <p>Win ratio: {winRatio}</p>
                <p>Most played: {mostPlayed}</p>
            </div>
        </div>
    );
};

export default PlayerStatsCard;