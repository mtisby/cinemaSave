
import axios from 'axios';

const url = 'http://localhost:3060/';
const movie_url = 'movie/'

const getAll = () => {
    return axios.get(url)
}

const getByID = (movie_id) => {
    let new_url = url + movie_url + movie_id
    return axios.post(new_url, {id: movie_id})
}

export default { getAll, getByID}