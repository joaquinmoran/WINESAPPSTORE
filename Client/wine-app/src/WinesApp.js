import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import WinesAppService from './Services/wineApp.service';
import './WinesApp.css';

export default function WinesApp(){

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");

    function  handleChangeUser(event) {
        setName(event.target.value);
        console.log(name);
    }

    function handleChangeUserPassword(event) {
        setPassword(event.target.value);
        console.log(password);
    }

    function handleLogClick() {
        WinesAppService.login(name, password).then(
            () => {
                  navigate('/store');
            },
        )
    }



        return (
        
        <div className='container'>
            <nav className='our-wines'>
                <Link to='/show_wines'>
                    Nuestros Vinos
                </Link>
            </nav>
            <div className='container-right'>
                <div className='login-cnt'>
                    <div className='user-input'>
                        <form style={{textAlign: 'center'}}>
                            <label className='user-label'>
                            NOMBRE DE USUARIO
                            <br />
                            <br />
                                <input 
                                    type='text'
                                    id='user_name'
                                    placeholder='Usuario'
                                    name='user'
                                    onChange={handleChangeUser.bind(this)}
                                />
                            </label>
                        </form>
                    </div>
                    <div className='pw-input'> 
                        <form style={{textAlign: 'center'}}>
                            <label className='pw-label'>
                            CONTRASEÑA
                            <br />
                            <br />
                                <input
                                    type='password'
                                    id='password'
                                    placeholder='Contraseña'
                                    name='passw'
                                    onChange={handleChangeUserPassword.bind(this)}
                                />
                            </label>
                        </form>
                    </div>
                
                    <div style={{textAlign:'center'}}>
                        <div className='div-butt-in'>
                            <button type='button' className='button-in' onClick={handleLogClick}> 
                                    Entrar 
                            </button>
                        </div>
                        <hr />
                        <div className='div-butt-create'>
                            <label className='registred-label'>
                                No tienes una cuenta?
                                <Link to='/create_account' style={{color: 'white'}} > Registrarse </Link>
                                
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

