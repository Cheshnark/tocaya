import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import ImageDisplayer from '../../components/ImageDisplayer/ImageDisplayer'
import ProductForm from '../../components/ProductForm/ProductForm'


const Product = () => {
    const { id } = useParams()
    const {data, loading, error} = useFetch(`http://localhost:8000/shop/${id}`)

    return (
        <main className="product">
            <NavBar />
            {error && <div className="product-error">{error}</div> }
            {loading && <div className="product-loading">Loading...</div> }
            {data && 
                <>
                <ImageDisplayer images={data[0].images}/>
                <ProductForm product={data[0]}/>
                </>
            }
            <Footer />
        </main>
    )
}

export default Product