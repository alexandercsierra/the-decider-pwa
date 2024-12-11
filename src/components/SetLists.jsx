import "../styles.css";
import React, { useState } from "react";

const SetLists = ({ setNames }) => {
    const [values, setValues] = useState({
        listA: "",
        listB: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    const handleClick = () => {
        console.log({ values });
        setNames(values);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "250px",
                    }}
                >
                    <label>Name Choice 1</label>
                    <input name="listA" value={values.listA} onChange={handleChange} />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "250px",
                    }}
                >
                    <label>Name Choice 2</label>
                    <input name="listB" value={values.listB} onChange={handleChange} />
                </div>
            </div>
            <button
                onClick={handleClick}
                style={{
                    background: "#138496",
                    // width: "60px",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "25px",
                    fontWeight: "700",
                }}
            >
                Set Names
            </button>
        </div>
    );
};

export default SetLists;