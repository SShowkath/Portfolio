// import express from 'express';
// import https from 'https';
// import { parse } from 'url';
// import { JSDOM } from 'jsdom';
// import cors from 'cors';

// const app = express();
// const port = process.env.PORT || 3001; 


// app.use(cors());


// async function fetchLetterboxdPage(url) {
//     const parsedUrl = parse(url);
    
//     const options = {
//         hostname: parsedUrl.hostname,
//         path: parsedUrl.path,
//         headers: {
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
//         }
//     };

//     return new Promise((resolve, reject) => {
//         https.get(options, (res) => {
//             let data = '';
//             res.on('data', (chunk) => data += chunk);
//             res.on('end', () => resolve(data));
//         }).on('error', reject);
//     });
// }
// async function fetchStorygraphPage(url) {
//     const parsedUrl = parse(url);
    
//     const options = {
//         hostname: parsedUrl.hostname,
//         path: parsedUrl.path,
//         headers: {
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
//         }
//     };

//     return new Promise((resolve, reject) => {
//         https.get(options, (res) => {
//             let data = '';
//             res.on('data', (chunk) => data += chunk);
//             res.on('end', () => resolve(data));
//         }).on('error', reject);
//     });
// }
// function extractMovieTitles(html) {
//     const dom = new JSDOM(html);
//     const document = dom.window.document;
    
//     const posters = document.querySelectorAll('li.poster-container.viewing-poster-container[data-owner="shahrukh0"]');
//     const movies = Array.from(posters).map(poster => {
//         const img = poster.querySelector('img');
//         const anchor = poster.querySelector('a'); // Get the movie link
//         const title = img ? img.alt : null;
//         const path = anchor ? anchor.getAttribute('href') : null;
//         const url = path ? `https://letterboxd.com${path}` : null;
//         return { title, url };
//     }).filter(movie => movie.title);
    
//     return movies;
// }
// function extractBookImages(html) {
//     const dom = new JSDOM(html);
//     const document = dom.window.document;
    
//     const bookElements = document.querySelectorAll('img.rounded-sm.shadow-lg.dark\\:shadow-darkerGrey\\/40');
//     const seenUrls = new Set();
    
//     const books = Array.from(bookElements)
//         .map(img => img.src)
//         .filter(url => url && !seenUrls.has(url) && seenUrls.add(url))
//         .map(imageUrl => ({ imageUrl }));
    
//     return books;
// }


// app.get('/api/movies', async (req, res) => {
//     try {
//         const letterboxdHtml = await fetchLetterboxdPage('https://letterboxd.com/shahrukh0/');
//         const movieTitles = extractMovieTitles(letterboxdHtml);
//         res.json({ titles: movieTitles });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Failed to fetch movie titles' });
//     }
// });

// app.get('/api/books', async (req, res) => {
//     try {
//         const storygraphHtml = await fetchStorygraphPage('https://app.thestorygraph.com/currently-reading/chefboyardee42');
//         const bookImages = extractBookImages(storygraphHtml);
//         res.json({ books: bookImages });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Failed to fetch books' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

import express from 'express';
import https from 'https';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

let cachedMovies = [];
let cachedBooks = [];
let lastUpdated = null;

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

async function updateData() {
    try {
        console.log("Fetching latest movies and books...");
        const [letterboxdHtml, storygraphHtml] = await Promise.all([
            fetchPage('https://letterboxd.com/shahrukh0/'),
            fetchPage('https://app.thestorygraph.com/currently-reading/chefboyardee42')
        ]);

        cachedMovies = extractMovieTitles(letterboxdHtml);
        cachedBooks = extractBookImages(storygraphHtml);
        lastUpdated = new Date();

        console.log("Data updated:", lastUpdated);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data on startup
updateData();

// Refresh data every 6 hours
setInterval(updateData, 6 * 60 * 60 * 1000);

// API Endpoints
app.get('/api/movies', (req, res) => {
    res.json({ lastUpdated, movies: cachedMovies });
});

app.get('/api/books', (req, res) => {
    res.json({ lastUpdated, books: cachedBooks });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
