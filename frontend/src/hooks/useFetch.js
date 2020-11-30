import { useState } from "react";



export default function useFetch(url) {
    const [data, setData] = useState(null);

    getData(url)

    async function getData(url) {
        let pog;
        let item;   
        pog = await fetch(url); //update to get two dates, start and beginning
        item = await pog.json();    
        setData(item);
    }

    return data;
}
