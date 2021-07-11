import { initialState } from "../context/context";
import {
    getNowPlayingMovies,
    getTopRatedMovies,
    getTopRatedTV,
    getDiscoverTVSeries,
    getDiscoverMovies,
    getDiscoverMoviesTVDetails,
    getSimilarMovieTV,
    getPeople,
    getPersonDetails,
    getSearchedList,
} from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    switch (type) {
        case "GET_SEARCHED_ITEM":
            let searchList = [];
            getSearchedList(searchList, payload.search);
            return { ...contextData, searchList };

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

        case "GET_DISCOVER_MOVIES_TV_DETAILS":
            let discoverMovieTVDetails = {};
            getDiscoverMoviesTVDetails(
                discoverMovieTVDetails,
                payload.pathId,
                payload.type
            );
            return { ...contextData, discoverMovieTVDetails };

        case "GET_SIMILAR_MOVIE_TV":
            let similarMovieTV = [];
            getSimilarMovieTV(similarMovieTV, payload.id);
            return { ...contextData, similarMovieTV };

        case "GET_PEOPLE":
            let people = contextData.people;
            getPeople(people, payload.page);
            return { ...contextData, people };

        case "GET_PERSON_DETAIL":
            let personDetail = {};
            getPersonDetails(personDetail, payload.id, payload.path);
            return { ...contextData, personDetail };

        default:
            return contextData;
    }
};
