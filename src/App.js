import "./styles.css";
import React, { useEffect, useState } from "react";
import List from "./components/List";
import ListForm from "./components/ListForm";

export default function App() {
  const [names, setNames] = useState({
    listA: localStorage.getItem("listAName") || "",
    listB: localStorage.getItem("listBName") || "",
  });
  const [listA, setListA] = useState(
    JSON.parse(localStorage.getItem("listA")) || []
  );
  const [listB, setListB] = useState(
    JSON.parse(localStorage.getItem("listB")) || []
  );
  const [showTotals, setShowTotals] = useState(false);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    localStorage.setItem("listA", JSON.stringify(listA));
    localStorage.setItem("listB", JSON.stringify(listB));
  }, [listA, listB]);

  useEffect(() => {
    localStorage.setItem("listAName", names.listA);
    localStorage.setItem("listBName", names.listB);
  }, [names.listA, names.listB]);

  const deleteItem = (item, listLetter) => {
    const list = listLetter === "A" ? listA : listB;
    const newList = list.filter((listItem) => listItem.id !== item.id);
    listLetter === "A" ? setListA(newList) : setListB(newList);
  };

  const editItem = (item, listLetter) => {
    const list = listLetter === "A" ? listA : listB;
    const newList = list.filter((listItem) => listItem.id !== item.id);
    listLetter === "A"
      ? setListA([...newList, item])
      : setListB([...newList, item]);
  };

  const getTotal = (list) => {
    return list.reduce((curr, total) => curr + Number(total.num), 0);
  };

  const getWinner = () => {
    const totalA = getTotal(listA);
    const totalB = getTotal(listB);
    if (totalA === totalB) {
      return "It's a draw";
    }
    return getTotal(listA) > getTotal(listB)
      ? `The winner is ${names.listA}`
      : `The winner is ${names.listB}`;
  };

  return names.listA && names.listB ? (
    <div className="App">
      <h1>The Decider 👩‍⚖️</h1>
      <h2>Enter pros/cons with numeric weights</h2>
      <button
        onClick={() => setShowTotals(!showTotals)}
        style={{
          background: "#138496",
          // width: "60px",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "4px",
          marginLeft: "5px",
          fontWeight: "700",
        }}
      >
        {showTotals ? "Hide Winner" : "Get Winner"}
      </button>
      <button
        onClick={() => setShowColors(!showColors)}
        style={{
          background: "#138496",
          // width: "60px",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "4px",
          marginLeft: "5px",
          fontWeight: "700",
        }}
      >
        {showColors ? "Hide Colors" : "Show Colors"}
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          setListA([]);
          setListB([]);
          setNames({
            listA: "",
            listB: "",
          });
        }}
        style={{
          background: "#138496",
          // width: "60px",
          color: "white",
          padding: "15px",
          border: "none",
          borderRadius: "4px",
          marginLeft: "5px",
          fontWeight: "700",
        }}
      >
        Reset
      </button>
      <p
        style={{
          visibility: showTotals ? "visible" : "hidden",
          fontWeight: "600",
          fontSize: "1.2rem",
          color: "white",
          background: "#563d7c",
          padding: "20px",
          borderRadius: "35px",
        }}
      >
        {getWinner()} 🎉
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <h4>{names.listA}</h4>
          <List
            list={listA}
            setList={setListA}
            showTotals={showTotals}
            deleteItem={deleteItem}
            editItem={editItem}
            listLetter={"A"}
            showColors={showColors}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <h4>{names.listB}</h4>
          <List
            list={listB}
            setList={setListB}
            showTotals={showTotals}
            deleteItem={deleteItem}
            editItem={editItem}
            listLetter={"B"}
            showColors={showColors}
          />
        </div>
      </div>
    </div>
  ) : (
    <div
      className="App"
      style={{
        height: "100vh",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(67deg, rgba(2,0,36,1) 0%, rgba(63,9,121,1) 35%, rgba(250,254,255,1) 100%)",
      }}
    >
      <h1>The Decider</h1>
      <h2>Name the choices</h2>
      <SetLists setNames={setNames} names={names} />
    </div>
  );
}

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
