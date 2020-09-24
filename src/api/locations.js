import axios from '@/api'

export const fetchLocations = page => {
  return axios({
    url: `/location?page=${page}`
  })
}
