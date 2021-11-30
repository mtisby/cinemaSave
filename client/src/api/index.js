
import axios from 'axios';

const url = 'http://localhost:3060';

export const fetchPosts = () => axios.get(url);