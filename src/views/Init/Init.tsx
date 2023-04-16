import { Link } from "react-router-dom"

import tocaya from '../../images/tocaya-logo.png'
import sobreMi from '../../images/sobre-mi.png'

const Init = () => {
    return (
        <section className="front h-screen w-screen min-h-full flex flex-col justify-around text-center bg-white fixed md:grid md:grid-cols-2 md:justify-center">
                <div className='md:self-center hover:scale-105 transition-all' >
                    <Link to={"/portfolio"}>
                        <button>Dibujos</button>
                    </Link>
                </div>
                <h1 className="text-8xl hidden">Tocaya Vazquez</h1>
                <img src={tocaya} alt="Tocaya Vazquez logo" className='w-10/12 md:w-6/12 mx-auto md:row-start-1 md:col-span-2 md:self-end'/>
                <div className='md:self-center hover:scale-105 transition-all'>
                    <Link to={"/sobre-mi"}>
                        <button>
                            <img src={sobreMi} alt="Botón sobre mi" className='w-7/12 mx-auto'/>
                        </button>
                    </Link>
                </div>
            </section>
    )
}

export default Init