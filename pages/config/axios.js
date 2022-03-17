import axios from 'axios'

const clientAxios = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 10000,
    // headers: {'X-Custom-Header': 'foobar'}
})

export default clientAxios 