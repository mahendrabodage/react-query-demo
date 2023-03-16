import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request } from '../utils/axios.utils';

const fetchSuperHeroes = () => {
    //return axios.get('http://localhost:4000/superheroes');
    return request({ url: '/superheroes'});
}

const useSuperHeroesData = (onSuccess, onError) => {

   return useQuery(
        'super-heroes',
         fetchSuperHeroes,
         {
           // refetchInterval: 2000,
           // refetchIntervalInBackground: true
           //enabled: false
           onSuccess,
           onError,
        //    select: (data) => {
        //     const superHeroNames = data.data.map(hero => hero.name)
        //     return superHeroNames;
        //    }
         }
        );
}
const addSuperHero = (hero) => {
  //return axios.post('http://localhost:4000/superheroes', hero);
  return request({ url: '/superheroes', method: 'post', data: hero});
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   //queryClient.invalidateQueries('super-heroes')
    //   queryClient.setQueryData('super-heroes', (oldData) => {
    //     return {
    //       ...oldData,
    //       data:[...oldData.data, data.data],
    //     }
    //   })
    // },
    onMutate: async(newHero) => {
      await queryClient.cancelQueries('super-heroes'); 
      const prevHeroData = queryClient.getQueryData('super-heroes', (oldData) => {
        return {
          ...oldData,
          data:[...oldData.data, {id: oldData?.data?.length + 1, ...newHero}],
        }
      });
      return {
        prevHeroData,
      }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.prevHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
}
export default useSuperHeroesData;