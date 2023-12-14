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

    function handleLogSubmit() {
        if(!name || !password) {
            if(!name) {
                alert("El campo de nombre de usuario no puede ser vacio");
            }
            if(!password) {
                alert("El campo de contraseña no puede ser vacio")
            }
            return;
        }

        WinesAppService.login(name, password).then(
            (response) => {
                console.log(response.status);
                if (response.status === 200) {    
                    localStorage.setItem('token', response.data.data.token)
                    navigate('/store');
                }
                if(response.status === 400) {
                    alert("Nombre de usuario o contraña incorrectos");
                }
            })
            .catch((error) => {
                alert('Usuario no registrado, cree una cuenta');
            })
        
    }

    return (
        <div className='login-container'>
            <div className='lg-con'>
                    <div className='user-input'>
                        <form style={{textAlign: 'center'}}>
                        <div>
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
                                    required
                                />
                            </label>
                        </div>
                        <div>
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
                                    required
                                />
                            </label>
                        </div>
                            <div className='div-butt-in'>
                                <button type='button' className='button-in' onClick={handleLogSubmit}> 
                                        Entrar 
                                </button>
                            </div>
                        </form>
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