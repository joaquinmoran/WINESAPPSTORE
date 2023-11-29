import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import Login from './Components/Login.component';

import './WinesApp.css';

export default function WinesApp(){

    const [showLogin, setShowLogin] = useState(false);


    function handleLoginClick() {
        setShowLogin(!showLogin);
    }

    return (
    
    <div className='container'>
        <nav className='navbar'>
            <div className='top-nav-bar-left'>
                    <Link to='/show_wines' className='show-link'>
                        Nuestros Vinos  
                    </Link>
                    <Link to='/us' className='us-link'>
                        Acerca de nosotros
                    </Link>
            </div>  
            <div className='top-nav-bar-right'>
                <button className='login-link' onClick={handleLoginClick}>Login</button>                 
                <button className='signin-link'>Sign in</button>        
            </div>
        </nav>    
        <div className={`login-area ${showLogin ? 'active' : ''}`}>
            {showLogin && <Login />}
        </div>
        {/* <footer  style={{backgroundColor: 'black'}}>
            Hola
        </footer> */}
    </div>
    )
}

