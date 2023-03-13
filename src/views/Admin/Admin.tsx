import ProfileAdmin from '../../components/ProfileAdmin/ProfileAdmin';
import PortfolioAdmin from "../../components/PortfolioAdmin/PortfolioAdmin"
import ShopAdmin from "../../components/ShopAdmin/ShopAdmin"

const Admin = () => {
    
    return (
        <main className="admin">
            <ProfileAdmin />
            <PortfolioAdmin />
            <ShopAdmin />
        </main>
    )
}

export default Admin