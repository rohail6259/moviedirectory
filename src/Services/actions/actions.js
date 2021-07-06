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

export async function getDiscoverMoviesDetails(discoverMovieDetails, pathId) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${pathId}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let movieData = data;
            getDiscoverMoviesDetailsCredit(discoverMovieDetails, movieData);
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverMoviesDetailsCredit(
    discoverMovieDetails,
    movieData
) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/movie/${movieData.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) {
            let creditData = data;
            let newData = { movieData, creditData };
            Object.assign(discoverMovieDetails, newData);
        }
    } catch (err) {
        console.log(err.message);
    }
}

export async function getDiscoverTVDetails(discoverTVDetails, pathId) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/${pathId}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (data) Object.assign(discoverTVDetails, data);
    } catch (err) {
        console.log(err.message);
    }
}
