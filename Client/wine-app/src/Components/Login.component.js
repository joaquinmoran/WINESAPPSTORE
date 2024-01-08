import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faEyeSlash, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import WinesAppService from '../Services/wineApp.service';
import './Login.css';

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
                try {
                    console.log(response);
                    if(response.status === 200){
                        const authToken = response.data.data.token;
                        console.log('token',authToken);
                        navigate('/store', { state: {authToken} });
                    }
                    if(response.status === 400) {
                        alert("Nombre de usuario o contraña incorrectos");
                    }
                } catch(eror) {
                    alert('Usuario no registrado, cree una cuenta');
                }
            })
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