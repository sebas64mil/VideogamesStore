// Detecta si estamos en producción o desarrollo
const API_URL =
  process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost'
    ? '/api/games'
    : 'https://api.rawg.io/api'
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

export const apiService = {
  async getGames(limit = 10) {
    try {
      let url
      if (API_URL === '/api/games') {
        // Usar proxy de Vercel
        url = `${API_URL}?limit=${limit}`
      } else {
        // Usar API directa en desarrollo
        url = `${API_URL}/games?key=${API_KEY}&page_size=${limit}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching games:', error)
      throw error
    }
  },

  async testConnection() {
    try {
      let url
      if (API_URL === '/api/games') {
        // Usar proxy de Vercel
        url = `${API_URL}?limit=1`
      } else {
        // Usar API directa en desarrollo
        url = `${API_URL}/games?key=${API_KEY}&page_size=1`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const data = await response.json()
      return {
        success: true,
        message: 'Conexión successful!',
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        message: `Error de conexión: ${error.message}`,
        error: error,
      }
    }
  },
}
