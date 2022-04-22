import axios from 'axios'

const clientAxios = axios.create({
    baseURL: 'https://pnxwxr066j.execute-api.us-east-1.amazonaws.com/',
    //baseURL: 'http://localhost:3001/',
    timeout: 10000,
    // headers: {'X-Custom-Header': 'foobar'}
})

export default clientAxios 