import React , { Component, useState   } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import WinesAppService from '../Services/wineApp.service';
import './Signin.css';

export default function Login() {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ mail, setMail ] = useState("");
    const [ age, setAge ] = useState("");

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

    return (
        <div className='create-container'>
            <div className='cr-con'>
                <form onSubmit={handleLogSubmit} style={{textAlign: 'center'}}>
                    <div className='user-input'>
                            <label className='user-label'>
                            Nombre de usuario
                            <br />
                            <br />
                                <input
                                    className='create-inputs'
                                    type='text'
                                    id='user_name'
                                    placeholder='Usuario'
                                    name='user'
                                    onChange={handleChangeUser.bind(this)}
                                    required
                                />
                            </label>
                    </div>
                    <div className='mail-input'>
                            <label className='mail-label'>
                            Mail
                            <br />
                            <br />
                                <input
                                    className='create-inputs'
                                    type='email'
                                    id='mail'
                                    placeholder='example@gmail.com'
                                    name='mail'
                                    onChange={handleChangeMail.bind(this)}
                                    required
                                />
                            </label>
                    </div>
                    <div className='age-input'>
                            <label className='age-label'>
                            Edad
                            <br />
                            <br />
                                <input
                                    className='create-inputs'
                                    type='text'
                                    id='age'
                                    placeholder='Edad'
                                    name='edad'
                                    onChange={handleChangeAge.bind(this)}
                                    required
                                />
                            </label>
                    </div>
                    <div className='pw-input'> 
                            <label className='pw-label'>
                            Contraseña
                            <br />
                            <br />
                                <input 
                                    className='create-inputs'
                                    type='password'
                                    id='password'
                                    placeholder='Contraseña'
                                    name='passw'
                                    onChange={handleChangeUserPassword.bind(this)}
                                    required
                                />
                            </label>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <div className='div-butt-create'>
                            <button type='button' className='button-create' onClick={handleLogSubmit}> 
                                    Crear cuenta 
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        <hr />
        </div>

    )
}