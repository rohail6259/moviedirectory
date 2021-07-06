import React, { useState, useEffect, useContext } from "react";
import { MDContext } from "../../Services/context/context";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HeroSlider = () => {
    const { contextData } = useContext(MDContext);
    const { nowPlaying } = contextData;

    const [nowPlayingData, setNowPlaying] = useState([]);

    useEffect(() => {
        setTimeout(() => setNowPlaying(nowPlaying), 200);
    }, [nowPlaying]);

    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showArrows={false}
            showThumbs={false}
            dynamicHeight={true}
        >
            {nowPlayingData.map((movie, idx) => (
                <div key={`now-playing-${idx}`}>
                    <img className="img-fluid"
                        src={`${process.env.REACT_APP_IMAGE_API}/w1280/${movie.poster_path}`}
                        alt="img"
                    />
                    <div className="col-12 d-flex align-items-end justify-content-start info">
                        <h1>hello</h1>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default HeroSlider;
