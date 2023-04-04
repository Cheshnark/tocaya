import {Link} from 'react-router-dom';
import {HashLink as Hash} from 'react-router-hash-link'

const DrawerComponent = () => {

    return (
        <div className="drawer-comp rounded-bl-full bg-white py-6 pl-16 h-2/4 absolute top-0 right-0 transition-transform">
            <div className="menu flex flex-col justify-end items-center gap-4 pr-4">
                <div className="drawer-comp-menu-header flex items-center gap-4">
                    <h2 className="title text-3xl">Menú</h2>
                    <i className="fa-solid fa-x" />
                </div>
                <div className="drawer-comp__content">
                    <ul className='flex flex-col gap-2 p-4 '>
                        <Link to='/#about-me' className='text-right px-4 py-2 text-green-400'>
                            <li>Sobre yo</li>
                        </Link>
                        <Link to='/portfolio' className='text-right px-4 py-2 text-green-400'>
                            <li>Trabajos</li>
                        </Link>
                        <Link to='/tienda' className='text-right px-4 py-2 text-green-400'>
                            <li>Tienda</li>
                        </Link>
                        <Hash to='#contact' className='text-right px-4 py-2 text-green-400'>
                            <li>Contacto</li>
                        </Hash>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DrawerComponent;