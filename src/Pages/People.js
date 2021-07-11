import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MDContext } from "../Services/context/context";
import { PageTitle } from "../Utils/PageTitle";

const People = () => {
    PageTitle("TVM Directory - People");

    const { contextData, dispatch } = useContext(MDContext);
    const { people } = contextData;

    const [peopleData, setPeopleData] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        dispatch({ type: "GET_PEOPLE", payload: { page: pageCount } });
    }, [dispatch, pageCount]);

    useEffect(() => {
        setTimeout(() => {
            let data = [...people];
            setPeopleData(data);
        }, 500);
    }, [people, pageCount]);

    const onClickLoadMore = () => {
        let count = pageCount;
        count += 1;
        setPageCount(count);
    };

    return (
        <section>
            <div className="container-fluid celeb">
                <div className="row">
                    <div className="col-12 cast">
                        <h2 className="text-white pb-2">People</h2>
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
