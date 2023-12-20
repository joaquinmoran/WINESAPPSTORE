import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import wineAppService from "../Services/wineApp.service";
import './ShowCart.css'

export default function ShowCart() {

    const navigate = useNavigate();

    const [ cartWines, setCartWines] = useState([]);
    const [ total, setTotal] = useState(0);
    const [ showTotal, setShowTotal ] = useState(false);

    function getWinesList() {
        WinesAppService.getWinesFromCart().then(
            (response) => {
                console.log('data:',response);
                setCartWines(response);
            }
        )
    }

    function handleDeleteClick(index, wineId) {
        setCartWines(prevList => prevList.filter((_,i) => i !== index)) 
        wineAppService.deleteWineFromCart(wineId);
    }

    function handleTotal() {
       const prices = cartWines.map((wine) => wine.price);

       const total = prices.reduce((accum, price) => accum + price, 0);
       console.log(total);
       setTotal(total);
       setShowTotal(true);
    }

    function handleBackClick() {
        navigate('/store');
    }

    function handleOrderClick() {
        const userToken = localStorage.getItem('token');
        WinesAppService.saveOrder(userToken).then(
            (response) => {

        })
    }

    useEffect(() => {
        getWinesList();
        handleTotal();
    }, [])

    return (
    <div className="container-cart">
     <nav className='navbar'>
            <div className='top-nav-bar-left'>
                    <Link to='/show_wines' className='show-link'>
                        Nuestros Vinos  
                    </Link>
                    <Link to='/us' className='us-link'>
                        Acerca de nosotros
                    </Link>
            </div>  
        </nav> 
      {cartWines.length !== 0 ? (
        <div className="container-cart-page">

            <div className="container-table">

                <table className="table-cart">
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
                                <td>
                                    <button className="del-button" onClick={() => handleDeleteClick(index, wine.name)}>Borrar</button>
                                </td>
                                <td>${wine.price}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>  
                <div className="info-cart-container">
                    <h2>Resumen de compra</h2>
                    <hr />
                    <div>
                        {showTotal && 
                            <p style={{fontSize: '30px', marginBottom:'100px', marginTop:'100px'}}>
                                Total: ${total}
                            </p>
                        }
                    </div>
                    <button className="contact" onClick={() => handleOrderClick()} >Hacer pedido</button>
                </div>
        </div>
      ) : (
       <div className="nw-container">
            No hay vinos en el carrito :(
            <button className="back-button" onClick={() => handleBackClick()}>
                Volver al catalogo
            </button>
       </div>
      )}
    </div>
  );
}

//calcular total: boton para mostrar el monto.
// al borrar un elemneto del carrito, quiero que se actualize tambien en el backend, pero para mostrarlo
//la logica la manejo en el componente este.