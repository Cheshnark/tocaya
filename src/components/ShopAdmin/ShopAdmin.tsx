interface Product {
    name: string,
    description: string,
    size: Array<string>,
    backgroundColor: Array<string>
}


const products:Array<Product> = [
    {
        name: "Perrete",
        description: "Perros dibujados muy dibujados con cosas",
        size: [
            "15x15",
            "20x20",
            "60x60"
        ],
        backgroundColor: [
            "#83a3ee",
            "#ef1a11",
            "#80bd76"
        ]
    }
]

const ShopAdmin = () => {

    return (
        <section className="shop-admin">
            <div className="shop-admin__title bg-cyan-500 p-4">
                <h2 className="text-3xl">Tienda</h2>
            </div>
            <form action="submit" className="p-4">
                {products.map(product => {
                    return(
                        <div className="shop-admin__product bg-zinc-200 p-4">
                            <div className="product-name flex justify-start mb-4">
                                <h3 className="text-2xl mx-4">{product.name}</h3>
                                <div className="product-name__items flex justify-around items-center gap-2">
                                    <i className="fa-solid fa-pen" />
                                    <i className="fa-solid fa-trash-can" />
                                </div>
                                
                            </div>
                            <div className="product-description flex justify-start items-center mb-4">
                                <p className="mx-4">{product.description}</p>
                                <i className="fa-solid fa-pen" />
                            </div>
                            <div className="product-collapsables flex justify-around p-4 mb-8">
                                <div className="product-size w-60 flex flex-col">
                                    <h4 className="text-center mb-4">Tamaño del producto</h4>
                                    {product.size.map(s => {
                                        return(
                                            <div className="produc-size__object flex justify-between gap-4">
                                                <p className="ml-4">{s}</p>
                                                <div className="produc-size__object-items">
                                                    <i className="fa-solid fa-plus mr-4" />
                                                    <i className="fa-solid fa-trash-can" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="product-background w-60 flex flex-col">
                                    <h4 className="text-center mb-4">Color de fondo</h4>
                                    {product.backgroundColor.map(background=> {
                                        return(
                                            <div className="product-background__object flex justify-between">
                                                <p className="ml-4">{background}</p>
                                                <div className="produc-background__object-items">
                                                    <i className="fa-solid fa-plus mr-4" />
                                                    <i className="fa-solid fa-trash-can" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </form>
        </section>
    )
}

export default ShopAdmin