import { Link } from 'react-router-dom'
import {HashLink as Hash} from 'react-router-hash-link'
import { useState } from 'react';

import tocaya from '../../images/tocaya-logo.png'
import DrawerComponent from '../DrawerComponent/DrawerComponent';


const NavBar = () => {
    const [shown, setShown] = useState(false)

    const handleClick = () => {
        setShown(!shown);  
      };

    return (
        <nav className="py-8 px-4">
            <div className="navbar-container sm:flex justify-around invisible sm:visible hidden">
                <ul className="navbar-content-2 flex gap-4">
                    <Hash to='/#about-me' className='self-center'><li className='mx-2'>Sobre yo</li></Hash>
                    <Link to='/portfolio' className='self-center'><li className='mx-2'>Trabajos</li></Link>                   
                </ul>
                <figure className="navbar-logo w-4/12">
                    <img src={tocaya} alt="tocaya-log" className='mx-auto'/>
                </figure>
                <ul className="navbar-content-2 flex gap-4">
                    <Link to='/tienda' className='self-center'><li className='mx-2'>Tienda</li></Link>
                    <Hash to='#contact' className='self-center'><li className='mx-2'>Contacto</li></Hash>   
                </ul>
            </div>
            <div className="navbar-container-mobile sm:invisible flex gap-4 items-center justify-between px-4">
                <figure className="navbar-logo w-5/12">
                    <img src={tocaya} alt="tocaya-log" className='mx-auto'/>
                </figure>
                <i className="mobile-navigation fa-solid fa-bars" onClick={handleClick} style={{visibility: shown && 'hidden'}} />  
            </div>
            {shown && (
            <div onClick={handleClick}>
              <div className="div-drawercomp h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/80">
                <DrawerComponent shown={shown}/>
              </div>
            </div>
          )}
        </nav>
    )
}

export default NavBar