import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import NavBar from "../../components/NavBar/NavBar"
import ImageDisplayer from '../../components/ImageDisplayer/ImageDisplayer';
import Footer from "../../components/Footer/Footer"
import Product from '../Product/Product';

interface Image {
    _id: string;
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    path: string;
    size: number
  }

interface Background {
    name: string;
    hex: string;
    _id: string
}
interface Product {
    _id: string;
    productTitle: string;
    productDescription: string;
    size: string[];
    images: Image[];
    backgroundColor: Background[];
    productInnerTitle: string;
    productInnerDescription: string;
}

const Shop = () => {
    const {data, loading, error} = useFetch("https://tocaya-server-production.up.railway.app/shop")

    return (
        <>
        <NavBar />
        <h2 className="text-5xl p-4 text-center">Tienda</h2>
        <main className="shop md:flex flex-grow flex-wrap justify-center w-11/12 mx-auto">
                {error && <div className="shop-error">{error}</div> }
                {loading && <div className="shop-loading">Loading...</div> }
                {data && 
                    data.map((product:Product) => {
                        return (
                        <div className="shop-container" key={product._id}>
                            <ImageDisplayer images={product.images}/>
                            <article className="perretes-content w-10/12 mx-auto flex flex-col justify-around">
                                <header>
                                    <h3 className='mt-4 text-3xl text-center'>{product.productTitle}</h3>
                                </header>
                                <p className="text-justify max-w-sm mx-auto">{product.productDescription}</p>
                                <Link to={"/producto/" + product._id} className="w-6/12 my-8 self-center flex justify-center">
                                    <button className="py-2 px-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">
                                        Pide el tuyo!
                                    </button>
                                </Link>
                            </article>
                        </div>
                    )})
                }
        </main>
        <Footer />
        </>
    )
}

export default Shop