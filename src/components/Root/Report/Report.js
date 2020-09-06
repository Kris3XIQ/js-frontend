import React, { useEffect, useState }  from 'react';
import { useParams } from "react-router-dom";
import ReadMe from '../../../README.md';

import ReactMarkdown from "react-markdown";

const Report = ({ match }) => {
    let { reportNr } = useParams();
    const [mdText, setMdText] = useState('');

    useEffect(() => {
        fetch(ReadMe)
            .then((response) => {
                if (response.ok) return response.text();
                else return Promise.reject("Didn't fetch text correctly");
            })
            .then((text) => {
                setMdText(text);
            })
            .catch((error) => console.error(error));
    }, []);
    if (reportNr == 1) {
        return (
            <>
                <div className="page-wrapper">
                    <div className="page-container">
                        <h1>Kmom: {reportNr}</h1>
                        <div className="page-text-container">
                            <ReactMarkdown source={mdText} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    <h1>Kmom: {reportNr}</h1>
                    <div className="page-text-container">
                        <p>Här var det tomt för tillfället</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report;
