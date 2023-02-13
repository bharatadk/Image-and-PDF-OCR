import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DragDropFiles = ({ apiUrl, startDate, startTime }) => {
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");

    const [files, setFiles] = useState(null);
    const inputRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };
    useEffect(() => {
        // Retrieve the value from localStorage and set it in the state
        const storedValue = localStorage.getItem("user_email");
        if (storedValue) {
            setGmail(storedValue);
        }
    }, []);
    // send files to the server // learn from my other video
    const handleUpload = () => {
        const formData = new FormData();
        [...files].forEach((file, idx) => {
            formData.append(`file${idx}`, file, file.name);
        });
        formData.append("date", startDate);
        formData.append("time", startTime);
        formData.append("user_email", gmail);
        const postRequest = async () => {
            try {
                const upload = await axios.post(
                    `${apiUrl}/api/v1/upload/image`,
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

        if (files.length < 6) {
            postRequest();
        }
    };

    if (files && files.length > 5) {
        return (
            <div
                style={{
                    border: "5px dotted blue",
                    borderRadius: "10px",
                    padding: "5px",
                    height: "200px",
                }}
            >
                {" "}
                <p style={{ color: "red", marginTop: "100px" }}>
                    Cannot upload More than 5 files
                </p>
                <div>
                    <button
                        style={{
                            backgroundColor: "orange",
                            marginRight: "2px",
                        }}
                        onClick={() => setFiles(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
    if (files && files.length < 6)
        return (
            <div
                style={{
                    border: "5px dotted blue",
                    borderRadius: "10px",
                    padding: "5px",
                    height: "200px",
                }}
            >
                <ol>
                    {Array.from(files).map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                    ))}
                </ol>
                <div style={{ minMarginTop: "100px" }}>
                    <button
                        style={{
                            backgroundColor: "orange",
                            marginRight: "2px",
                        }}
                        onClick={() => setFiles(null)}
                    >
                        Cancel
                    </button>
                    <button
                        style={{ backgroundColor: "lightblue" }}
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => {
                        setGmail(e.target.value);
                        localStorage.setItem("user_email", gmail);
                    }}
                    placeholder="Enter your email"
                    value={gmail}
                    type="email"
                    required
                    onBlur={() => localStorage.setItem("user_email", gmail)}
                    autoComplete="on"
                    style={{
                        padding: "5px",
                        width: "95%",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        backgroundColor: "#ffbf80",
                    }}
                />
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                        border: "5px dotted blue",
                        borderRadius: "10px",
                        padding: "5px",
                        height: "200px",
                    }}
                >
                    <h2 style={{ marginTop: "40px" }}>⬇️ Drag Files Here</h2>
                    <input
                        type="file"
                        multiple
                        onChange={(event) => setFiles(event.target.files)}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                    />
                    <button onClick={() => inputRef.current.click()}>
                        Select Files
                    </button>
                </div>
            </form>
        </>
    );
};

export default DragDropFiles;
