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
      fetch("https://portfoliobackend-uwr7.onrender.com/api/movies")
        .then((response) => response.json())
        .then((data) => data.movies || []), 

      fetch("https://portfoliobackend-uwr7.onrender.com/api/books")
        .then((response) => response.json())
        .then((data) => data.books || []), 
    ])
    .then(([moviesData, booksData]) => {
      sessionStorage.setItem("movies", JSON.stringify(moviesData));
      sessionStorage.setItem("books", JSON.stringify(booksData));

      setMovies(moviesData);
      setBooks(booksData);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const handleMovieClick = (letterboxdUrl) => {
    if (letterboxdUrl) {
      window.open(letterboxdUrl, "_blank");
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
