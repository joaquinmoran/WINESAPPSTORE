import React, { useState, useEffect } from "react";
import WinesAppService from '../Services/wineApp.service';

export default function ShowCart() {

    const [ cartWines, setCartWines] = useState([]);

    function getWinesList() {
        WinesAppService.getWinesFromCart().then(
            (response) => {
                console.log('data:',response);
                setCartWines(response);
            }
        )
    }

    useEffect(() => {
        getWinesList();
    }, [])

    return (
    <div>
      {/* Verificar si cartWines no está vacío y mostrar los elementos */}
      {cartWines.length !== 0 ? (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Vinos en el carrito
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartWines.map((wine, index) => (
                        <tr>
                            <td key={index}>{wine.name}</td>
                            <td>${wine.price}</td>
                            <td>
                                <button className="del-button">Borrar</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>

        </div>
      ) : (
        <h1>No hay vinos en el carrito</h1>
      )}

    </div>
  );
}

//calcular total: boton para mostrar el monto.
// al borrar un elemneto del carrito, quiero que se actualize tambien en el backend, pero para mostrarlo
//la logica la manejo en el componente este.