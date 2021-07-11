import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { MDContext } from "../../Services/context/context";

const Navbar = () => {
    const { contextData, dispatch } = useContext(MDContext);
    const { searchList } = contextData;

    const [searchData, setSearchData] = useState([]);

    let navRef = useRef(null);
    let searchIconRef = useRef(null);
    let searchListRef = useRef(null);
    let inputRef = useRef(null);

    useEffect(() => {
        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener("scroll", handleScroll, true);

        function handleScroll() {
            lastScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastScrollY <= 0)
                        navRef.current.classList.remove("sticky");
                    else navRef.current.classList.add("sticky");
                    ticking = false;
                });
                ticking = true;
            }
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (searchList.length > 0) {
                searchListRef.current.classList.remove("d-none");
                setSearchData(searchList);
            }
        }, 500);
    }, [searchList, setSearchData]);

    const handleSearch = (value) => {
        if (value)
            dispatch({
                type: "GET_SEARCHED_ITEM",
                payload: { search: value },
            });
    };

    const hideSearchPanel = () => {
        setTimeout(() => {
            searchListRef.current.classList.add("d-none");
            inputRef.current.value = "";
        }, 200);
    };

    const queryImageType = (item) => {
        if (item.media_type === "movie" || item.media_type === "tv") {
            if (item.poster_path !== null && item.backdrop_path !== null)
                return `${process.env.REACT_APP_IMAGE_API}/w500${
                    item.poster_path || item.backdrop_path
                }`;
            else return "/sample.jpeg";
        } else if (item.media_type === "person")
            if (item.profile_path !== null && item.backdrop_path !== null) {
                return `${process.env.REACT_APP_IMAGE_API}/w500${
                    item.profile_path || item.backdrop_path
                }`;
            } else return "/sample.jpeg";
    };

    return (
        <div className="container-fluid navbar-wrapper mb-2" ref={navRef}>
            <div className="row">
                <div className="col-2 col-md-2 col-lg-2 col-xl-3 text-white">
                    <span className="logo">
                        <Link to="/">TVM</Link>
                    </span>
                </div>
                <div className="col-8 col-md-6 col-lg-5 col-xl-5 d-none d-md-flex align-items-center justify-content-center text-center">
                    <ul className="d-flex align-items-center justify-content-around w-100 list-unstyled text-white mb-0 p">
                        <li>
                            <NavLink exact to="/" activeClassName="nav-active">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/movies" activeClassName="nav-active">
                                Movies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tv-series"
                                activeClassName="nav-active"
                            >
                                TV Series
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/people" activeClassName="nav-active">
                                People
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-10 col-md-4 col-lg-5 col-xl-4 d-flex align-items-center justify-content-end text-center position-relative">
                    <svg
                        ref={searchIconRef}
                        className="search-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0
			S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786
			c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z
			 M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667
			S302.646,384,202.667,384z"
                        />
                    </svg>
                    <input
                        className="search"
                        type="search"
                        placeholder="Movies, TV Series or People"
                        ref={inputRef}
                        onKeyUp={(e) => handleSearch(e.target.value)}
                        onBlur={hideSearchPanel}
                    />
                    <div
                        className="searched-list text-white d-none"
                        ref={searchListRef}
                    >
                        <ul className="list-unstyled text-left py-3 mb-0">
                            {searchData?.map((e, idx) => (
                                <li key={`search-${idx}`}>
                                    <Link
                                        to={`/${e.media_type}/${e.id}`}
                                        onClick={hideSearchPanel}
                                    >
                                        <div className="d-flex w-100">
                                            <div className="col-3 picture">
                                                <img
                                                    className="img-fluid"
                                                    src={queryImageType(e)}
                                                    alt={
                                                        e.original_title ||
                                                        e.name
                                                    }
                                                />
                                            </div>
                                            <div className="col-9 px-0 info">
                                                <p className="mb-0">
                                                    {e.original_title ||
                                                        e.name ||
                                                        "N/A"}
                                                </p>
                                                <div className="w-100 d-flex align-items-center">
                                                    <small className="mr-1">
                                                        {e.release_date ||
                                                            e.first_air_date ||
                                                            "N/A "}
                                                    </small>
                                                    {" | "}
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
                                                        {e.vote_average ||
                                                            "N/A"}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        {searchData.length - 1 === idx ? (
                                            ""
                                        ) : (
                                            <div className="hr hr-1 my-3"></div>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
