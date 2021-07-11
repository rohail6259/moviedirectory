import React, { useState, useEffect, useContext, useRef } from "react";
import { MDContext } from "../Services/context/context";
import { Link } from "react-router-dom";
import { FirstLetterCapital } from "../Utils/FirstLetterCapital";
import { PageTitle } from "../Utils/PageTitle";
import EnableScrolling from "../Utils/EnableScrolling";
import FadeInPage from "../Utils/FadeInPage";

const ItemDetail = ({ match }) => {
    // ENABLE BODY SCROLL
    EnableScrolling();

    // URL PATH & QUERY ID
    const {
        params: { id },
        url,
    } = match;
    const pathId = useRef(url);
    const category = useRef(url.split("/")[1]);

    // ELEMENT REFERENCE VARIABLE
    const itemDetailsRef = useRef(null);

    // GLOBAL STATE DATA & DISPATCHER
    const { contextData, dispatch } = useContext(MDContext);
    const { discoverMovieTVDetails, similarMovieTV } = contextData;

    // COMPONENT STATES
    const [itemDetailData, setItemDetailData] = useState({});
    const [similarData, setSimilarData] = useState([]);

    // PAGE TITLE HELPER FUNCTION
    PageTitle(
        `TVM Directory - ${
            category.current === "movie"
                ? itemDetailData?.movieTVData?.original_title
                : itemDetailData?.movieTVData?.original_name
        }`
    );

    // FETCH "GET_DISCOVER_MOVIES_TV_DETAILS" DATA WHEN COMPONENT LOADS
    useEffect(() => {
        dispatch({
            type: "GET_DISCOVER_MOVIES_TV_DETAILS",
            payload: { pathId: pathId.current, type: category.current },
        });
    }, [dispatch]);

    // FETCH "GET_SIMILAR_MOVIE_TV" DATA WHEN COMPONENT LOADS
    useEffect(() => {
        dispatch({
            type: "GET_SIMILAR_MOVIE_TV",
            payload: { id },
        });
    }, [dispatch, id]);

    // RECURSIVE FUNCTION TO SET THE STATE WITH GLOBAL STATE DEPENDENCY, WHEN COMPONENT LOADS
    useEffect(() => {
        let isDataAvailable = false;

        if (discoverMovieTVDetails) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (discoverMovieTVDetails.movieTVData.id > 0) {
                    isDataAvailable = true;
                    setItemDetailData(discoverMovieTVDetails);
                    FadeInPage(itemDetailsRef.current);
                } else {
                    fetchData();
                }
            }, 1000);
        }
    }, [discoverMovieTVDetails]);

    // SETTING STATE WITH 1 SECOND DELAY WITH GLOBAL STATE DEPENDENCY, WHEN COMPONENT LOADS
    useEffect(() => {
        setTimeout(() => {
            setSimilarData(similarMovieTV);
        }, 1000);
    }, [similarMovieTV]);

    return (
        <section className="item-details" ref={itemDetailsRef}>
            {/* HERO VIDEO */}
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12">
                        <small className="text-white">
                            Home / {FirstLetterCapital(category.current)} /{" "}
                            {category.current === "movie"
                                ? itemDetailData?.movieTVData?.original_title
                                : itemDetailData?.movieTVData?.original_name}
                        </small>
                        <video
                            preload="auto"
                            autoPlay={true}
                            controls={true}
                            loop={true}
                            poster="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
                            src="/energy.mp4"
                        ></video>
                    </div>
                </div>
            </div>
            {/* INFO & SIMILAR MOVIES */}
            <div className="container-fluid">
                <div className="row">
                    {/* SEPARATOR */}
                    <div className="hr"></div>
                    {/* MOVIE, CAST & CREW INFO */}
                    <div className="col-12">
                        {/* MOVIE */}
                        <div className="row">
                            <div className="d-none d-md-flex col-md-4 col-lg-3 col-xl-2">
                                <img
                                    className="img-fluid poster"
                                    loading="eager"
                                    src={`${process.env.REACT_APP_IMAGE_API}/w500${itemDetailData?.movieTVData?.poster_path}`}
                                    alt={
                                        category.current === "movie"
                                            ? itemDetailData?.movieTVData
                                                  ?.original_title
                                            : itemDetailData?.movieTVData
                                                  ?.original_name
                                    }
                                />
                            </div>
                            <div className="col">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="text-white">
                                        {category.current === "movie"
                                            ? itemDetailData?.movieTVData
                                                  ?.original_title
                                            : itemDetailData?.movieTVData
                                                  ?.original_name}{" "}
                                        {`(${
                                            category.current === "movie"
                                                ? itemDetailData?.movieTVData?.release_date?.split(
                                                      "-"
                                                  )[0]
                                                : itemDetailData?.movieTVData?.first_air_date?.split(
                                                      "-"
                                                  )[0]
                                        })`}
                                    </h2>
                                    <h6 className="text-white d-flex">
                                        <svg
                                            className="mx-2"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                style={{ fill: "#FEDBAB" }}
                                                d="M481,332c0-16.5-13.5-30-30-30c16.5,0,30-13.5,30-30s-13.5-30-30-30H328.001
	C346.3,187.099,346,168.6,346,135c0-19.501-12.599-36.301-30-42.299c-4.799-1.8-9.6-2.701-15-2.701h-9
	c-5.7,0-12.9,4.501-14.401,11.4l-8.399,32.699C256.601,182.999,216.099,242,166,242v210l66.899,22.2
	c15.3,5.099,31.201,7.8,47.401,7.8H421c16.569,0,30-13.433,30-30c0-16.569-13.431-30-30-30h30c16.5,0,30-13.5,30-30s-13.5-30-30-30
	C467.5,362,481,348.5,481,332z"
                                            />
                                            <path
                                                style={{ fill: "#FEC478" }}
                                                d="M421,482c16.569,0,30-13.433,30-30c0-16.569-13.431-30-30-30h30c16.5,0,30-13.5,30-30s-13.5-30-30-30
	c16.5,0,30-13.5,30-30s-13.5-30-30-30c16.5,0,30-13.5,30-30s-13.5-30-30-30H328.001C346.3,187.099,346,168.6,346,135
	c0-19.501-12.599-36.301-30-42.299c-4.799-1.8-9.6-2.701-15-2.701v392H421z"
                                            />
                                            <g>
                                                <path
                                                    style={{ fill: "#1689FC" }}
                                                    d="M136,512H46c-8.291,0-15-6.709-15-15V227c0-8.291,6.709-15,15-15h90c24.814,0,45,20.186,45,45v210
		C181,491.814,160.814,512,136,512z"
                                                />
                                                <circle
                                                    style={{ fill: "#1689FC" }}
                                                    cx="106"
                                                    cy="437"
                                                    r="15"
                                                />
                                                <path
                                                    style={{ fill: "#1689FC" }}
                                                    d="M316,15v30c0,8.401-6.599,15-15,15s-15-6.599-15-15V15c0-8.401,6.599-15,15-15S316,6.599,316,15z"
                                                />
                                                <path
                                                    style={{ fill: "#1689FC" }}
                                                    d="M216.142,86.353l-21.211-21.211c-5.859-5.859-5.859-15.352,0-21.211s15.352-5.859,21.211,0
		l21.211,21.211c5.859,5.859,5.859,15.352,0,21.211C231.493,92.212,222.001,92.212,216.142,86.353z"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    style={{ fill: "#136EF1" }}
                                                    d="M364.647,86.353c-5.859-5.859-5.859-15.352,0-21.211l21.211-21.211
		c5.859-5.859,15.352-5.859,21.211,0s5.859,15.352,0,21.211l-21.211,21.211C379.999,92.212,370.507,92.212,364.647,86.353z"
                                                />
                                                <path
                                                    style={{ fill: "#136EF1" }}
                                                    d="M316,15v30c0,8.401-6.599,15-15,15V0C309.401,0,316,6.599,316,15z"
                                                />
                                            </g>
                                        </svg>
                                        {
                                            itemDetailData?.movieTVData
                                                ?.vote_count
                                        }
                                    </h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-space">
                                    <div className="badge-hd badge-hd-relative">
                                        HD
                                    </div>
                                    <div className="mx-2">
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
                                        <small className="text-white">
                                            {
                                                itemDetailData?.movieTVData
                                                    ?.vote_average
                                            }
                                        </small>
                                    </div>
                                    <small className="text-white">
                                        {itemDetailData?.movieTVData?.runtime}{" "}
                                        min
                                    </small>
                                </div>
                                <p className="text-white pt-3">
                                    {itemDetailData?.movieTVData?.overview}
                                </p>
                                <ul className="list-unstyled text-white">
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Genre:{" "}
                                        </div>
                                        <div className="col d-flex px-0">
                                            {itemDetailData?.movieTVData?.genres?.map(
                                                (e, idx) => (
                                                    <span
                                                        key={`genre-${idx}`}
                                                        className="px-1"
                                                    >
                                                        {e.name}
                                                        {idx <
                                                        itemDetailData
                                                            ?.movieTVData
                                                            ?.genres?.length -
                                                            1
                                                            ? ", "
                                                            : ""}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Revenue:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieTVData
                                                ?.revenue > 0 ? (
                                                `$ ${itemDetailData?.movieTVData?.revenue}`
                                            ) : (
                                                <p className="text-white mb-0">
                                                    Not Available
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Budget:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieTVData
                                                ?.budget > 0 ? (
                                                `$ ${itemDetailData?.movieTVData?.budget}`
                                            ) : (
                                                <p className="text-white mb-0">
                                                    Not Available
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Status:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {
                                                itemDetailData?.movieTVData
                                                    ?.status
                                            }
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Language:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieTVData
                                                ?.spoken_languages?.length > 0
                                                ? itemDetailData.movieTVData
                                                      ?.spoken_languages[0]
                                                      ?.name
                                                : ""}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-3 col-md-3 col-lg-2 px-0">
                                            Tagline:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {
                                                itemDetailData?.movieTVData
                                                    ?.tagline
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* CAST */}
                        <div className="cast py-5">
                            <h2 className="text-white pb-2">Cast</h2>
                            {itemDetailData?.creditData?.cast.length > 0 ? (
                                <div className="row flex-row flex-nowrap">
                                    {itemDetailData?.creditData?.cast?.map(
                                        (member, idx) => (
                                            <div
                                                onClick={() =>
                                                    (contextData.currentType =
                                                        category.current)
                                                }
                                                key={`member-${idx}`}
                                                className="col-auto"
                                            >
                                                <Link
                                                    to={
                                                        member.profile_path !==
                                                        null
                                                            ? `/person/${member.id}`
                                                            : "#"
                                                    }
                                                >
                                                    <img
                                                        className="img-fluid"
                                                        src={`${
                                                            member.profile_path !==
                                                            null
                                                                ? `${process.env.REACT_APP_IMAGE_API}/w500${member.profile_path}`
                                                                : "/sample.jpeg"
                                                        }`}
                                                        alt={member.name}
                                                    />
                                                    <h6 className="text-white pt-2 name">
                                                        {member.name}
                                                    </h6>
                                                    <h6 className="text-white character-name">
                                                        {member.character}
                                                    </h6>
                                                </Link>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-white text-center">
                                    No Cast Members Found!
                                </p>
                            )}
                        </div>
                        {/* CREW */}
                        <div className="crew py-5">
                            <h2 className="text-white pb-2">Crew</h2>
                            {itemDetailData?.creditData?.crew.length > 0 ? (
                                <div className="row flex-row flex-nowrap">
                                    {itemDetailData?.creditData?.crew?.map(
                                        (member, idx) => (
                                            <div
                                                key={`cast-${idx}`}
                                                className="col-auto"
                                                onClick={() =>
                                                    (contextData.currentType =
                                                        category.current)
                                                }
                                            >
                                                <Link
                                                    to={
                                                        member.profile_path !==
                                                        null
                                                            ? `/person/${member.id}`
                                                            : "#"
                                                    }
                                                >
                                                    <img
                                                        className="img-fluid"
                                                        src={`${
                                                            member.profile_path !==
                                                            null
                                                                ? `${process.env.REACT_APP_IMAGE_API}/w500${member.profile_path}`
                                                                : "/sample.jpeg"
                                                        }`}
                                                        alt={member.name}
                                                    />
                                                    <h6 className="text-white pt-2 name">
                                                        {member.name}
                                                    </h6>
                                                    <h6 className="text-white character-name">
                                                        {member.job}
                                                    </h6>
                                                </Link>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-white text-center">
                                    No Crew Members Found!
                                </p>
                            )}
                        </div>
                    </div>
                    {/* SIMILAR MOVIES */}
                    <div className="col-12">
                        <div className="cast py-5">
                            <h2 className="text-white pb-2">
                                Similar{" "}
                                {category.current === "movie"
                                    ? "Movies"
                                    : "TV Series"}
                            </h2>
                            {similarData.length > 0 ? (
                                <div className="row flex-row flex-nowrap">
                                    {similarData.map((movieTV, idx) => (
                                        <div
                                            className="col-6 col-md-3 col-lg-2 position-relative mb-4 similar"
                                            key={`similar-${idx}`}
                                        >
                                            <div className="badge-hd">HD</div>
                                            <img
                                                className="img-fluid poster"
                                                loading="eager"
                                                src={`${process.env.REACT_APP_IMAGE_API}/w500${movieTV.poster_path}`}
                                                alt={movieTV.original_title}
                                            />
                                            <div className="col-12 px-0 mt-2 movie-info">
                                                <p className="mb-1 title">
                                                    {movieTV.original_title}
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex">
                                                        <small>
                                                            {category.current ===
                                                            "movie"
                                                                ? movieTV?.release_date?.split(
                                                                      "-"
                                                                  )[0]
                                                                : movieTV?.first_air_date?.split(
                                                                      "-"
                                                                  )[0]}{" "}
                                                            |
                                                        </small>
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
                                                            {
                                                                movieTV.vote_average
                                                            }
                                                        </small>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <svg
                                                            className="mr-1"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 232.914 232.914"
                                                        >
                                                            <g>
                                                                <path d="M9,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099C18,68.128,13.971,64.099,9,64.099z" />
                                                                <path
                                                                    d="M51.983,38.092c-4.971,0-9,4.029-9,9v138.73c0,4.971,4.029,9,9,9s9-4.029,9-9V47.092
		C60.983,42.121,56.954,38.092,51.983,38.092z"
                                                                />
                                                                <path
                                                                    d="M94.966,1.896c-4.971,0-9,4.029-9,9v211.121c0,4.971,4.029,9,9,9s9-4.029,9-9V10.896
		C103.966,5.926,99.937,1.896,94.966,1.896z"
                                                                />
                                                                <path
                                                                    d="M137.948,54.361c-4.971,0-9,4.029-9,9v106.193c0,4.971,4.029,9,9,9s9-4.029,9-9V63.361
		C146.948,58.39,142.919,54.361,137.948,54.361z"
                                                                />
                                                                <path
                                                                    d="M180.931,64.099c-4.971,0-9,4.029-9,9v86.716c0,4.971,4.029,9,9,9s9-4.029,9-9V73.099
		C189.931,68.128,185.901,64.099,180.931,64.099z"
                                                                />
                                                                <path
                                                                    d="M223.914,92.919c-4.971,0-9,4.029-9,9v29.077c0,4.971,4.029,9,9,9s9-4.029,9-9v-29.077
		C232.914,96.948,228.885,92.919,223.914,92.919z"
                                                                />
                                                            </g>
                                                        </svg>
                                                        <small>
                                                            {movieTV.original_language.toUpperCase()}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-white">
                                    No Similar{" "}
                                    {category.current === "movie"
                                        ? "Movies"
                                        : "TV Series"}{" "}
                                    Found!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemDetail;
