export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "missing id" });
  }

  const apiUrl = `https://net22.cc/playlist.php?id=${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://net22.cc/",
        "Origin": "https://net22.cc",
        "Connection": "keep-alive",
      }
    });

    const text = await response.text();

    // If response is empty or not JSON, show error
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (err) {
      return res.status(500).json({
        error: "invalid response",
        raw: text
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: "fetch failed",
      details: error.toString(),
    });
  }
}
