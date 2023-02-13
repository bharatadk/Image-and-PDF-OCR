import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import PDFUploader from "./components/Uploader/PDFUploader";
import Uploader from "./components/Uploader/Uploader";
import "./App.css";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Uploader />} />
                    <Route path="/pdf" element={<PDFUploader />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="*" element={<div> <a href="/"> Go to HomePage</a></div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
