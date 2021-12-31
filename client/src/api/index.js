
import axios from 'axios';

const url = 'http://localhost:3060/';
const movie_url = 'movie/'
const home_url = 'home/'
const profile_url = 'authentication/profile/'
const board_url = 'getboard/'
const board_id_url = 'getboard/id'

const getAll = (user_id) => {
    return axios.post(url+home_url, {userid: user_id})
}

const getByID = (movie_id, user_id) => {
    let new_url = url + movie_url + movie_id
    return axios.post(new_url, {movie_id, user_id})
}

const getProfile = (user_id, board_id) => { 
    return axios.post(url+profile_url, {user_id, board_id})
}

const getProfileBoards = (user_id) => { 
    return axios.post(url+profile_url+board_url, {user_id})
}

const getProfileBoard = (user_id, board_id) => { 
    return axios.post(url+profile_url+board_id_url, {user_id, board_id})
}


export default { getAll, getByID, getProfile, getProfileBoards, getProfileBoard}