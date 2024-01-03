import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Login from './Components/Login.component';
import Signin from './Components/Signin.component';
import UsInfo from './Components/UsInfo.component';

import './WinesApp.css';

export default function WinesApp(){
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    function handleLoginClick() {
        setShowLogin(!showLogin);
        if(showSignin) {
            setShowSignin(!showSignin);
        }
        if(showInfo) {
            setShowInfo(!showInfo);
        }
    }

    function handleSigninClick() {
        setShowSignin(!showSignin);
        if(showLogin) {
            setShowLogin(!showLogin);
        }
        if(showInfo) {
            setShowInfo(!showInfo);
        }
    }

    function handleProductClick() {
        navigate('/store');
    }

    function handleUsClick() {
        setShowInfo(!showInfo);
        if(showSignin) {
            setShowSignin(!showSignin);
        }
        if(showLogin) {
            setShowLogin(!showLogin);
        }
    }

    return (
    <div className='container'>
        <nav className='navbar'>
            <div className='top-nav-bar-left'>
                    <Link to='/show_wines' className='show-link'>
                        Nuestros Vinos  
                    </Link>
                    <button className='us-link' onClick={handleUsClick}>
                        Acerca de nosotros
                    </button>
            </div>  
            <div className='top-nav-bar-right'>
                <button className='login-link' onClick={handleLoginClick}>Login</button>                 
                <button className='signin-link' onClick={handleSigninClick}>Sign in</button>        
            </div>
        </nav>   
            <div className={`login-area ${showLogin ? 'active' : ''}`}>
                {showLogin && <Login />}
            </div>
            <div className={`signin-area ${showSignin ? 'active' : ''}`}>
                {showSignin && <Signin />}
            </div>

            <div className='ow-bttn-container'>
                <button className='ow-buttn' onClick={handleProductClick}>
                    Nuestros Productos
                </button>
            </div>
            <div className={`info-area ${showInfo ? 'active' : ''}`} >
                {showInfo && <UsInfo />}
            </div>

        {/* <footer  style={{backgroundColor: 'black'}}>
            Hola
        </footer> */}
    </div>
    )
}

