import axios from "axios";

export async function getNowPlayingMovies(nowPlaying, path) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${path}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        let slicedData = data.results.slice(0, 6);
        if (slicedData)
            slicedData.forEach((e) => {
                if (e.poster_path !== "null") nowPlaying.push(e);
            });
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
            let credit = data
            let newData = { personInfo, credit };
            Object.assign(personDetail, newData);
        }
    } catch (err) {
        console.log(err.message);
    }
}
