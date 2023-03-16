import axios from 'axios'
import React from 'react'
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallelPage = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map( id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        })
    );
    console.log("🚀 ~ file: DynamicParallel.page.js:18 ~ DynamicParallelPage ~ ̥", queryResults);

  return (
    <div>DynamicParallelPage</div>
  )
}

export default DynamicParallelPage;