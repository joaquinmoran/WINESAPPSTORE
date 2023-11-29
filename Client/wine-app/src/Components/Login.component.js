import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import WinesAppService from '../Services/wineApp.service';
import './Login.css';

export default function Login() {

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
        <div className='login-container'>
            <div className='lg-con'>
                    <div className='user-input'>
                        <form style={{textAlign: 'center'}}>
                            <label className='user-label'>
                            Nombre de usuario o mail
                            <br />
                            <br />
                                <input
                                    className='log-inputs'
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
                            Contraseña
                            <br />
                            <br />
                                <input 
                                    className='log-inputs'
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
                        
                    </div>
                </div>
                <hr />
                    <div className='div-butt-create'>
                            <label className='registred-label'>
                                No tienes una cuenta?
                                <Link to='/create_account' style={{color: 'white'}} > Registrarse </Link>
                                
                            </label>
                    </div>
            </div>

    )
}