import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import WinesAppService from '../Services/wineApp.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCheck, faEnvelope, faEye, faEyeSlash, faMailBulk, faMailForward, faRightToBracket, faUser, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import './Signin.css';

export default function Login() {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ mail, setMail ] = useState("");
    const [ age, setAge ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    function  handleChangeUser(event) {
        setName(event.target.value);
    }

    function handleChangeUserPassword(event) {
        setPassword(event.target.value);
    }

    function handleChangeMail(event) {
        setMail(event.target.value);
    }

    function handleChangeAge(event) {
        setAge(event.target.value);
    }

    function handleLogSubmit() {
        if (!name || !mail || !age || !password) {
            if(!name){alert('El campo de nombre de usuario no puede ser vacio')}
            if(!mail){alert('El campo de mail no puede ser vacio')}
            if(!age){alert('El campo de edad no puede ser vacio')}
            if(!password){alert('El campo de contraseña no puede ser vacio')}
            if(age < 18){alert('Tiene que ser mayor de edad para registrate')} 
            return;
        }

        WinesAppService.signin(name, mail, age, password).then(
            (response) => {
                if (response.status === 201){
                  navigate('/store');
                  console.log("creado");
                } else {
                    if(response.status === 400){
                        alert('Usuario ya registrado');
                    }
                }
            })
            .catch((error) => {
                alert('Ocurrio un error tratando de registrar usuario, intenta de nuevo en unos minutos');
            })
        
    }


    function handelVisibilityCllick() {
        setShowPassword(!showPassword);
    }

    return (
        <div className='create-container'>
            <div className='cr-con'>
                <form  className= 'create-form' onSubmit={handleLogSubmit} style={{textAlign: 'center'}}>
                    <div className='user-input'>
                            <label className='user-label'>
                            Nombre de usuario
                                <input
                                    className='create-inputs'
                                    type='text'
                                    id='user_name'
                                    placeholder='Usuario'
                                    name='user'
                                    onChange={handleChangeUser.bind(this)}
                                    required
                                />
                                <FontAwesomeIcon icon={faUser} className='user-icon'/>
                            </label>
                    </div>
                    <div className='mail-input'>
                            <label className='mail-label'>
                            Mail  <br />
                                <input
                                    className='create-inputs'
                                    type='email'
                                    id='mail'
                                    placeholder='example@gmail.com'
                                    name='mail'
                                    onChange={handleChangeMail.bind(this)}
                                    required
                                />
                                <FontAwesomeIcon icon={faEnvelope} className='mail-icon'/>
                            </label>
                    </div>
                    <div className='age-input'>
                            <label className='age-label'>
                            Edad <br />
                                <input
                                    className='create-inputs'
                                    type='text'
                                    id='age'
                                    placeholder='Edad'
                                    name='edad'
                                    onChange={handleChangeAge.bind(this)}
                                    required
                                />
                                <FontAwesomeIcon  icon={faCalendarDays} className='age-icon' />
                            </label>
                    </div>
                    <div className='pw-input'> 
                            <label className='pw-label'>
                            Contraseña
                                <input 
                                    className='create-inputs'
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Contraseña'
                                    name='passw'
                                    onChange={handleChangeUserPassword.bind(this)}
                                    required
                                />
                                <FontAwesomeIcon 
                                    icon={showPassword ? faEyeSlash : faEye} 
                                    className='pw-icon'
                                    onClick={handelVisibilityCllick}
                                    />
                            </label>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <div className='div-butt-create'>
                            <button type='button' className='button-create' onClick={handleLogSubmit}> 
                                    <FontAwesomeIcon icon={faRightToBracket } className='create-icon'/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}