import React, { useState, useEffect } from "react";
import { Link, useNavigate,  useLocation  } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import '../styles/StoreWines.css'; 

export default function StoreWines() {

    const navigate = useNavigate();
    // const location = useLocation();
    // const userToken = location.state?.authToken || '';
    const [ wines, setWines ]  = useState([]);
    const [ image, setImage ] = useState(null);
    const [showList, setShowList] = useState(false);
    const userToken = localStorage.getItem('token');

    function getAllWines() {
        WinesAppService.getWinesList(userToken).then(
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

    function handleImageClick(imageUrl) {
        setImage(imageUrl);
    }

    function handleCloseImage() {
        setImage(null);
    }

    function handleListClik(wineId) {
        console.log('El token', userToken);
        console.log('winde id:', wineId);
        WinesAppService.addWineToCart(wineId, userToken)
        .catch((error) => {
            console.error('Error adding wine to cart:', error);
            alert('Para agregar vinos al carrito ingrese o cree una cuenta');
        })
    }

    function handleCartClick() {
        navigate('/cart');
    }   

    function handelBackClick() {
        navigate('/')
    }

    function handelDisplayList() {
        setShowList(!showList)
    }

    function handleProductClick(wineId) {
        navigate('/store/description',
            {
                state: {
                    wineId
                }
            }
        )
    } 

    useEffect(() => {
        getAllWines();
    }, [])


    return (
        <div className="store-container">
            <nav className='navbar'>
                <FontAwesomeIcon icon={faHome} className='home-icon' onClick={handelBackClick}/>
                <FontAwesomeIcon icon={faCartShopping}  className="cart-logo" onClick={() => handleCartClick()} />
            </nav> 
            <div className="cat-container">
                {
                    wines && wines.length > 0 ? (
                        wines.map((wine) => {
                            return ( 
                                    <div className="wines-cat" key={wine._id}>
                                        <div className="wine-image" style={{backgroundImage: `url(${wine.img})`}}
                                                onClick={() => handleImageClick(wine.img)}>
                                        </div>
                                        <div className="btn-info-cnt" onClick={() => handleProductClick(wine._id)}>                                          
                                            <p className="str-p" style={{fontSize: "3.5vh"}}>
                                                {wine.name}                      
                                            </p>
                                            <p className="w-price"> 
                                                $ {wine.price}
                                            </p>
                                            <p className="env">Envios gratis en la ciudad de Rio</p>                                     
                                        </div>
                                    </div>                                
                            )
                        }) 
                    ) : (
                        <li>No hay vinos disponibles</li>
                    )
                }
            </div>
            <footer>   
                <Footer/>
            </footer>  
        </div>
    )
}