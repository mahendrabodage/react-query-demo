import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
}
const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends');
}

const ParallerQueriesPage = () => {
    const {data: superhero} = useQuery('super-heroes',  fetchSuperHeroes);
    const { data: friends} = useQuery('friends', fetchFriends);

    console.log(superhero, friends);

  return (
    <div>ParallerQueriesPage</div>
  )
}

export default ParallerQueriesPage