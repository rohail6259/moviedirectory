import React, { useState, useEffect, useContext } from "react";
import { MDContext } from "../Services/context/context";
import { Link } from "react-router-dom";
import { PageTitle } from "../Utils/PageTitle";

const PersonDetail = ({ match }) => {
    const {
        params: { id },
    } = match;

    const { contextData, dispatch } = useContext(MDContext);
    const { personDetail, currentType } = contextData;

    const [personData, setPersonData] = useState({});

    PageTitle(`TVM Directory - ${personDetail?.personInfo?.name || "Celebrity Profile"}`);

    useEffect(() => {
        dispatch({
            type: "GET_PERSON_DETAIL",
            payload: { id, path: currentType },
        });
    }, [dispatch, id, currentType]);

    useEffect(() => {
        let isDataAvailable = false;

        if (personDetail) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (personDetail.personInfo.id > 0) {
                    isDataAvailable = true;
                    setPersonData(personDetail);
                } else fetchData();
            }, 1000);
        }
    }, [personDetail]);

    const getAge = (dob) => {
        return new Date().getFullYear() - parseInt(dob?.split("-")[0]);
    };

    return (
        <>
            <section className="py-5">
                <div className="container-fluid person">
                    <div className="row">
                        <div className="col-12 col-lg-4 col-xl-3 ">
                            <h2 className="text-white pb-3 name d-block d-lg-none">
                                {personDetail?.personInfo?.name || "N/A"}
                            </h2>
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-12">
                                    <div className="row">
                                        <img
                                            className="img-fluid picture"
                                            src={`${
                                                personDetail?.personInfo
                                                    ?.profile_path !== null
                                                    ? `${process.env.REACT_APP_IMAGE_API}/w500${personDetail?.personInfo?.profile_path}`
                                                    : "/sample.jpeg"
                                            }`}
                                            alt={personDetail?.personInfo?.name}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-8 col-lg-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="text-white title pb-3 py-lg-3">
                                                Personal Info
                                            </h4>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="text-white title mb-1">
                                                Birthday
                                            </h5>
                                            <p className="text-white detail mb-3">
                                                {personDetail?.personInfo
                                                    ?.birthday || "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="text-white title mb-1">
                                                Age
                                            </h5>
                                            <p className="text-white detail mb-3">
                                                {`${
                                                    getAge(
                                                        personDetail?.personInfo
                                                            ?.birthday
                                                    ) || "N/A"
                                                } years old`}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="text-white title mb-1">
                                                Place of Birth
                                            </h5>
                                            <p className="text-white detail mb-3">
                                                {personDetail?.personInfo
                                                    ?.place_of_birth || "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <h5 className="text-white title mb-1">
                                                Known For
                                            </h5>
                                            <p className="text-white detail mb-3">
                                                {personDetail?.personInfo
                                                    ?.known_for_department ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-12 d-block d-lg-none">
                                            <h4 className="text-white title">
                                                Biography
                                            </h4>
                                            <p className="text-white">
                                                {personDetail?.personInfo
                                                    ?.biography ||
                                                    "No Biography found!"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 col-xl-9">
                            <h2 className="text-white name d-none d-lg-block">
                                {personDetail?.personInfo?.name || "N/A"}
                            </h2>

                            <h5 className="text-white title d-none d-lg-block">
                                Biography
                            </h5>
                            <p className="text-white d-none d-lg-block">
                                {personDetail?.personInfo?.biography ||
                                    "No Biography found!"}
                            </p>

                            <h4 className="text-white title">Known for</h4>
                            <div className="record-known-for">
                                {personData?.credit?.cast?.length > 0 ? (
                                    <div className="row flex-row flex-nowrap">
                                        {personData?.credit?.cast?.map(
                                            (movie, idx) => {
                                                return movie.profile_path !==
                                                    null ? (
                                                    <div
                                                        key={`movie-${idx}`}
                                                        className="col-auto"
                                                    >
                                                        <Link
                                                            to={`/${currentType}/${movie.id}`}
                                                        >
                                                            <img
                                                                className="img-fluid"
                                                                src={`${
                                                                    movie.poster_path !==
                                                                    null
                                                                        ? `${process.env.REACT_APP_IMAGE_API}/w500${movie.poster_path}`
                                                                        : "/sample.jpeg"
                                                                }`}
                                                                alt={
                                                                    movie.original_title
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    ""
                                                );
                                            }
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-white text-center">
                                        No Record Found!
                                    </p>
                                )}
                            </div>
                            {/* ROLES PLAYED */}
                            <h4 className="text-white title py-4">
                                Roles Played
                            </h4>
                            <div className="row">
                                {personDetail?.credit?.cast?.map(
                                    (role, idx) => (
                                        <div
                                            key={`role-${idx}`}
                                            className="col-12 d-flex roles text-white px-0"
                                        >
                                            <div className="col-auto">
                                                <p>
                                                    {role?.release_date?.split(
                                                        "-"
                                                    )[0] || "1900"}
                                                </p>
                                            </div>
                                            <div className="col-8">
                                                <p>
                                                    <span>
                                                        {role?.original_title ||
                                                            "N/A"}
                                                    </span>{" "}
                                                    <span>as</span>{" "}
                                                    <span className="character">
                                                        {role?.character ||
                                                            "N/A"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PersonDetail;
