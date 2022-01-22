import axios from 'axios';
import React, { useEffect} from 'react';


const SimpleGet= () => {
    const url = 'https://bad-api-assignment.reaktor.com';
    const resultEndpoint = '/rps/history';

    useEffect(() => {
        let thisPagePlayers = [];
        const fetchData = async () => {
            try {
                const response  = await axios.get(url+resultEndpoint);
                console.log(response);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="app">
            <p> Players:</p>
        </div>
    );
};

export default SimpleGet;