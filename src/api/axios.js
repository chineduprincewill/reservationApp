import axios from 'axios';

export default axios.create({
    baseURL: 'https://lcm-project.herokuapp.com/api/admin'
});