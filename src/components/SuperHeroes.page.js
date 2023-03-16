import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
}

const SuperHeroesPage = () => {
    const [isLoading, setIsloading] =  useState(false);
    const [error, setIsError] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        setIsloading(true);
        fetchSuperHeroes().then(data => {
            setData(data.data);
            setIsloading(false)
        }).catch(err => {
            setIsError(err)
            setIsloading(false);
        });
    }, []);
  
    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(error && error.message) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
        <h2>RQ Super Heroes Page</h2>
        {
            data.map(hero => {
                return <div key={hero.id}>{hero.name}</div>
            })
        }
        </>
    )
}

export default SuperHeroesPage;