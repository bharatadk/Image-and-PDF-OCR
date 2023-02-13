import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DragDropFiles from "./DragDropFiles";

const fileTypes = ["PNG", "JPG", "JPEG"];
const apiUrl = "http://bharat7243.pythonanywhere.com";
//const apiUrl = " http://127.0.0.1:5000";

export default function Uploader() {
    const time24 = () => {
        var date = new Date();
        return (
            ("0" + (date.getHours() % 24)).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2)
        );
    };
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [startTime, setStartTime] = useState(time24());
    const [files, setFiles] = useState([]);

    return (
        <div
            className="App"
            style={{
                backgroundColor: "white",
                padding: "10px 40px",
                borderRadius: "20px",
                boxShadow: "20px 15px 60px #444",
            }}
        >
            <div>
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        marginLeft: "-100px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {" "}
                </div>
            </div>
            <div
                style={{
                    padding: "30px 20px",
                    borderRadius: "20px",
                }}
            >
                {" "}
                <h2>🖼️ Image OCR</h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        backgroundColor: "lightblue",
                        padding: "2px",
                    }}
                >
  <div
                        style={{
                            fontSize: "25px",
                            backgroundColor: "lightblue",
                            borderRadius: "10px",
                            marginRight: "10px",
                            padding: "2px",
                        }}
                    >
                        <span style={{ fontSize: "20px" }}>
                            Pick Time📅&nbsp;
                        </span>
                    </div>                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <DateTimePicker
                            startDate={startDate}
                            setStartDate={setStartDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                        />
                    </div>
                </div>
                <div
                    style={{
                        marginTop: "20px",
                        width: "430px",
                    }}
                >
                    <DragDropFiles
                        apiUrl={apiUrl}
                        startDate={startDate}
                        startTime={startTime}
                    />
                </div>
                <br />
            </div>
        </div>
    );
}
