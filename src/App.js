import "./styles.css";
import React from "react";
import List from "./components/List";
import useDecider from "./hooks/useDecider";
import SetLists from "./components/SetLists";


export default function App() {

  const { names, setNames, listA, setListA, listB, setListB, showTotals, setShowTotals, showColors, setShowColors, deleteItem, editItem, getTotal, getWinner } = useDecider()

  return names.listA && names.listB ? (
    <div className="App">
      <h1>The Decider 👩‍⚖️</h1>
      <h2>Enter pros/cons with numeric weights</h2>
      <button
        onClick={() => setShowTotals(!showTotals)}
        style={{
          background: "#138496",
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

