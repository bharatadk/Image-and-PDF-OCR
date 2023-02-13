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

    useEffect(() => {}, [message]);

    return (
        <>
            <textarea
                onChange={handleChange}
                value={message}
                style={{
                    width: "530px",
                    height: "460px",
                    overflow: "scroll",
                    marginTop: "30px",
                    padding: "10px",
                }}
            ></textarea>
            {localStorage.getItem("isOver5") == "yes" && (
                <h3 style={{ color: "orangered", marginBottom: "0" }}>
                    ⚠️ We only show first 5 pages of PDF in this version
                </h3>
            )}
            <p style={{ margin: "0" }}>
                {" "}
                ©️ Druidot Consulting Private Limited
            </p>
        </>
    );
};

export default Result;
