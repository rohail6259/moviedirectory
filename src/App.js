import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MDContext, initialState } from "./Services/context/context";
import { reducer } from "./Services/reducer/reducer";
import Home from "./Pages/Home";
import MovieTVList from "./Pages/MovieTVList";
import People from "./Pages/People";
import ItemDetail from "./Pages/ItemDetail";
import PersonDetail from "./Pages/PersonDetail";
import Navbar from "./Componets/Global/Navbar";

const App = () => {
    // REACT USEREDUCER - REDUX PATTERN
    const [contextData, dispatch] = useReducer(reducer, initialState);

    // CALLING MULTIPLE API
    useEffect(() => {
        dispatch({
            type: "GET_NOW_PLAYING_MOVIES",
            payload: { path: "movie/now_playing" },
        });
        dispatch({
            type: "GET_TOP_RATED_MOVIES",
            payload: { path: "movie/top_rated" },
        });
        dispatch({
            type: "GET_TOP_RATED_TV",
            payload: { path: "tv/top_rated" },
        });
        dispatch({
            type: "GET_DISCOVER_MOVIES",
            payload: { path: "discover/movie" },
        });
        dispatch({
            type: "GET_DISCOVER_TV",
            payload: { path: "discover/tv" },
        });
    }, [dispatch]);

    return (
        <MDContext.Provider value={{ contextData, dispatch }}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/movies"
                        component={() => <MovieTVList type="movies" />}
                    />
                    <Route
                        path="/tv-series"
                        component={() => <MovieTVList type="TV" />}
                    />
                    <Route path="/people" component={People} />
                    <Route path="/movie/:id" component={ItemDetail} />
                    <Route path="/tv/:id" component={ItemDetail} />
                    <Route path="/person/:id" component={PersonDetail} />
                </Switch>
            </Router>
        </MDContext.Provider>
    );
};

export default App;
