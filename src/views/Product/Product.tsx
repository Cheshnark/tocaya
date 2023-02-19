import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import ImageDisplayer from '../../components/ImageDisplayer/ImageDisplayer'
import ProductForm from '../../components/ProductForm/ProductForm'


const Product = () => {

    return (
        <main className="product">
            <NavBar />
            <ImageDisplayer/>
            <ProductForm />
            <Footer />
        </main>
    )
}

export default Product