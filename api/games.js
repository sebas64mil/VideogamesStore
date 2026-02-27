export default async function handler(req, res) {
  const { limit = 10 } = req.query;
  const API_KEY = process.env.VITE_RAWG_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
