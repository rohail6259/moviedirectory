import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MDContext } from "../../Services/context/context";

const TopRated = () => {
    const { contextData } = useContext(MDContext);
    const { topRatedMovies, topRatedTV } = contextData;

    const [topRatedMoviesData, setLatestMoviesData] = useState([]);
    const [topRatedTVData, setLatestTVData] = useState([]);
    const [activeMovieList, setActiveMovieList] = useState(true);
    const [activeTVList, setActiveTVList] = useState(false);

    useEffect(() => {
        let isDataAvailable = false;

        if (topRatedMovies && topRatedTV) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (topRatedMovies && topRatedTV) {
                    isDataAvailable = true;
                    setLatestMoviesData(topRatedMovies);
                    setLatestTVData(topRatedTV);
                } else {
                    fetchData();
                }
            }, 100);
        }
    }, [topRatedMovies, topRatedTV]);

    const handleActiveList = (type) => {
        if (type === "movies") {
            setActiveMovieList(true);
            setActiveTVList(false);
        } else if (type === "tv") {
            setActiveTVList(true);
            setActiveMovieList(false);
        }
    };

    return (
        <section className="pt-5 pb-3 pt-md-5 pt-lg-5 pb-lg-4 py-xl-5">
            <div className="container-fluid top-rated">
                {/* FILTERS */}
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-3 col-xl-2 pr-md-0 pr-lg-0 mb-3">
                        <h2>Top Rated</h2>
                    </div>
                    <div className="col-auto mb-3">
                        <button
                            className={`btn filter ${
                                activeMovieList ? "active" : ""
                            }`}
                            onClick={() => handleActiveList("movies")}
                        >
                            Movies
                        </button>
                    </div>
                    <div className="col-auto mb-3">
                        <button
                            className={`btn filter ${
                                activeTVList ? "active" : ""
                            }`}
                            onClick={() => handleActiveList("tv")}
                        >
                            TV Series
                        </button>
                    </div>
                </div>
                {/* MOVIES */}
                <div className="row">
                    {activeMovieList &&
                        topRatedMoviesData.map((movie, idx) => (
                            <div
                                className="col-6 col-md-4 col-lg-3 col-xl-2 position-relative mb-4"
                                key={`top-rated-movies-${idx}`}
                            >
                                <Link to={`/movie/${movie.id}`}>
                                    <div className="badge-hd">HD</div>
                                    <img
                                        className="img-fluid poster"
                                        loading="eager"
                                        src={`${process.env.REACT_APP_IMAGE_API}/w500${movie.poster_path}`}
                                        alt={movie.original_title}
                                    />
                                    <div className="col-12 px-0 mt-2 movie-info">
                                        <p className="mb-1 title">
                                            {movie.original_title}
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex">
                                                <small>
                                                    {
                                                        movie.release_date.split(
                                                            "-"
                                                        )[0]
                                                    }{" "}
                                                    |
                                                </small>
                                                <svg
                                                    className="mx-1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                                                        fill="#ffc107"
                                                    />
                                                </svg>
                                                <small>
                                                    {movie.vote_average}
                                                </small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <svg
                                                    className="mr-1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 232.914 232.914"
                                                >
                                                    <g>
                                                        <path d="M9,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099C18,68.128,13.971,64.099,9,64.099z" />
                                                        <path
                                                            d="M51.983,38.092c-4.971,0-9,4.029-9,9v138.73c0,4.971,4.029,9,9,9s9-4.029,9-9V47.092
		C60.983,42.121,56.954,38.092,51.983,38.092z"
                                                        />
                                                        <path
                                                            d="M94.966,1.896c-4.971,0-9,4.029-9,9v211.121c0,4.971,4.029,9,9,9s9-4.029,9-9V10.896
		C103.966,5.926,99.937,1.896,94.966,1.896z"
                                                        />
                                                        <path
                                                            d="M137.948,54.361c-4.971,0-9,4.029-9,9v106.193c0,4.971,4.029,9,9,9s9-4.029,9-9V63.361
		C146.948,58.39,142.919,54.361,137.948,54.361z"
                                                        />
                                                        <path
                                                            d="M180.931,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099
		C189.931,68.128,185.901,64.099,180.931,64.099z"
                                                        />
                                                        <path
                                                            d="M223.914,92.919c-4.971,0-9,4.029-9,9v29.077c0,4.971,4.029,9,9,9s9-4.029,9-9v-29.077
		C232.914,96.948,228.885,92.919,223.914,92.919z"
                                                        />
                                                    </g>
                                                </svg>
                                                <small>
                                                    {movie.original_language.toUpperCase()}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                {/* TV */}
                <div className="row">
                    {activeTVList &&
                        topRatedTVData.map((tv, idx) => (
                            <div
                                className="col-6 col-md-4 col-lg-3 col-xl-2 position-relative mb-4"
                                key={`top-rated-tv-${idx}`}
                            >
                                <Link to={`/tv/${tv.id}`}>
                                    <div className="badge-hd">HD</div>
                                    <img
                                        loading="eager"
                                        className="img-fluid poster"
                                        src={`${process.env.REACT_APP_IMAGE_API}/w1280${tv.poster_path}`}
                                        alt={tv.original_title}
                                    />
                                    <div className="col-12 px-0 mt-2 movie-info">
                                        <p className="mb-1 title">
                                            {tv.original_title}
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex">
                                                <small>
                                                    {
                                                        tv.first_air_date.split(
                                                            "-"
                                                        )[0]
                                                    }{" "}
                                                    |
                                                </small>
                                                <svg
                                                    className="mx-1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                                                        fill="#ffc107"
                                                    />
                                                </svg>
                                                <small>{tv.vote_average}</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <svg
                                                    className="mr-1"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 232.914 232.914"
                                                >
                                                    <g>
                                                        <path d="M9,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099C18,68.128,13.971,64.099,9,64.099z" />
                                                        <path
                                                            d="M51.983,38.092c-4.971,0-9,4.029-9,9v138.73c0,4.971,4.029,9,9,9s9-4.029,9-9V47.092
		C60.983,42.121,56.954,38.092,51.983,38.092z"
                                                        />
                                                        <path
                                                            d="M94.966,1.896c-4.971,0-9,4.029-9,9v211.121c0,4.971,4.029,9,9,9s9-4.029,9-9V10.896
		C103.966,5.926,99.937,1.896,94.966,1.896z"
                                                        />
                                                        <path
                                                            d="M137.948,54.361c-4.971,0-9,4.029-9,9v106.193c0,4.971,4.029,9,9,9s9-4.029,9-9V63.361
		C146.948,58.39,142.919,54.361,137.948,54.361z"
                                                        />
                                                        <path
                                                            d="M180.931,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099
		C189.931,68.128,185.901,64.099,180.931,64.099z"
                                                        />
                                                        <path
                                                            d="M223.914,92.919c-4.971,0-9,4.029-9,9v29.077c0,4.971,4.029,9,9,9s9-4.029,9-9v-29.077
		C232.914,96.948,228.885,92.919,223.914,92.919z"
                                                        />
                                                    </g>
                                                </svg>
                                                <small>
                                                    {tv.original_language.toUpperCase()}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default TopRated;
