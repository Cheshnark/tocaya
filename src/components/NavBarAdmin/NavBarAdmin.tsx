import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from '../../hooks/useAuthContext';

const NavBarAdmin = () => {
    const { logout } = useLogout()
    const { admin } = useAuthContext()

    console.log(admin);
    

    const logoutClick = () => {
        logout()
    }

    return (
        <nav className="py-4 px-4" >
            <div className="navbar-container flex justify-end">
                <div className="navbar-content-2 flex flex-col">
                    <div className="navbar-admin__email flex gap-4">
                        <i className="fa-solid fa-user" />
                        <span>{admin.email}</span>
                    </div>
                    <button 
                        className='navbar-logout w-8/12 self-end bg-zinc-200 min-w-min p-2 rounded-md' 
                        onClick={logoutClick}>
                            Log out
                    </button>                   
                </div>
            </div>
        </nav>
    )
}

export default NavBarAdmin