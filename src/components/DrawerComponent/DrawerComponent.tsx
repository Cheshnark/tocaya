import {Link} from 'react-router-dom';
import {HashLink as Hash} from 'react-router-hash-link'

const DrawerComponent = () => {

    return (
        <div className="drawer-comp rounded-bl-full bg-slate-400 py-4 h-2/4">
            <div className="menu flex justify-end items-center gap-8 pr-4">
                <div className="drawer-comp-menu-header flex items-center gap-4">
                    <h2 className="title text-2xl">Menú</h2>
                    <i className="fa-solid fa-x" />
                </div>
                <div className="drawer-comp__content">
                    <ul className='flex flex-col gap-4 p-4'>
                        <Link to='/#about-me' className='text-center px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all'>
                            <li>Sobre yo</li>
                        </Link>
                        <Link to='/portfolio' className='text-center px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all'>
                            <li>Trabajos</li>
                        </Link>
                        <Link to='/tienda' className='text-center px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all'>
                            <li>Tienda</li>
                        </Link>
                        <Hash to='#contact' className='text-center px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all'>
                            <li>Contacto</li>
                        </Hash>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DrawerComponent;