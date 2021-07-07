import React, { useState, useEffect, useContext } from "react";
import { MDContext } from "../Services/context/context";

const PersonDetail = ({ match }) => {
    const {
        params: { id, type },
    } = match;

    const { contextData, dispatch } = useContext(MDContext);
    const { personDetail } = contextData;

    const [personData, setPersonData] = useState({});

    console.log(personData);

    useEffect(() => {
        dispatch({
            type: "GET_PERSON_DETAIL",
            payload: { id, path: type },
        });
    }, [dispatch, id, type]);

    useEffect(() => {
        setTimeout(() => {
            setPersonData(personDetail);
        }, 1000);
    }, [personDetail]);

    return (
        <>
            <h1 className="text-white">{personDetail?.personInfo?.name}</h1>
            <h1 className="text-white">{personDetail?.personInfo?.birthday}</h1>
            <h1 className="text-white">
                {personDetail?.personInfo?.place_of_birth}
            </h1>
            <h1 className="text-white">
                {personDetail?.personInfo?.known_for_department}
            </h1>
            <img
                src={`${process.env.REACT_APP_IMAGE_API}/w500/${personDetail?.personInfo?.profile_path}`}
                alt={personDetail?.personInfo?.name}
            />
            <p className="text-white">{personDetail?.personInfo?.biography}</p>
        </>
    );
};

export default PersonDetail;
