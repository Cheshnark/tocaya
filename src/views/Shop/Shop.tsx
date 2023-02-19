import { useState } from 'react'
import { Link } from 'react-router-dom';

import NavBar from "../../components/NavBar/NavBar"
import ImageDisplayer from '../../components/ImageDisplayer/ImageDisplayer';
import Footer from "../../components/Footer/Footer"


const Shop = () => {
    return (
        <>
        <NavBar />
        <main className="shop">
            <h2 className="text-6xl p-4 text-center">Tienda</h2>
            <ImageDisplayer />
            <figure className="products-container md:grid-cols-3 justify-center gap-2 text-center px-4">
            
            </figure>
            <div className="perretes-content w-10/12 mx-auto flex flex-col justify-around">
                <h3 className='md:hidden mt-4 text-4xl text-center'>Perretes</h3>
                <p className="text-justify">Retratos de perretes. Los mejores perretes, los mejores retratos. Pasen y
                    vean. Vean y compren. Compren y vuelvan. No hay salida. NO hay escapatoria.
                    Perretes! Perretes! 
                    <br /><br />
                    Si quieres un retrato de perrete pincha en siguiente botón
                </p>
                <Link to={"/perretes"} className="w-6/12 my-8 self-center flex justify-center">
                    <button className="py-2 px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">
                        Pide el tuyo!
                    </button>
                </Link>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Shop