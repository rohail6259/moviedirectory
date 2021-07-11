import axios from "axios";

export async function getNowPlayingMovies(nowPlaying, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        let slicedData = data.results.slice(0, 6);
        if (slicedData)
            slicedData.forEach((movie) => {
                if (movie.poster_path !== "null") {
                    getNowPlayingGenres(movie, nowPlaying);
                }
            });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getNowPlayingGenres(movie, nowPlaying) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let genres = data.genres;
            nowPlaying.push(Object.assign(movie, { genres }));
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getTopRatedMovies(topRatedMovies, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data.results)
            data.results.forEach((e) => {
                if (e.poster_path !== "null") topRatedMovies.push(e);
            });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getTopRatedTV(topRatedTV, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data.results)
            data.results.forEach((e) => {
                if (e.poster_path !== "null") topRatedTV.push(e);
            });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverTVSeries(discoverTV, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data.results)
            data.results.forEach((e) => {
                if (e.poster_path !== null) discoverTV.push(e);
            });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverMovies(discoverMovies, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data.results)
            data.results.forEach((e) => {
                if (e.poster_path !== null) discoverMovies.push(e);
            });
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverMoviesTVDetails(
    discoverMovieTVDetails,
    pathId,
    type
) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${pathId}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let movieTVData = data;
            getDiscoverMoviesTVDetailsCredit(
                discoverMovieTVDetails,
                movieTVData,
                type
            );
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverMoviesTVDetailsCredit(
    discoverMovieTVDetails,
    movieTVData,
    type
) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${type}/${movieTVData.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let creditData = data;
            let newData = { movieTVData, creditData };
            Object.assign(discoverMovieTVDetails, newData);
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getSimilarMovieTV(similarMovieTV, id) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data.results) {
            data.results.forEach((e) => {
                if (e.poster_path !== null) similarMovieTV.push(e);
            });
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getPeople(people, page) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        if (data.results) {
            data.results.forEach((e) => {
                if (e.profile_path !== null) people.push(e);
            });
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getPersonDetails(personDetail, id, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let personInfo = data;
            getPersonMovieTVDetail(personDetail, personInfo, id, path);
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getPersonMovieTVDetail(
    personDetail,
    personInfo,
    id,
    path
) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/person/${id}/${path}_credits?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let credit = data;
            let newData = { personInfo, credit };
            Object.assign(personDetail, newData);
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getSearchedList(searchList, query) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
        );
        if (data.results) {
            let slicedData = data.results.slice(0, 6);
            slicedData.forEach((e) => {
                if (
                    e.profile_path !== null ||
                    e.poster_path !== null ||
                    e.backdrop_path !== null
                )
                    searchList.push(e);
            });
        }
    } catch (err) {
        console.log(err.message);
    }
}
