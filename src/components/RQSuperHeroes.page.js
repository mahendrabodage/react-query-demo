import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSuperHeroesData, { useAddSuperHeroData } from '../hooks/useSuperHeroesData';



const RQSuperHeroesPage = () => {
    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");

    const { mutate: addHero, isLoading:isLoadingHero, isError: isErrorHero, error: errorHero } = useAddSuperHeroData();

    console.log("addSuperHero =====> ", isLoadingHero, isErrorHero, errorHero);

    const handleAddHeroClick = () => {
        console.log(name, alterEgo);
        const hero = {name, alterEgo};
        addHero(hero);
    }

    const onSuccess = (data) => {
        console.log('Perform side effect after data fetching', data);
    }
    const onError = (err) => {
        console.log('Perform side effect after encountering error', err);
    }
    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

    //console.log({isLoading, isFetching});
  
    if(isLoading || isFetching) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
        <h2>RQ Super Heroes Page</h2>
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
            <button onClick={() => handleAddHeroClick()}>Add Hero</button>
        </div>
        <button onClick={refetch}>Fetch Heroes</button>
        {
            data?.data.map(hero => {
                return <div key={hero.id}>
                   <Link to={`/rq-details-hero/${hero.id}`}>{hero.name}</Link> 
                </div>
            })
        }
        </>
    )
}

export default RQSuperHeroesPage;