import React from "react";
import Me from "../../../static/img/me.jpg";

const Home = () => {
  return (
    <>
        <div className="homepage-wrapper">
            <div className="homepage-container">
                <h1>Om mig</h1>
                <div className="homepage-text-container">
                    <p> Hej! Kristoffer heter jag och är en 27 åring från Stockholm. På sidan av studierna så brukar jag spendera en hel del tid framför burken med antingen design-relaterade program eller diverse spel med polarna. Utöver det så ser jag fram emot
                        att få utöka mina kunskaper inom programmering nu under hösten!
                    </p>
                <img src={Me}></img>
                </div>
            </div>
        </div>
    </>
  );
};

export default Home;
