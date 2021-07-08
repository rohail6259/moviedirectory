import { createContext } from "react";

const initialState = {
    nowPlaying: [],
    topRatedMovies: [],
    topRatedTV: [],
    discoverMovies: [],
    discoverTV: [],
    discoverMovieTVDetails: {
        creditData: {
            id: null,
            cast: [],
            crew: [],
        },
        movieTVData: {
            adult: false,
            backdrop_path: "",
            belongs_to_collection: null,
            budget: null,
            genres: [],
            homepage: "",
            id: null,
            imdb_id: "",
            original_language: "",
            original_title: "",
            overview: "",
            popularity: null,
            poster_path: "",
            production_companies: [],
            production_countries: [],
            release_date: "",
            revenue: null,
            runtime: null,
            spoken_languages: [],
            status: "",
            tagline: "",
            title: "",
            video: false,
            vote_average: null,
            vote_count: null,
        },
    },
    similarMovieTV: [],
    personDetail: {
        credit: {
            id: null,
            cast: [],
            crew: [],
        },
        personInfo: {
            birthday: "",
            known_for_department: "",
            deathday: null,
            id: null,
            name: "",
            also_known_as: [],
            gender: null,
            biography: "",
            popularity: null,
            place_of_birth: "",
            profile_path: "",
            adult: false,
            imdb_id: null,
            homepage: null,
        },
    },
    currentType: "movie",
};

const MDContext = createContext();

export { MDContext, initialState };
