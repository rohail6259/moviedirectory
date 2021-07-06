import React, { useState, useEffect, useContext, useRef } from "react";
import { MDContext } from "../Services/context/context";
import { FirstLetterCapital } from "../Utils/FirstLetterCapital";

const ItemDetail = ({ match }) => {
    const { url } = match;

    const { contextData, dispatch } = useContext(MDContext);
    const { discoverMovieDetails, discoverTVDetails } = contextData;

    const [itemDetailData, setItemDetailData] = useState({});

    const pathId = useRef(url);
    const cateogory = useRef(url.split("/")[1]);

    useEffect(() => {
        dispatch({
            type: "GET_DISCOVER_MOVIES_DETAILS",
            payload: { pathId: pathId.current },
        });
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            setItemDetailData(
                cateogory.current === "movie"
                    ? discoverMovieDetails
                    : discoverTVDetails
            );
        }, 1000);
    }, [discoverMovieDetails, discoverTVDetails]);

    return (
        <section>
            <div className="container-fluid item-details">
                <div className="row">
                    {/* HERO VIDEO */}
                    <div className="col-12">
                        <h5 className="text-white">
                            Home / {FirstLetterCapital(cateogory.current)} /{" "}
                            {itemDetailData?.movieData?.original_title}
                        </h5>
                        <video
                            preload="auto"
                            autoPlay={true}
                            controls={true}
                            src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
                        ></video>
                    </div>
                    {/* SEPARATOR */}
                    <div className="hr"></div>
                    {/* INFO */}
                    <div className="col-12">
                        <div className="row">
                            <div className="d-none d-md-flex col-md-4 col-lg-3 col-xl-2">
                                <img
                                    className="img-fluid poster"
                                    loading="eager"
                                    src={`${process.env.REACT_APP_IMAGE_API}/w500/${itemDetailData?.movieData?.poster_path}`}
                                    alt={
                                        itemDetailData?.movieData
                                            ?.original_title
                                    }
                                />
                            </div>
                            <div className="col">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="text-white">
                                        {
                                            itemDetailData?.movieData
                                                ?.original_title
                                        }{" "}
                                        {`(${
                                            itemDetailData?.movieData?.release_date?.split(
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
                                        {itemDetailData?.movieData?.vote_count}
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
                                                itemDetailData?.movieData
                                                    ?.vote_average
                                            }
                                        </small>
                                    </div>
                                    <small className="text-white">
                                        {itemDetailData?.movieData?.runtime} min
                                    </small>
                                </div>
                                <p className="text-white pt-3">
                                    {itemDetailData?.movieData?.overview}
                                </p>
                                <ul className="list-unstyled text-white">
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Genre:{" "}
                                        </div>
                                        <div className="col d-flex px-0">
                                            {itemDetailData?.movieData?.genres?.map(
                                                (e, idx) => (
                                                    <span
                                                        key={`genre-${idx}`}
                                                        className="px-1"
                                                    >
                                                        {e.name}
                                                        {idx <
                                                        itemDetailData
                                                            ?.movieData?.genres
                                                            ?.length -
                                                            1
                                                            ? ", "
                                                            : ""}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Revenue:{" "}
                                        </div>
                                        <div className="col px-0">
                                            ${" "}
                                            {itemDetailData?.movieData?.revenue}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Budget:{" "}
                                        </div>
                                        <div className="col px-0">
                                            ${" "}
                                            {itemDetailData?.movieData?.budget}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Status:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieData?.status}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Language:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieData
                                                ?.spoken_languages?.length > 0
                                                ? itemDetailData.movieData
                                                      ?.spoken_languages[0]
                                                      ?.name
                                                : ""}
                                        </div>
                                    </li>
                                    <li className="d-flex mb-1">
                                        <div className="col-2 px-0">
                                            Tagline:{" "}
                                        </div>
                                        <div className="col px-0">
                                            {itemDetailData?.movieData?.tagline}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* CAST */}
                        <div className="cast py-5">
                            <h2 className="text-white pb-2">Cast</h2>
                            <div className="row flex-row flex-nowrap">
                                {itemDetailData?.creditData?.cast?.map(
                                    (cast, idx) => (
                                        <div
                                            key={`cast-${idx}`}
                                            className="col-auto"
                                        >
                                            <img
                                                className="img-fluid"
                                                src={`${process.env.REACT_APP_IMAGE_API}/w500/${cast.profile_path}`}
                                                alt={cast.name}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        {/* CREW */}
                        <div className="crew py-5">
                            <h2 className="text-white pb-2">Crew</h2>
                            <div className="row flex-row flex-nowrap">
                                {itemDetailData?.creditData?.crew?.map(
                                    (cast, idx) => (
                                        <div
                                            key={`cast-${idx}`}
                                            className="col-auto"
                                        >
                                            <img
                                                className="img-fluid"
                                                src={`${process.env.REACT_APP_IMAGE_API}/w500/${cast.profile_path}`}
                                                alt={cast.name}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemDetail;
