import { Link } from 'react-router-dom'
import {HashLink as Hash} from 'react-router-hash-link'

import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

import onion from '../../images/profile-onion.jpg'
import kofiLogo from '../../images/kofilogo.png'

const Main = () => {
    return (
        <>
        <div className="desktop-navbar hidden md:block">
            <NavBar />
        </div>
        <main className="main">
            <section className="front h-screen min-h-full flex flex-col justify-around text-center">
                <div>
                    <Link to={"/portfolio"}>
                        <button>Dibujos</button>
                    </Link>
                </div>
                <h1 className="text-8xl">Tocaya</h1>
                <div>
                    <Hash smooth to={"/#about-me"}>
                        <button>Info sobre yo</button>
                    </Hash>
                </div>
            </section>
            <div className="mobile-navbar block md:hidden">
                <NavBar />
            </div>
            <section className="about-me h-screen min-h-full" id='about-me'>
                <div className="about-me__flex flex flex-col justify-center">
                    <h2 className="text-6xl p-4 text-center">Sobre mí</h2>
                    <div className="about-me-container flex flex-col justify-center align-middle">
                        <figure className='w-8/12 mx-auto'> 
                            <img src={onion} alt="" className='rounded-full mx-auto'/>
                        </figure>
                        <div className="about-me-content w-10/12 mt-4 mx-auto flex flex-col">
                            <h3 className='text-4xl text-center'>Que te pinto, niño!</h3>
                            <p className='mt-4 text-justify'>Pintar, pintar, pintar, pintar,pintar, pintar, pintar, pintar,
                                pintar, pintar, pintar,pintar, pintar, pintar, pintar, pintar,
                                pintar, pintar, pintar,pintar, pintar, pintar, pintar, pintar,
                                pintar, pintar, pintar,pintar, pintar, pintar, pintar, pintar.
                                Y pintar.
                            </p>
                            <a href="https://ko-fi.com/"><img src={kofiLogo} alt="ko-fi-logo" className='w-12 mx-auto'/></a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Main;