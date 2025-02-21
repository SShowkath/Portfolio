import express from 'express';
import https from 'https';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();

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
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false&api_key=${TMDB_API_KEY}`;
    
    try {
        const response = await fetch(url);
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

        // Fetch posters in parallel
        const moviePromises = movies.map(async (movie) => {
            movie.posterUrl = await fetchMoviePoster(movie.title);
            return movie;
        });

        cachedMovies = await Promise.all(moviePromises);
        cachedBooks = books;

    } catch (error) {
        console.error("Error updating data:", error);
    }
}

// Initial fetch and periodic updates every 6 hours
updateData();
setInterval(updateData, 6 * 60 * 60 * 1000);

// API Endpoints
app.get('/api/movies', (req, res) => {
    res.json({ movies: cachedMovies });
});

app.get('/api/books', (req, res) => {
    res.json({ books: cachedBooks });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
