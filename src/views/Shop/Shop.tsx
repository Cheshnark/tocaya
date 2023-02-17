import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"

interface Product {
    img: string,
    name: string,
    price: number
} 

const Shop = () => {
    const currency = "€"
    const products:Product[] = [
        {
            img: "",
            name: "Albondigas",
            price: 50
        },
        {
            img: "",
            name: "Chukrut",
            price: 50
        },
        {
            img: "",
            name: "Melón",
            price: 50
        },
        {
            img: "",
            name: "Alabardas checas",
            price: 50
        },
    ]

    return (
        <>
        <NavBar />
        <main className="shop">
            <h2 className="text-6xl p-4 text-center">Tienda</h2>
            <div className="products-container grid grid-flow-row grid-cols-3 justify-center">
            {products.map((product, i) => {
                return(
                <div className="product" key={i}>
                    <figure className="product-image">
                        <img src={product.img} alt="" />
                    </figure>
                    <h5>{product.name}</h5>
                    <p>{product.price + currency}</p>
                </div>
                )
            })}

            </div>
        </main>
        <Footer />
        </>
    )
}

export default Shop