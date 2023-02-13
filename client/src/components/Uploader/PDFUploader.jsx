import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DragDropPDF from "./DragDropPDF";

const fileTypes = ["PDF"];
const apiUrl = "http://bharat7243.pythonanywhere.com";
//const apiUrl = " http://127.0.0.1:5000";

export default function PDFUploader() {
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
    const [scanned, setScanned] = useState(false);
    const handleSubmit = () => {};

    const handleChange = async (filesArr) => {
        setFiles(filesArr);
        const formData = new FormData();
        [...filesArr].forEach((file, idx) => {
            formData.append(`file${idx}`, file, file.name);
        });

        formData.append("date", startDate);
        formData.append("time", startTime);
    };
    return (
        <div
            className="App"
            style={{
                backgroundColor: "white",
                padding: "40px",
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
                    padding: "10px 20px",
                    borderRadius: "20px",
                }}
            >
                <div style={{ padding: "20px 10px" }}>
                    <h2 style={{ display: "inline" }}>📄 PDF OCR</h2>{" "}
                    <div
                        style={{
                            display: "inline",
                            height: "30px",
                            marginTop: "10px",
                            padding: "10px",
                            backgroundColor: scanned ? "green" : "gray",
                            color: "white",
                            borderRadius: "20px",
                            fontSize: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => setScanned(!scanned)}
                    >
                        🖨️ Scanned PDF
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "lightblue",
                        borderRadius: "10px",
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
                    </div>
                    <div
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
                    <DragDropPDF
                        apiUrl={apiUrl}
                        startDate={startDate}
                        startTime={startTime}
                    />
                </div>
            </div>
        </div>
    );
}
