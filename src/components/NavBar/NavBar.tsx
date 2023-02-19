import { Link } from 'react-router-dom'
import {HashLink as Hash} from 'react-router-hash-link'

import tocaya from '../../images/tocaya-logo.png'

const NavBar = () => {
    return (
        <nav className="py-8 px-4" >
            <div className="navbar-container flex justify-around">
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
        </nav>
    )
}

export default NavBar