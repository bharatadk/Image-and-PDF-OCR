import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div
            style={{
                display: "flex",
                listStyle: "none",
                position: "fixed",
                top: "0",
                width: "560px",
                height: "50px",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}
        >
            {" "}
            <Link
                to="/"
                style={{
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: "blue",
                    height: "100%",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "blue",
                        height: "100%",
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    🖼️ Image OCR
                </div>
            </Link>
            <Link
                to="/pdf"
                style={{
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: "red",
                    height: "100%",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                <div
                    style={{
                        backgroundColor: "red",
                        height: "100%",
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    📄 PDF OCR
                </div>
            </Link>
        </div>
    );
};
export default Navbar;
