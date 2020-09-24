import axios from '@/api'

export const fetchCharacter = (char = '') => {
  let url = char.indexOf('api') > -1 ? char : `https://rickandmortyapi.com/api/character/${char}`
  return axios({
    url
  })
}

export const fetchEpisode = url => {
  return axios({
    url
  })
}
