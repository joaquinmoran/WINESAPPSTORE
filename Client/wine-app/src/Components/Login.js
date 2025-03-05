import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faEyeSlash, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import WinesAppService from '../Services/wineApp.service';
import '../styles/Login.css';

export default function Login() {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    
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
                console.log(response.status)
                if(response.status === 200){
                    const authToken = response.data.data.token;
                    localStorage.setItem('token', authToken);
                    navigate('/store', { state: {authToken} });
                }else if(response.status === 401 || response.status === 400 ) {
                    alert("Nombre de usuario o contraseña incorrectos");
                } else {
                    alert("Error inesperado, intentelo mas tarde");
                }
            }).catch ((error) => {
                console.error('Error inesperado:', error);
                alert('Ocurrió un error inesperado, por favor intente más tarde');
            })
    }

    const handleEnterPress = (event) => {
        if(event.key === 'Enter') {
            handleLogSubmit();
        }
    }

    function handelVisibilityCllick() {
        setShowPassword(!showPassword);
    }

    return (
        
        <div className='login-container'>
            <div className='lg-con'>
                        <form style={{textAlign: 'center'}}>
                        <div>
                            <label className='user-label'>
                                Nombre de usuario o mail
                                <input
                                    className='log-inputs'
                                    type='text'
                                    id='user_name'
                                    placeholder='Usuario'
                                    autoComplete='no'
                                    onChange={handleChangeUser.bind(this)}
                                    onKeyDown={handleEnterPress}
                                    required
                                />
                                <FontAwesomeIcon icon={faUser} className='icon'/>
                            </label>
                        </div>
                        <div>
                            <label className='pw-label'>
                            Contraseña
                            <br />
                            <br />
                                <input 
                                    className='log-inputs'
                                    type= {showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Contraseña'
                                    onChange={handleChangeUserPassword.bind(this)}
                                    onKeyDown={handleEnterPress}
                                    required
                                />
                                 <FontAwesomeIcon 
                                    icon={showPassword ? faEyeSlash : faEye} 
                                    className='icon'
                                    onClick={handelVisibilityCllick}
                                    />
                            </label>
                        </div>
                        <button type='button' className='button-in' onClick={handleLogSubmit}> 
                             <FontAwesomeIcon icon={faCheck}  className='butt-icon'/>
                        </button>
                  
                        </form>
                </div>
                <hr />
                    {/* <div className='div-butt-create'>
                            <label className='registred-label'>
                                No tienes una cuenta?
                                <Link to='/create_account' style={{color: 'white'}} > Registrarse </Link>
                                
                            </label>
                    </div> */}
            </div>

    )
}