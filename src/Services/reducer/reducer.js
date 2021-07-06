import { initialState } from "../context/context";
import {
    getNowPlayingMovies,
    getTopRatedMovies,
    getTopRatedTV,
    getDiscoverTVSeries,
    getDiscoverMovies,
    getDiscoverMoviesDetails,
    getDiscoverTVDetails,
} from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    switch (type) {
        case "GET_NOW_PLAYING_MOVIES":
            let nowPlaying = [];
            getNowPlayingMovies(nowPlaying, payload.path);
            return { ...contextData, nowPlaying };

        case "GET_TOP_RATED_MOVIES":
            let topRatedMovies = [];
            getTopRatedMovies(topRatedMovies, payload.path);
            return { ...contextData, topRatedMovies };

        case "GET_TOP_RATED_TV":
            let topRatedTV = [];
            getTopRatedTV(topRatedTV, payload.path);
            return { ...contextData, topRatedTV };

        case "GET_DISCOVER_TV":
            let discoverTV = [];
            getDiscoverTVSeries(discoverTV, payload.path);
            return { ...contextData, discoverTV };

        case "GET_DISCOVER_MOVIES":
            let discoverMovies = [];
            getDiscoverMovies(discoverMovies, payload.path);
            return { ...contextData, discoverMovies };

        case "GET_DISCOVER_MOVIES_DETAILS":
            let discoverMovieDetails = {};
            getDiscoverMoviesDetails(discoverMovieDetails, payload.pathId);
            return { ...contextData, discoverMovieDetails };

        case "GET_DISCOVER_TV_DETAILS":
            let discoverTVDetails = {};
            getDiscoverTVDetails(discoverTVDetails, payload.pathId);
            return { ...contextData, discoverTVDetails };

        default:
            return contextData;
    }
};
