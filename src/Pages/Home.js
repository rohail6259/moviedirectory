import React from "react";
import HeroSlider from "../Componets/Home/HeroSlider";
import TopRated from "../Componets/Home/TopRated";
import Discover from "../Componets/Home/Discover";
import { PageTitle } from "../Utils/PageTitle";

const Home = () => {
    PageTitle("TVM Directory - Home");

    return (
        <section className="home">
            <HeroSlider />
            <TopRated />
            <Discover type="movies" />
            <Discover type="TV" />
        </section>
    );
};

export default Home;
