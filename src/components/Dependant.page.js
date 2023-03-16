import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/${email}`);
}

const fetchCoursesByChannelId = channelId => {
    return axios.get(`http://localhost:4000/${channelId}`);
}

const DependantPage = ({ email }) => {
    const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email));
    const channelId = user?.data.channelId;

    useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId,
    });
  return (
    <div>Dependant.page</div>
  )
}

export default DependantPage;