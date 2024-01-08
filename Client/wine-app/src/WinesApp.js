import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Login from './Components/Login.component';
import Signin from './Components/Signin.component';
import UsInfo from './Components/UsInfo.component';
import ListBar from './Components/ListBar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WinesApp.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default function WinesApp(){
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignin, setShowSignin] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showList, setShowList] = useState(false);

    function handleLoginClick() {
        setShowLogin(!showLogin);
        if(showSignin) {
            setShowSignin(!showSignin);
        }
        if(showList) {
            setShowList(!showList);
        }
      
    }

    function handleSigninClick() {
        setShowSignin(!showSignin);
        if(showLogin) {
            setShowLogin(!showLogin);
        }
        if(showList) {
            setShowList(!showList);
        }
    }

    function handleProductClick() {
        navigate('/store');
    }

    function handleUsClick() {
        setShowInfo(!showInfo);
    }

    function handelDisplayList() {
        setShowList(!showList)
        if(showLogin) {
            setShowLogin(!showLogin);
        }
        if(showSignin) {
            setShowSignin(!showSignin);
        }
    }
    

    return (
    <div className='container'>
        <nav className='navbar'>
            <FontAwesomeIcon icon={faBars} className='bars-icon' onClick={handelDisplayList}/>
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
            <div className={`list-area ${showList ? 'active' : ''}`} >
                {showList && <ListBar />}
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

