import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            // In react, fetch is often used to get the data from APIs for displaying it on the website

            if(!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();

            if(data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);
        } catch (error) {
            console.error('Error fetching movies: ${error}');
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false); // loading stops regardless of failure or success
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []); // will only run at the start

    return (
        <main
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/centre-bg.png')" }}
        >
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="./centre.png" alt="Centre Banner" />
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <h1 className="text-white">{searchTerm}</h1>
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}
export default App
