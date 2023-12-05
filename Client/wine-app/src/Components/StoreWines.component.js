import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import './StoreWines.css'; 

export default function StoreWines() {

    const [ wines, setWines ]  = useState([]);

    function getAllWines() {
        WinesAppService.getWinesList().then(
            (response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setWines(response.data);
                }else {
                    alert("Error: status " + response.status);
                }
            })
        .catch((error) => {
            console.log('error while getting wines.', error);
        })
    }


    useEffect(() => {
        getAllWines();
    }, [])


    return (
        <div className="store-container">
            <div className="wines-catalogue">
                {
                    wines && wines.length > 0 ? (
                        wines.map((wine) => {
                            return (
                                <div className="wines-cat" key={wine.id}>
                                    <div className="wine-image" style={{backgroundImage: `url(${wine.img})`}}
                                            onClick={() => console.log('URL de la imagen:', `${wine.img}`)}/>
                                    <button className="wines-b">{wine.name}</button>
                                    <p>{wine.price}</p>
                                </div>
                            )
                        }) 
                    ) : (
                        <li>No hay vinos disponibles</li>
                    )
                }
            </div>
        </div>
    )
}