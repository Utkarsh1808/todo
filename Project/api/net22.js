export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "missing id" });
  }

  const apiUrl = `https://net22.cc/playlist.php?id=${id}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "fetch failed", details: error.toString() });
  }
}
