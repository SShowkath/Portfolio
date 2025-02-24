import express from 'express';
    import https from 'https';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
import 'dotenv/config';
app.use(cors());

let cachedMovies = [];
let cachedBooks = [];
const TMDB_API_KEY = process.env.TMDB_API_KEY;


async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractMovieTitles(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const posters = document.querySelectorAll('li.poster-container.viewing-poster-container[data-owner="shahrukh0"]');
    return Array.from(posters).map(poster => {
        const img = poster.querySelector('img');
        const anchor = poster.querySelector('a');
        return {
            title: img ? img.alt : null,
            url: anchor ? `https://letterboxd.com${anchor.getAttribute('href')}` : null
        };
    }).filter(movie => movie.title);
}

function extractBookImages(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const bookElements = document.querySelectorAll('img.rounded-sm.shadow-lg.dark\\:shadow-darkerGrey\\/40');
    const seenUrls = new Set();

    return Array.from(bookElements)
        .map(img => img.src)
        .filter(url => url && !seenUrls.has(url) && seenUrls.add(url))
        .map(imageUrl => ({ imageUrl }));
}

async function fetchMoviePoster(title) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false`;
    
    try {
        const token = `Bearer ${TMDB_API_KEY}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODQ3MDg3MDBkMzU2ZDJlNjNmMzNlZGRiOTRjZjFmZCIsIm5iZiI6MTczOTgxNzI1My44MzAwMDAyLCJzdWIiOiI2N2IzODEyNWFhYWMzYjE2NzRlMGYzMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X1HMyYgBbSdf3y5D94CXIGrWeQ0xQlOp5n8f1WcjMRM'
              }
            });
        const data = await response.json();
        return data.results?.[0]?.poster_path ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` : null;
    } catch (error) {
        console.error(`Error fetching poster for "${title}":`, error);
        return null;
    }
}

async function updateData() {
    try {
        console.log("Fetching latest movies and books...");
        const [letterboxdHtml, storygraphHtml] = await Promise.all([
            fetchPage('https://letterboxd.com/shahrukh0/'),
            fetchPage('https://app.thestorygraph.com/currently-reading/chefboyardee42')
        ]);

        let movies = extractMovieTitles(letterboxdHtml);
        const books = extractBookImages(storygraphHtml);

        const moviePromises = movies.map(async (movie) => {
            movie.posterUrl = await fetchMoviePoster(movie.title);
            return movie;
        });

        cachedMovies = await Promise.all(moviePromises);
        cachedBooks = books;

        console.log("New movies and books data cached at", new Date().toISOString());
        console.log("Movies:", cachedMovies.length, "Books:", cachedBooks.length);

    } catch (error) {
        console.error("Error updating data:", error);
    }
}


updateData();
setInterval(updateData, 6 * 60 * 60 * 1000);

app.get('/api/movies', (req, res) => {
    console.log("Sending movies data:", cachedMovies);
    res.json({ movies: cachedMovies });
});

app.get('/api/books', (req, res) => {
    res.json({ books: cachedBooks });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('./sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://theshahrukh.vercel.app/</loc>
      <lastmod>2025-02-24</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>`);
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
  Allow: /
  Sitemap: https://theshahrukh.vercel.app/sitemap.xml`);
  });

app.get('/api/trigger-update', async (req, res) => {
    try {
        await updateData();
        res.json({ message: "Data updated successfully" });
        console.log("success")
    } catch (error) {
        console.error("Cron job update failed:", error);
        res.status(500).json({ message: "Update failed" });
    }
});

