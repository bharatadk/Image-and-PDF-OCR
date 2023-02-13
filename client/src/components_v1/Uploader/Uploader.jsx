import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DragDropFiles from "./DragDropFiles";

const fileTypes = ["PNG", "JPG", "JPEG"];
// const apiUrl = "http://bharat7243.pythonanywhere.com";
const apiUrl = " http://127.0.0.1:5000";

export default function Uploader() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    const [files, setFiles] = useState([]);
    const handleSubmit = () => {};
    const handleChange = async (filesArr) => {
        setFiles(filesArr);

        const formData = new FormData();
        [...filesArr].forEach((file, idx) => {
            formData.append(`file${idx}`, file, file.name);
        });

        formData.append(
            "date_set_by_user",
            Date.parse(
                startDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            )
        );

        // formData.append("date_set_by_user", startDate);
        const postRequest = async () => {
            try {
                const upload = await axios.post(
                    `${apiUrl}/uploadImage`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                const data = await upload.data;
                localStorage.setItem("result_ocr", data.text);
                localStorage.setItem("isOver5", data.isOver5);

                navigate("/result");
            } catch (err) {
                console.log(err.message);
            }
        };
        if (filesArr.length < 6) {
            postRequest();
        }
    };
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
                    padding: "20px",
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
                    }}
                >
                    <div
                        style={{
                            marginTop: "30px",
                            fontSize: "25px",
                            // marginLeft: "2",
                            backgroundColor: "lightblue",
                            borderRadius: "10px",
                            marginRight: "10px",
                            padding: "2px",
                        }}
                    >
                        <span style={{ fontSize: "20px" }}>Pick Time</span> 📅
                    </div>
                    <DateTimePicker
                        startDate={startDate}
                        setStartDate={setStartDate}
                    />
                </div>
                <div
                    style={{
                        // marginLeft: "20",
                        marginTop: "40px",
                        width: "430px",
                    }}
                >
                    <DragDropFiles apiUrl={apiUrl} startDate={startDate} />
                </div>
                <br />
            </div>
        </div>
    );
}
