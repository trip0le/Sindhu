import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
// import styled from "styled-components";
import "./ContactForm.css";


export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [aadhaar, setAadhaar] = useState("");
    const [history, setHistory] = useState("");
    const [hiv, setHiv] = useState("");
    const [thalassemia, setThalassemia] = useState("");
    const [hepatitis, setHepatitis] = useState("");
    const [jaundice, setJaundice] = useState("");
    const [age, setAge] = useState("");
    const [bmi, setBmi] = useState("");
    const [issue, setIssue] = useState("");
    const [choose, setChoose] = useState("");
    const [agreement, setAgreement] = useState("");
    const [hospital, setHospital] = useState("");

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_1g7tarj",
                "template_k97eo37",
                form.current,
                "QqXpKnYyvuFneWo6a"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setAadhaar("");
        setHistory("");
        setHiv("");
        setThalassemia("");
        setHepatitis("");
        setJaundice("");
        setAge("");
        setHospital("");
        setIssue("");
        setChoose("");
        setBmi("");
        setAgreement("");
    };

    return (
        <div className="container">
            <h1 className="h1">EXPRESS YOUR WISH TO DONATE/RECEIVE BLOOD</h1>
            <form ref={form} onSubmit={sendEmail} className="fr">
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="name">Name</label>
                        <input className="in" 
                            type="text"
                            id="name"
                            placeholder="Your name here"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="email">Email id</label>
                        <input className="in"
                            type="email"
                            id="email"
                            placeholder="Your email here"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="address">Address</label>
                        <input className="in"
                            type="text"
                            id="address"
                            placeholder="Your address here"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="phone">Contact Number</label>
                        <input className="in"
                            type="tel"
                            id="phone"
                            placeholder="Your contact number here"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="aadhaar">Aadhaar Number</label>
                        <input className="in"
                            type="number"
                            id="aadhaar"
                            placeholder="Your Aadhaar Number here"
                            name="aadhaar"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="history">In the past 12 months, how many times did you donate blood via Sindhu?</label>
                        <input className="in"
                            type="number"
                            id="history"
                            placeholder="Your input here"
                            name="history"
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="hiv">Are you HIV positive?</label>
                        <input className="in"
                            type="text"
                            id="hiv"
                            placeholder="Your input here"
                            name="hiv"
                            value={hiv}
                            onChange={(e) => setHiv(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="thalassemia">Do you have Thalassemia?</label>
                        <input className="in" 
                            type="text"
                            id="thalassemia"
                            placeholder="Your answer here"
                            name="thalassemia"
                            value={thalassemia}
                            onChange={(e) => setThalassemia(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="hepatitis">Do you have hepatitis?</label>
                        <input className="in"
                            type="text"
                            id="hepatitis"
                            placeholder="Your answer here"
                            name="hepatitis"
                            value={hepatitis}
                            onChange={(e) => setHepatitis(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="jaundice">In the last 6 months, did you suffer from Jaundice?</label>
                        <input className="in"
                            type="text"
                            id="jaundice"
                            placeholder="Your answer here"
                            name="jaundice"
                            value={jaundice}
                            onChange={(e) => setJaundice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="age">Age, in years</label>
                        <input className="in"
                            type="number"
                            id="age"
                            placeholder="Your age here"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="bmi">BMI</label>
                        <input className="in"
                            type="text"
                            id="bmi"
                            placeholder="Your bmi here"
                            name="height"
                            value={bmi}
                            onChange={(e) => setBmi(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="issues">If you have any other medical issues, let us know.</label>
                        <input className="in"
                            type="text"
                            id="issue"
                            placeholder="Your issue here"
                            rows="1"
                            name="issue"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                        ></input>
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="hospital">Enter your hospital</label>
                        <input className="in"
                            type="text"
                            id="hospital"
                            placeholder="Your hospital here"
                            rows="1"
                            name="hospital"
                            value={hospital}
                            onChange={(e) => setHospital(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label className="label" htmlFor="choose">Are you a donor or recipient? Enter your blood group.</label>
                        <input className="in"
                            type="text"
                            id="choose"
                            placeholder="Your input here"
                            name="choose"
                            value={choose}
                            onChange={(e) => setChoose(e.target.value)}
                        />
                    </div>
                    <div className="column">
                        <label className="label" htmlFor="agreement">Please write "I agree", as a token of acknowledgement.</label>
                        <input className="in"
                            type="text"
                            id="agreement"
                            placeholder="Your response here"
                            name="agreement"
                            value={agreement}
                            onChange={(e) => setAgreement(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="bt">Submit</button>
            </form>
        </div>
    );
}