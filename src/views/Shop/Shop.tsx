import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import NavBar from "../../components/NavBar/NavBar"
import ImageDisplayer from '../../components/ImageDisplayer/ImageDisplayer';
import Footer from "../../components/Footer/Footer"


const Shop = () => {
    const {data, loading, error} = useFetch("http://localhost:8000/shop")

    return (
        <>
        <NavBar />
        <main className="shop">
            <h2 className="text-6xl p-4 text-center">Tienda</h2>
                {error && <div className="shop-error">{error}</div> }
                {loading && <div className="shop-loading">Loading...</div> }
                {data && 
                    data.map(product => {
                        return (
                        <div className="shop-container">
                            <ImageDisplayer images={product.images}/>
                            <div className="perretes-content w-10/12 mx-auto flex flex-col justify-around">
                                <h3 className='mt-4 text-4xl text-center'>{product.productTitle}</h3>
                                <p className="text-justify">{product.productDescription}</p>
                                <Link to={"/producto/" + product._id} className="w-6/12 my-8 self-center flex justify-center">
                                    <button className="py-2 px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">
                                        Pide el tuyo!
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )})
                }
        </main>
        <Footer />
        </>
    )
}

export default Shop