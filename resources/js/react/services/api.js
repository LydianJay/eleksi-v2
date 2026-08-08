import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,                 
    withCredentials: true,        
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// Automatically attach CSRF token
api.interceptors.request.use(config => {
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content')

    if (token) {
        config.headers['X-CSRF-TOKEN'] = token
    }

    return config
})

export default api