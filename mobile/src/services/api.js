import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080' //assim so vai funcionar no emulador do mac
})

export default api