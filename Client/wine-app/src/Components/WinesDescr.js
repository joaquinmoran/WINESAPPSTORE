import React, { useState, useEffect } from "react";
import { Link, useNavigate,  useLocation  } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import Footer from "./Footer";
import "../styles/WinesDescr.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faHome } from "@fortawesome/free-solid-svg-icons";

export default function WinesDescr() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const [wine, setWine] = useState([])
    const [quantity, setQuantity] = useState(0)

    const userToken = localStorage.getItem('token');
    
    function getWine() {
        WinesAppService.getWineById(data.wineId).then(
            (response) => {
                setWine(response.data.wine_data)
            }
        )
        .catch((error) => {
            console.log('error while getting wines.', error);
        })
    }

    function handleCartClick() {
        navigate('/cart');
    }   

    function handelBackClick() {
        navigate('/')
    }

    function handleListClik() {
        console.log('El token', userToken);
        console.log('winde id:', wine._id);
        WinesAppService.addWineToCart(wine._id, quantity , userToken)
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            console.error('Error adding wine to cart:', error);
            alert('Para agregar vinos al carrito ingrese o cree una cuenta');
        })
    }

    function  handleChangeQuantity(event) {
        setQuantity(event.target.value);
        console.log(quantity)
    }

    useEffect(() => {
        getWine();
    }, [])


    return(
        <div className="main-cnt">
         <nav className='navbar'>
                <FontAwesomeIcon icon={faHome} className='home-icon' onClick={handelBackClick}/>
                <FontAwesomeIcon icon={faCartShopping}  className="cart-logo" onClick={() => handleCartClick()} />
            </nav> 
            <div className="wine-descr-cnt">
                <div  className="wine-img" style={{ backgroundImage: wine.img ? `url(${wine.img})` : 'none' }}>
                </div>

                <div className="main-descr">
                    <p className="descr-p1">{wine.name}</p>
                    <p className="descr-p2">${wine.price}</p>
                    <p className="ship">Envio gratis en Rio Cuarto con compra mayor a $5000</p>
                    <form className="cant-form">
                        <label for="quantity">Cantidad: </label>
                            <input type="number" 
                            id="quantity" 
                            name="quantity" 
                            min="1" 
                            max="1000"
                            onChange={handleChangeQuantity.bind(this)}
                            />
                            ({wine.stock} disponibles)
                    </form>
                    <div className="btn-container">
                        <button className="add-to-cart-btn" onClick={() =>handleListClik()}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
                <div className="wine-charact">
                    <p className="p-descr"> Descripcion </p>
                    <p className="p"> Origen: {wine.origin}</p>
                    <p className="p"> Color: {wine.color}</p>
                    <p className="p"> Aroma: {wine.scent}</p>
                    <p className="p"> En boca: {wine.mouth}</p>
                    <p className="p"> Maridaje: {wine.extra}</p>
                </div>  

            </div>
            <footer className="descr-footer">
                <Footer />
            </footer>
        </div>
    )

}