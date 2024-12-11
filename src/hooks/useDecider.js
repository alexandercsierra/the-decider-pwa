import { useEffect, useState } from "react";


const useDecider = () => {
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

    return { names, setNames, listA, setListA, listB, setListB, showTotals, setShowTotals, showColors, setShowColors, deleteItem, editItem, getTotal, getWinner }
}

export default useDecider;

