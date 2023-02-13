import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const fileTypes = ["PDF"];
import Spinner from "../Spinner/Spinner";

export default function PDFUploader() {
    const navigate = useNavigate();

    const [scanned, setScanned] = useState(false);
    const [files, setFiles] = useState([]);
    const handleSubmit = () => {};
    const handleChange = async (filesArr) => {
        setFiles(filesArr);
        const formData = new FormData();
        [...filesArr].forEach((file, idx) => {
            formData.append(`file${idx}`, file, file.name);
        });
        const postRequest = async () => {
            try {
                let upload;
                if (scanned) {
                    upload = await axios.post(
                        "http://bharat7243.pythonanywhere.com/uploadPdf",
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data" },
                        }
                    );
                } else {
                    upload = await axios.post(
                        "http://bharat7243.pythonanywhere.com/uploadPdfFormatted",
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data" },
                        }
                    );
                }

                const data = await upload.data;
                localStorage.setItem("result_ocr", data.text);
                localStorage.setItem("isOver5", data.isOver5);
                navigate("/result");
            } catch (err) {
                console.log(err.message);
            }
        };
        if (filesArr.length < 2) {
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
                <h2>📄 PDF OCR</h2>
                Supported Languages: en-US{" "}
                <div
                    style={{
                        height: "30px",
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: scanned ? "green" : "gray",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "20px",
                    }}
                    onClick={() => setScanned(!scanned)}
                >
                    🖨️ Click here to select Scanned PDF
                </div>
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
                ) : files.length > 1 ? (
                    <p style={{ color: "red" }}>
                        Cannot upload More than 1 files
                    </p>
                ) : (
                    <div style={{ color: "green" }}>
                        <Spinner />
                        <p>{files.length} file uploading and Processing</p>
                    </div>
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
