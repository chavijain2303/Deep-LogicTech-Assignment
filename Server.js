const express = require("express");
const https = require("https");

const app = express();
const PORT = 80;

// Fetching html content
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
        if (response.statusCode !== 200) {
          reject(`Request failed with status code ${response.statusCode}`);
          return;
        }

        let pageData = "";
        response.on("data", (chunk) => (pageData += chunk));
        response.on("end", () => resolve(pageData));
      })
      .on("error", reject);
  });
}

// Extracting href attribute
function extHref(sec) {
  const match = sec.match(/<a href="([^"]+)/);
  return match ? match[1] : "";
}

// Extracting title (with improved regex)
function extHeadline(sec) {
  const match = sec.match(/<a [^>]*>(.*?)<\/a>/s);
  return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
}

// Parsing latest stories
function parse(html) {
  const stories = [];
  const marker = '<li class="latest-stories__item">';
  const parts = html.split(marker).slice(1);

  for (const sec of parts) {
    const url = extHref(sec);
    const headline = extHeadline(sec);
    if (url && headline) {
      stories.push({ headline, link: `https://time.com${url}` });
    }
  }

  return stories;
}

app.get("/top-stories", async (req, res) => {
  try {
    const content = await fetchURL("https://time.com");
    const LatStories = parse(content);
    res.json(LatStories.length ? LatStories.slice(0, 6) : []);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).json({ error: "Something went wrong, please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
