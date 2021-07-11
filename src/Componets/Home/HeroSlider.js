import React, { useState, useEffect, useContext, useRef } from "react";
import { MDContext } from "../../Services/context/context";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Link } from "react-router-dom";

const HeroSlider = () => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const { contextData } = useContext(MDContext);
    const { nowPlaying } = contextData;

    const [nowPlayingData, setNowPlaying] = useState([]);
    const posterRef = useRef(null);

    useEffect(() => {
        let isDataAvailable = false;

        if (nowPlaying) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (nowPlaying.length > 1) {
                    isDataAvailable = true;
                    setNowPlaying(nowPlaying);
                } else fetchData();
            }, 100);
        }
    }, [nowPlaying]);

    return (
        <Swiper
            autoplay={{ delay: 3000 }}
            spaceBetween={0}
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preloadImages={true}
            breakpoints={{
                480: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2.5,
                },
                1300: {
                    slidesPerView: 3,
                },
                1440: {
                    slidesPerView: 3.5,
                },
            }}
        >
            {nowPlayingData.map((movie, idx) => (
                <SwiperSlide key={`now-playing-${idx}`}>
                    <Link to={`/movie/${movie.id}`}>
                        <div className="hero">
                            <img
                                className="img-fluid hero-poster"
                                ref={posterRef}
                                src={`${process.env.REACT_APP_IMAGE_API}/w1280${movie.poster_path}`}
                                alt="img"
                            />
                            <div className="info text-white">
                                <h4 className="title mb-1">
                                    {movie.original_title}
                                </h4>
                                <p className="overview mb-0">
                                    {movie.overview}
                                </p>
                                <div className="d-flex">
                                    <ul className="d-flex list-unstyled mb-0">
                                        <li className="d-flex align-items-center">
                                            <svg
                                                className="mr-1"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                                                    fill="#ffc107"
                                                />
                                            </svg>
                                        </li>
                                        <li>
                                            <small className="vote">
                                                {movie.vote_average} |
                                            </small>
                                        </li>
                                    </ul>
                                    <ul className="d-flex align-items-end list-unstyled genres mb-0">
                                        {movie.genres.map((genre, idx) => (
                                            <li
                                                key={`genre-${idx}`}
                                                className="px-1 d-flex align-items-center"
                                            >
                                                {genre.name}
                                                {idx < movie.genres?.length - 1
                                                    ? ", "
                                                    : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroSlider;
