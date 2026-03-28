import axios from 'axios'

// Configuração base da API — aponta para o backend Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export default api