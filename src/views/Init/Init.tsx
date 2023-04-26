import { Link } from "react-router-dom"

import tocaya from '../../images/tocaya-logo.png'
import sobreMi from '../../images/sobre-mi.png'
import gallery from '../../images/galeria.png'

const Init = () => {
    return (
        <header className="front h-screen w-screen min-h-full flex flex-col justify-evenly text-center bg-white fixed sm:grid md:grid-rows-3 lg:grid-rows-2 sm:justify-center">
            <div className='md:self-center hover:scale-105 transition-all sm:row-start-3 lg:row-start-2 lg:self-start xl:mt-16' >
                <Link to={"/portfolio"}>
                <img src={gallery} alt="Botón galería" className='w-7/12 max-w-lg mx-auto'/>
                </Link>
            </div>
            <h1 className="text-8xl hidden">Tocaya Vazquez - Ilustración</h1>
            <img src={tocaya} alt="Tocaya Vazquez - Ilustración" className='w-10/12 md:w-6/12 max-w-3xl lg:mt-0 mx-auto sm:row-start-1 sm:col-span-2 sm:row-span-2 lg:row-span-1 md:first-letter:row-span-2 self-center md:self-end'/>
            <div className='md:self-center hover:scale-105 transition-all sm:row-start-3 lg:row-start-2 lg:self-start xl:mt-16'>
                <Link to={"/sobre-mi"}>
                    <img src={sobreMi} alt="Botón sobre mi" className='w-7/12 max-w-lg mx-auto'/>
                </Link>
            </div>
        </header>
    )
}

export default Init