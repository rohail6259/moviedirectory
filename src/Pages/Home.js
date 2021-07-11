import React, { useEffect, useRef } from "react";
import HeroSlider from "../Componets/Home/HeroSlider";
import TopRated from "../Componets/Home/TopRated";
import Discover from "../Componets/Home/Discover";
import { PageTitle } from "../Utils/PageTitle";
import { gsap } from "gsap";

const Home = () => {
    PageTitle("TVM Directory - Home");

    const introReelRef = useRef(null);
    const homeRef = useRef(null);
    const textWrapperRef = useRef(null);
    const body = document.querySelector("body");

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(
            introReelRef.current.childNodes[0],
            {
                duration: 1.5,
                height: "80%",
                ease: "power4.out",
            },
            1
        )
            .to(
                introReelRef.current.childNodes[0],
                {
                    duration: 1.5,
                    width: "90%",
                    ease: "sine.out",
                },
                2
            )
            .to(
                textWrapperRef.current,
                {
                    duration: 1,
                    autoAlpha: 1,
                    ease: "power4.out",
                },
                3
            )
            .to(
                textWrapperRef.current,
                {
                    duration: 1,
                    backgroundSize: "100% 100%",
                    ease: "power4.out",
                },
                4
            )
            .to(
                introReelRef.current.childNodes[0],
                {
                    duration: 1,
                    width: "100%",
                    height: "100%",
                    ease: "power4.out",
                },
                5
            )
            .to(
                introReelRef.current,
                {
                    duration: 1,
                    autoAlpha: 0,
                    ease: "power4.out",
                    onComplete: () => {
                        introReelRef.current.classList.add("d-none");
                        body.style.overflow = "visible";
                    },
                },
                6
            )
            .to(
                homeRef.current,
                {
                    duration: 3,
                    autoAlpha: 1,
                    ease: "power4.out",
                },
                7
            )
            .to(
                ".navbar-wrapper",
                {
                    duration: 3,
                    autoAlpha: 1,
                    ease: "power4.out",
                },
                7
            );
    }, []);

    return (
        <>
            <div className="intro-reel" ref={introReelRef}>
                <div className="block">
                    <div class="wrapper" ref={textWrapperRef}>
                        <div class="title">TVM</div>
                    </div>
                </div>
            </div>
            <section className="home" ref={homeRef}>
                <HeroSlider />
                <TopRated />
                <Discover type="movies" />
                <Discover type="TV" />
            </section>
        </>
    );
};

export default Home;
