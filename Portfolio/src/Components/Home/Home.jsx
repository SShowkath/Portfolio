// import React, { useState, useEffect } from "react";
// import "./Home.scss";

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedMovies = sessionStorage.getItem('movies');
//     const savedBooks = sessionStorage.getItem('books');

//     if (savedMovies && savedBooks) {
//       setMovies(JSON.parse(savedMovies));
//       setBooks(JSON.parse(savedBooks));
//       setLoading(false);
//       return;
//     }
//     Promise.all([
//       fetch('https://portfoliobackend-uwr7.onrender.com/api/movies')
//         .then(response => response.json())
//         .then(data => data.titles),
//       fetch('https://portfoliobackend-uwr7.onrender.com/api/books')
//         .then(response => response.json())
//         .then(data => data.books)
//     ])
//     .then(([moviesData, booksData]) => {
//       const moviePromises = moviesData.map(movie => {
//         return fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&include_adult=false`, {
//           headers: {
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODQ3MDg3MDBkMzU2ZDJlNjNmMzNlZGRiOTRjZjFmZCIsIm5iZiI6MTczOTgxNzI1My44MzAwMDAyLCJzdWIiOiI2N2IzODEyNWFhYWMzYjE2NzRlMGYzMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X1HMyYgBbSdf3y5D94CXIGrWeQ0xQlOp5n8f1WcjMRM'
//           }
//         })
//         .then(response => response.json())
//         .then(tmdbData => ({
//           ...movie,
//           posterUrl: tmdbData.results?.[0]?.poster_path 
//             ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}` 
//             : null,
//         }));
//       });

//       return Promise.all([Promise.all(moviePromises), booksData]);
//     })
//     .then(([processedMovies, processedBooks]) => {
      
//       sessionStorage.setItem('movies', JSON.stringify(processedMovies));
//       sessionStorage.setItem('books', JSON.stringify(processedBooks));

//       setMovies(processedMovies);
//       setBooks(processedBooks);
//       setLoading(false);
//     })
//     .catch(error => {
//       setError(error.message);
//       setLoading(false);
//     });
//   }, []);

//   const handleMovieClick = (letterboxdUrl) => {
//     if (letterboxdUrl) {
      
//       const cleanedURL = letterboxdUrl.replace(/letterboxd\.com\/[^/]+\//, "letterboxd.com/");
//       window.open(cleanedURL, '_blank');
//     }
//   };
  

//   return (
//     <div className="GlobalHome">
//       <div className="HomeContainer">
//       <div className="MediaSection">
//             <h2>Recently Watched</h2>
//             <div className="MediaGrid movies-grid">
//               {loading && <p className="loading">Loading...</p>}
//               {error && <p className="error">Error: {error}</p>}
//               {!loading && !error && movies.map((movie, index) => (
//                 <div
//                   key={index}
//                   className="movie-card"
//                   onClick={() => handleMovieClick(movie.url)}
//                 >
//                   {movie.posterUrl ? (
//                     <img
//                       src={movie.posterUrl}
//                       alt={movie.title}
//                       className="movie-poster"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = '/placeholder-image.jpg';
//                       }}
//                     />
//                   ) : (
//                     <div className="poster-placeholder">
//                       {movie.title}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
          
//         </div>
        
//         <div className="MediaSection">
//             <h2>Currently Reading</h2>
//             <div className="MediaGrid books-grid">
//               {loading && <p className="loading">Loading...</p>}
//               {!loading && !error && books.map((book, index) => (
//                 <div
//                   key={index}
//                   className="movie-card"
//                 >
//                   <img
//                     src={book.imageUrl}
//                     alt={`Book cover ${index}`}
//                     className="movie-poster"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>
        
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./Home.scss";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedMovies = sessionStorage.getItem("movies");
    const savedBooks = sessionStorage.getItem("books");

    if (savedMovies && savedBooks) {
      setMovies(JSON.parse(savedMovies));
      setBooks(JSON.parse(savedBooks));
      setLoading(false);
      return;
    }

    Promise.all([
      fetch("https://portfoliobackend-1.onrender.com/api/movies")
        .then((response) => response.json())
        .then((data) => data.movies || []), // Updated to use 'movies'

      fetch("https://portfoliobackend-1.onrender.com/api/books")
        .then((response) => response.json())
        .then((data) => data.books || []), // Ensuring 'books' exists
    ])
      .then(([moviesData, booksData]) => {
        const moviePromises = moviesData.map((movie) =>
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              movie.title
            )}&include_adult=false`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODQ3MDg3MDBkMzU2ZDJlNjNmMzNlZGRiOTRjZjFmZCIsIm5iZiI6MTczOTgxNzI1My44MzAwMDAyLCJzdWIiOiI2N2IzODEyNWFhYWMzYjE2NzRlMGYzMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X1HMyYgBbSdf3y5D94CXIGrWeQ0xQlOp5n8f1WcjMRM",
              },
            }
          )
            .then((response) => response.json())
            .then((tmdbData) => ({
              ...movie,
              posterUrl: tmdbData.results?.[0]?.poster_path
                ? `https://image.tmdb.org/t/p/w500${tmdbData.results[0].poster_path}`
                : null,
            }))
        );

        return Promise.all([Promise.all(moviePromises), booksData]);
      })
      .then(([processedMovies, processedBooks]) => {
        sessionStorage.setItem("movies", JSON.stringify(processedMovies));
        sessionStorage.setItem("books", JSON.stringify(processedBooks));

        setMovies(processedMovies);
        setBooks(processedBooks);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleMovieClick = (letterboxdUrl) => {
    if (letterboxdUrl) {
      const cleanedURL = letterboxdUrl.replace(
        /letterboxd\.com\/[^/]+\//,
        "letterboxd.com/"
      );
      window.open(cleanedURL, "_blank");
    }
  };

  return (
    <div className="GlobalHome">
      <div className="HomeContainer">
        <div className="MediaSection">
          <h2>Recently Watched</h2>
          <div className="MediaGrid movies-grid">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading &&
              !error &&
              movies.map((movie, index) => (
                <div
                  key={index}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.url)}
                >
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="movie-poster"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="poster-placeholder">{movie.title}</div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="MediaSection">
          <h2>Currently Reading</h2>
          <div className="MediaGrid books-grid">
            {loading && <p className="loading">Loading...</p>}
            {!loading &&
              !error &&
              books.map((book, index) => (
                <div key={index} className="movie-card">
                  <img
                    src={book.imageUrl}
                    alt={`Book cover ${index}`}
                    className="movie-poster"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
