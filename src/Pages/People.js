import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { MDContext } from "../Services/context/context";
import { PageTitle } from "../Utils/PageTitle";
import EnableScrolling from "../Utils/EnableScrolling";
import FadeInPage from "../Utils/FadeInPage";

const People = () => {
    // PAGE TITLE HELPER FUNCTION
    PageTitle("TVM Directory - People");

    // ENABLE BODY SCROLL
    EnableScrolling();

    // ELEMENT REFERENCE VARIBALE
    const celebRef = useRef(null);

    // GLOBAL STATE & DISPATCHER
    const { contextData, dispatch } = useContext(MDContext);
    const { people } = contextData;

    // COMPONENT STATES
    const [peopleData, setPeopleData] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    // FETCH "GET_PEOPLE" DATA WHEN COMPONENT LOADS
    useEffect(() => {
        dispatch({ type: "GET_PEOPLE", payload: { page: pageCount } });
    }, [dispatch, pageCount]);

    // FADING IN PAGE WITH 1 SECOND DELAPY WHEN COMPONENT LOADS
    useEffect(() => {
        setTimeout(() => {
            FadeInPage(celebRef.current);
        }, 1000);
    }, []);

    // SETTING COMPONENT STATE WITH HALF A SECOND DELAY WHEN COMPONENT LOADS
    useEffect(() => {
        setTimeout(() => {
            let data = [...people];
            setPeopleData(data);
        }, 500);
    }, [people, pageCount]);

    // LOAD MORE ITEMS
    const onClickLoadMore = () => {
        let count = pageCount;
        count += 1;
        setPageCount(count);
    };

    return (
        <section className="celeb" ref={celebRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 cast">
                        <h2 className="text-white pb-2">People</h2>
                        {/* LIST */}
                        <div className="row">
                            {peopleData.map((p, idx) => (
                                <div
                                    key={`member-${idx}`}
                                    className="col-6 col-md-4 col-lg-3 col-xl-2 mb-5"
                                >
                                    <Link
                                        to={
                                            p.profile_path !== null
                                                ? `/person/${p.id}`
                                                : "#"
                                        }
                                    >
                                        <img
                                            className="img-fluid"
                                            src={`${
                                                p.profile_path !== null
                                                    ? `${process.env.REACT_APP_IMAGE_API}/w300${p.profile_path}`
                                                    : "/sample.jpeg"
                                            }`}
                                            alt={p.name}
                                        />
                                        <h6 className="text-white pt-2 name">
                                            {p.name}
                                        </h6>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {/* LOAD MORE BUTTON */}
                        <div className="row">
                            <div className="col-12 d-flex align-items-center justify-content-center py-5">
                                <button
                                    className="load-more"
                                    onClick={() => onClickLoadMore()}
                                >
                                    Load More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default People;
