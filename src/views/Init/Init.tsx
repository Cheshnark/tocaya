import './Init.css'
import { Link } from "react-router-dom"

import tocaya from '../../images/tocaya-logo.webp'
import sobreMi from '../../images/sobre-mi.webp'
import gallery from '../../images/galeria.webp'

const Init = () => {
    return (
        <header className="front w-screen min-h-full flex flex-col justify-evenly text-center bg-white fixed sm:grid sm:grid-rows-3 md:grid-rows-2 sm:justify-center">
            <div className='image-link md:self-center hover:scale-105 transition-all sm:row-start-3 md:row-start-2 lg:self-start md:mt-16' >
                <Link to={"/portfolio"}>
                <img src={gallery} alt="Botón galería" className='w-7/12 max-w-lg mx-auto'/>
                </Link>
            </div>
            <h1 className="text-8xl hidden">Tocaya Vazquez - Ilustración</h1>
            <img src={tocaya} alt="Tocaya Vazquez - Ilustración" className='w-10/12 md:w-6/12 max-w-3xl lg:mt-0 mx-auto sm:row-start-1 sm:col-span-2 sm:row-span-2 md:row-span-1 md:first-letter:row-span-2 self-center md:self-end'/>
            <div className='image-link md:self-center hover:scale-105 transition-all sm:row-start-3 md:row-start-2 lg:self-start md:mt-16'>
                <Link to={"/sobre-mi"}>
                    <img src={sobreMi} alt="Botón sobre mi" className='w-7/12 max-w-lg mx-auto'/>
                </Link>
            </div>
        </header>
    )
}

export default Init