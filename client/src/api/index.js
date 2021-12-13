
import axios from 'axios';

const url = 'http://localhost:3060/';
const movie_url = 'movie/'
const home_url = 'home/'
const profile_url = 'authentication/profile/'

const getAll = () => {
    return axios.get(url+home_url)
}

const getByID = (movie_id) => {
    let new_url = url + movie_url + movie_id
    return axios.post(new_url, {id: movie_id})
}

const getProfile = (user_id) => { 
    return axios.post(url+profile_url, {user_id})
}

export default { getAll, getByID, getProfile}