import axios from 'axios'

/* ➡ Configurando axios para las peticiones a la API */
export default axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/v1' : 'https://orielle.vercel.app/api/v1'
})