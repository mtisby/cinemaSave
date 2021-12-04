
import axios from 'axios';

const url = 'http://localhost:3060/';

const getAll = () => {
    return axios.get(url)
}

const genre = () => {
    return axios.get(url+"genre")
}

export default { getAll, genre }