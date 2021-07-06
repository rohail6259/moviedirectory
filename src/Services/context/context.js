import { createContext } from "react";

const initialState = {
    nowPlaying: [],
    topRatedMovies: [],
    topRatedTV: [],
    discoverMovies: [],
    discoverTV: [],
    discoverMovieDetails: {},
    discoverTVDetails: {},
};

const MDContext = createContext();

export { MDContext, initialState };
