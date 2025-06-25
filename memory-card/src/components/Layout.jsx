import { useEffect, useState } from "react";

export const Layout = () =>{
    const [srcArr, setSrcArr] = useState([]);

    useEffect(() =>{
        const urls = [];
        for (let i = 1; i <= 12; i++) {
            urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`);
        }
        setSrcArr(urls);
    }, []);

    return (
        <>
        <h1>Memory Cards</h1>
        <div className="grid-container">
            {srcArr.map((src, index) => (
                <button>
                <img key={index} src={src} alt={`Pokemon ${index + 1}`} />
                </button>
            ))}
        </div> 
        </>
    )
}

