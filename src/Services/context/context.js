import { createContext } from "react";

const initialState = {
    nowPlaying: [],
    topRatedMovies: [],
    topRatedTV: [],
    discoverMovies: [],
    discoverTV: [],
    discoverMovieTVDetails: {},
    similarMovieTV: [],
    personDetail: {}
};

const MDContext = createContext();

export { MDContext, initialState };
