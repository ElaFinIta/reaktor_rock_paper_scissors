import React from 'react';
import Table from 'react-bootstrap/Table';
import paper from './assets/hand-paper-solid.svg';
import rock from './assets/hand-rock-solid.svg';
import scissors from './assets/hand-scissors-solid.svg';

const History = ({games, players, fetchedPages}) => {
    return (
<div className="history">
                <h2>Games played: {games.length} for {fetchedPages} fetched ages</h2>
                <h2>Players in total: {players.length}</h2>
                <Table striped bordered hover size="sm" className='history_table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player</th>
                            <th>Win ratio</th>
                            <th>Wins</th>
                            <th>{<img src={rock} alt='rock'/>}</th>
                            <th>{<img src={paper} alt='paper'/>}</th>
                            <th>{<img src={scissors} alt='scissor'/>}</th>
                            <th>Total games</th>
                            <th>Most played</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players ? (players.map((player, i) => {
                            return (<tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{player ? player.name : '---'}</td>
                                        <td>{player ? (Math.round(player.winRatio  * 100) / 100).toFixed(2) : '---'}</td>
                                        <td>{player ? player.wins : '---'}</td>
                                        <td>{player.hands.ROCK}</td>
                                        <td>{player.hands.PAPER}</td>
                                        <td>{player.hands.SCISSORS}</td>
                                        <td>{player ? player.totGames : '---'}</td>
                                        <td><img src={player.hands.mostPlayed==='ROCK' ? rock : player.hands.mostPlayed==='SCISSORS' ? scissors : player.hands.mostPlayed==='PAPER' ? paper : 'unknown'} alt={player.hands.mostPlayed}/></td>
                            </tr>)
                        })) : 'unknown'}
                    </tbody>
                </Table>
            </div>
    );
};

export default History;