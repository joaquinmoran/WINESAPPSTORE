import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import wineAppService from "../Services/wineApp.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHome } from "@fortawesome/free-solid-svg-icons";
import '../styles/ShowCart.css'

export default function ShowCart() {

    const navigate = useNavigate();
    const [ cartWines, setCartWines] = useState([]);
    const [ total, setTotal] = useState(0);
    const [ orderDone, setOrderDone ] = useState(false);
    const [ order, setOrder ] = useState({});
    const [ contact, setContact ] = useState(false);
    const userToken = localStorage.getItem('token');
    const [ showTotal, setShowTotal ] = useState(0);
    let msg = '';

    function getWinesList() {
        WinesAppService.getWinesFromCart(userToken).then(
            (response) => {
                console.log('data:',response.wines);
                setCartWines(response.wines);
            }
        )
    }

    function handleDeleteClick(wineId) {
        wineAppService.deleteWineFromCart(wineId,userToken).then(
            (response) => {
                setCartWines(response.data.newCart);
            }
        )
    }
    useEffect(() => {
        if (cartWines && cartWines.length > 0) {
            const priceSum = cartWines.map((wine) => wine.wine.price * wine.quantity);
            const priceTotal = priceSum.reduce((accum, price) => accum + price, 0);
            setTotal(priceTotal);
        }   
    }, [cartWines]);

    // Carga inicial de los vinos en el carrito
    useEffect(() => {
        getWinesList();
    }, [orderDone]);
    

    function handleBackToStoreClick() {
        navigate('/store');
    }


    function handleHomeClick() {
        navigate('/')
    }

    function handleOrderClick() {
        WinesAppService.saveOrder(userToken).then(
            (response) => {
                console.log('response:',response.data.order)
                setOrder(response.data.order);
                console.log("order" + order)
                setOrderDone(true);
                console.log("set order done: " + orderDone)
        })
    }

    function handleContactClick(msg) {
        setContact(true);
        WinesAppService.makeContact(msg, total, userToken).then(
            () => {
               alert('El pedido fue enviado exitosamente \nEl vendedor se contactara con usted.');
               msg = '';

            }
        )
    }

    function generateMessage(wines) {
        msg = wines.map(wine => `${wine.wine_name} - Cantidad: ${wine.quantity}`).join('\n');
        return msg;
    }
    
    // function handleMakeContactClick() {
    //     WinesAppService.makeContact(msg, showTotal,userToken).then(
    //         (response) => {
    //            alert('El pedido fue enviado exitosamente \nEl vendedor se contactara con usted.');
    //            msg = '';

    //         }
    //     )
    // }

    return (
        <div className="container-cart">
        <nav className='navbar'>
                <FontAwesomeIcon icon={faHome} className='home-icon' onClick={handleHomeClick}/>
        </nav> 
        {cartWines.length !== 0 ? (
            <div className="container-cart-page">

                <div className="container-table">
                    <h2 style={{color: 'rgb(172, 8, 190)'}}>Vinos en el carrito</h2>
                    <table className="table-cart">
                    <thead>
                        <tr>
                            <th>
                                vino
                            </th>
                            <th>
                                cantidad
                            </th>
                            <th> 
                            </th>
                            <th>
                                precio
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                            {cartWines.map((wine, index) => (
                                <tr style={{textAlign:'center'}}>
                                    <td key={index}>{wine.wine.name}</td>
                                    <td>{wine.quantity}</td>
                                    <td>
                                        <button className="del-button" onClick={() => handleDeleteClick(wine.wine._id)}>Borrar</button>
                                    </td>
                                    <td>${wine.wine.price}</td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </div>  
                <div className="info-cart-container">
                    <h2>Resumen de compra</h2>
                        <p>
                            Total: $ {total}
                        </p>
                    <button className="continue-buying" onClick={() => handleOrderClick()}>Continuar con la compra</button>
                </div>
            </div>
        ) : (
            <div className="order-container">
            {
                orderDone ? (
                    <div className="order-details-cnt"> 
                        <h2>Orden de compra</h2>
                        <p>Nombre de usuario: {order.userName}</p>
                        <p>Vinos:</p>
                        <ul>
                            {order.wines.map((wine, index) => (
                                <li key={index}>
                                    {wine.wine_name} - Cantidad: {wine.quantity}
                                </li>
                            ))}
                            <li>
                                Total: ${total}
                            </li>
                        </ul>
                        <button className="contact-seller" onClick={() => handleContactClick(generateMessage(order.wines))}>
                            Contactar con el vendedor
                        </button>
                        {contact && 
                            <div>                        
                            <p>El vendedor se contactara contigo. Muchas gracias!</p>
                            <div className="back-buttons">
                                <button className="back-to-store" onClick={handleBackToStoreClick}>
                                Volver al catalogo
                                    </button>
                                <button className="back-to-main" onClick={handleHomeClick}>
                                    Volver al inicio
                                </button>
                            </div>
                            </div>
                        }
                    </div>
                ) : (
                        <div>
                            <h2 style={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                }
                            }>
                            No tienen productos en tu carrito :(
                            </h2>
                            <button onClick={() => handleBackToStoreClick()}
                            style={{
                                    position:'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems:'center',
                                    left:'45%'
                                }}>
                                Volver al catalogo
                            </button>
                            )
                        </div>
                )
                    
            }
            </div>
        )
        }
        </div>
  )
}
  


