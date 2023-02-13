import { useState, useEffect } from "react";

const Result = () => {
    const [message, setMessage] = useState(
        localStorage.getItem("result_ocr") | "p"
    );
    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    useEffect(() => {
        // CHECK IF THERE IS A LOGGED IN USER FROM PREVIOUS SESSIONS
        const loggedUserJSON = window.localStorage.getItem("result_ocr");
        if (loggedUserJSON) {
            setMessage(loggedUserJSON);
        }
    }, []);

    useEffect(() => {
        console.log(message);
    }, [message]);

    return (
        <>
            <textarea
                onChange={handleChange}
                value={message}
                style={{ width: "500px", height: "500px", overflow: "scroll" }}
            ></textarea>
        </>
    );
};

export default Result;
