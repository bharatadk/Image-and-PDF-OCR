import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./App.css";
import ocrImg from "./assets/ocr.png";
const fileTypes = ["PNG", "JPG", "JPEG"];

export default function Uploader() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const handleSubmit = () => {};
    const handleChange = async (filesArr) => {
        setFiles(filesArr);

        const formData = new FormData();
        [...filesArr].forEach((file, idx) => {
            // console.log(idx);
            // console.log(file.name);
            formData.append(`file${idx}`, file, file.name);
        });
        const postRequest = async () => {
            try {
                const upload = await axios.post(
                    "http://bharat7243.pythonanywhere.com/uploadImage",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                const data = await upload.data;
                console.log(data);
                localStorage.setItem("result_ocr", data);
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
                    padding: "20px",
                    borderRadius: "20px",
                }}
            >
                {" "}
                <h2>🖼️ Image OCR</h2>
                Supported Languages: en-US hi-IN
                <div
                    style={{
                        // marginLeft: "20",
                        marginTop: "40px",
                        width: "430px",
                    }}
                >
                    <FileUploader
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                </div>
                <br />
                {!files.length > 0 ? (
                    "No Files Uploaded"
                ) : files.length > 5 ? (
                    <p style={{ color: "red" }}>
                        Cannot upload More than 5 files
                    </p>
                ) : (
                    <p style={{ color: "green" }}>
                        {files.length} files uploaded
                    </p>
                )}
            </div>
            {/* <button
                onClick={handleSubmit}
                style={{ backgroundColor: "lightblue" }}
            >
                Submit
            </button> */}
        </div>
    );
}
