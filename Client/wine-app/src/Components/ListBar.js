import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import AboutWinary from './AboutWinary'
import AboutDistr from './AboutDistr'
import '../styles/ListBar.css'



export default function ListBar() {

    const [showAWInfo, setShowAWInfo] = useState(false);
    const [showADInfo, setShowADInfo] = useState(false);

    function handleIgClick() {
        window.open('https://www.instagram.com/miterrunoriocuarto/');
    }

    function handleAWClick() {
        setShowAWInfo(!showAWInfo)

        if(showADInfo) {
            setShowADInfo(!showADInfo)
        }
    } 

    function handelADClick() {
        setShowADInfo(!showADInfo)

        if(showAWInfo) {
            setShowAWInfo(!showAWInfo);
        }
    }

    return (
        <div className='listbar-container'>
            <p onClick={handleAWClick}>
                Acerca de la Bodega
            </p>
            <p onClick={handelADClick}>
                Acerca del distribuidor
            </p>
            <div className={`about-winary-area ${showAWInfo ? 'active' : ''} `}>
                {showAWInfo && <AboutWinary />}
            </div>
            <div className={`about-distr-area ${showADInfo ? 'active' : ''}`}>
                {showADInfo && <AboutDistr />}
            </div>
            <span>
                <hr/>
            </span>
            <div className='icons'>
                <div className='icon-div'>
                    <FontAwesomeIcon icon={faInstagram} className='icon-ig' onClick={handleIgClick}/>  
                    <a>miterrunorioiv</a>
                </div>
                <div className='icon-div'>
                    <FontAwesomeIcon icon={faWhatsapp} className='icon'/>
                    <a>+54 3584300359</a>
                </div>
                <div className='icon-div'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon'/>
                    <a>moraneses@gmail.com</a>
                </div>
                <div className='icon-div' >
                    <FontAwesomeIcon icon={faLocationDot} className='icon'/>
                    <a>Rio cuarto, Cordoba, Argentina</a>
                </div>
            </div>
        </div>
    )
}
