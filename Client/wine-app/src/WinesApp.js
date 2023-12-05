import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import Login from './Components/Login.component';
import Signin from './Components/Signin.component';

import './WinesApp.css';

export default function WinesApp(){

    const [showLogin, setShowLogin] = useState(false);
    const [showSignin, setShowSignin] = useState(false);

    function handleLoginClick() {
        setShowLogin(!showLogin);
        if(showSignin){
            setShowSignin(!showSignin);
        }
    }

    function handleSigninClick() {
        setShowSignin(!showSignin);
        if(showLogin){
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
                    <Link to='/us' className='us-link'>
                        Acerca de nosotros
                    </Link>
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

        {/* <footer  style={{backgroundColor: 'black'}}>
            Hola
        </footer> */}
    </div>
    )
}

