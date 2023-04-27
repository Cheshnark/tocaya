import { Link } from 'react-router-dom'
import {HashLink as Hash} from 'react-router-hash-link'
import { useState } from 'react';

import tocaya from '../../images/tocaya-logo.webp'
import DrawerComponent from '../DrawerComponent/DrawerComponent';


const NavBar = () => {
    const [shown, setShown] = useState(false)

    const handleClick = () => {
        setShown(!shown);  
      };

    return (
        <nav className="pb-8 pt-2 px-4">
            <div className="navbar-container sm:flex justify-evenly lg:justify-center invisible sm:visible hidden">
                <ul className="navbar-content-2 flex gap-4">
                    <li className='mx-2 self-center hover:cursor-pointer hover:text-red-700 hover:scale-105 transition-all text-xl'><Link to='/sobre-mi' >Sobre mí</Link></li>
                    <li className='mx-2 self-center hover:cursor-pointer hover:text-red-700 hover:scale-105 transition-all text-xl'><Link to='/portfolio' >Trabajos</Link></li>                   
                </ul>
                <figure className="navbar-logo w-4/12 2xl:max-w-lg">
                    <Link to='/'>
                        <img src={tocaya} alt="Tocaya Vázquez logo" className='mx-auto max-h-40 hover:scale-105 transition-all'/>
                    </Link>
                </figure>
                <ul className="navbar-content-2 flex gap-4">
                    <li className='mx-2 self-center hover:cursor-pointer hover:text-red-700 hover:scale-105 transition-all text-xl'><Link to='/tienda' >Tienda</Link></li>
                    <li className='mx-2 self-center hover:cursor-pointer hover:text-red-700 hover:scale-105 transition-all text-xl'><Hash smooth to='#contact' >Contacto</Hash></li>  
                </ul>
            </div>
            <div className="navbar-container-mobile sm:hidden flex gap-4 items-center justify-between px-4">
                <figure className="navbar-logo w-5/12">
                    <Link to='/'>
                        <img src={tocaya} alt="Tocaya Vázquez logo" className='mx-auto'/>
                    </Link>
                </figure>
                <i className="mobile-navigation fa-solid fa-bars sm:invisible" onClick={handleClick} />  
            </div>
            {shown && (
            <div onClick={handleClick}>
              <div className="div-drawercomp h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/80">
                <DrawerComponent />
              </div>
            </div>
          )}
        </nav>
    )
}

export default NavBar