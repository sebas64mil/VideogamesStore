const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export const apiService = {
  async getGames(limit = 10) {
    try {
      const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=${limit}`)
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
      const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=1`)
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
