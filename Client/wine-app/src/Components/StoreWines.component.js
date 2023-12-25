import React, { useState, useEffect } from "react";
import { Link, useNavigate,  useLocation  } from "react-router-dom";
import WinesAppService from '../Services/wineApp.service';
import './StoreWines.css'; 

export default function StoreWines() {

    const navigate = useNavigate();
    const location = useLocation();
    const userToken = location.state?.authToken || '';
    const [ wines, setWines ]  = useState([]);
    const [ image, setImage ] = useState(null);
    const [ listWines, setListWines ] = useState([]);

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
        console.log(wineId);
        WinesAppService.addWineToCart(wineId, userToken).then(
            (response) => {
                console.log('added.', wineId)
            })
            .catch((error) => {
                alert('No se pudo agregar el vino, intente nuevamente en unos minutos')
            })
    }

    function handleCartClick() {
        navigate('/cart', {state: {userToken}});
    }

    // function handleDeleteItemClick(index) {
    //     setListWines(prevList => prevList.filter((_,i) => i !== index));
    // }


    useEffect(() => {
        getAllWines();
    }, [])


    return (
        <div className="store-container">
        <nav className='navbar'>
            <div className='top-nav-bar-left'>
                    <Link to='/show_wines' className='show-link'>
                        Nuestros Vinos  
                    </Link>
                    <Link to='/us' className='us-link'>
                        Acerca de nosotros
                    </Link>
            </div>  
            <button className="cart-button" onClick={() => handleCartClick()}>
                    <img className="cart-logo" src={'http://localhost:3000/images/cartLogo.png'} /> 
            </button>
        </nav> 
                {
                    wines && wines.length > 0 ? (
                        wines.map((wine) => {
                            return ( 
                                <div className="cat-container">
                                    <div className="wines-cat" key={wine.id}>
                                        <div className="wine-image" style={{backgroundImage: `url(${wine.img})`}}
                                                onClick={() => handleImageClick(wine.img)}>
                                        </div>
                                        <div className="info-wine">
                                            <h1>Mi Terruño</h1>
                                            <h3 className="category">{wine.category}</h3>
                                            <h3 className="grape-type">{wine.grapeType}</h3>
                                            <p className="description">{wine.description}</p>
                                            <h4>${wine.price}</h4>
                                            <abbr title="Contactar con el vendedor">
                                                <button className= "m-i-butt" type="submit" onClick={() => handleListClik(wine._id)}> Agregar a la lista</button>
                                            </abbr>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        }) 
                    ) : (
                        <li>No hay vinos disponibles</li>
                    )
                }
                {
                    image && (
                    <div className="image-zoom-cont" onClick={handleCloseImage}>
                        <div className="image-zoom">
                            <img src={image} onClick={console.log()}/>
                        </div>
                    </div>
                )}
                
        </div>
    )
}