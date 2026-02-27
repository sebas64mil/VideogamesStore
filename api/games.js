module.exports = async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { limit = 10 } = req.query
  const API_KEY = process.env.VITE_RAWG_API_KEY

  console.log('API_KEY:', API_KEY ? 'presente' : 'falta')
  console.log('limit:', limit)

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured', env: process.env })
  }

  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
}
