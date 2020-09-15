import React, { useEffect, useState } from "react";
import Me from "../../../static/img/me.jpg";

const Home = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("http://localhost:3080/")
        .then(res => res.json())
        .then(res => setText(res.text))
    })
    return (
        <>
            <div className="homepage-wrapper">
                <div className="homepage-container">
                    <h1>Om mig</h1>
                    <div className="homepage-text-container">
                    <p>
                        {text}
                    </p>
                    <img src={Me} alt="me"></img>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
