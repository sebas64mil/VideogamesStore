// Detecta si estamos en desarrollo (localhost)
const isDevelopment =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_KEY = import.meta.env.RAWG_API_KEY

export const apiService = {
  async getGames(limit = 10) {
    try {
      let url
      if (isDevelopment) {
        // Usar API directa en desarrollo
        url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`
      } else {
        // Usar proxy de Vercel
        url = `/api/games?limit=${limit}`
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
      if (isDevelopment) {
        // Usar API directa en desarrollo
        url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=1`
      } else {
        // Usar proxy de Vercel
        url = '/api/games?limit=1'
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
