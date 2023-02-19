import { useState } from 'react'

import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"

interface Img {
    id:string,
    img: string
} 

const Shop = () => {
    const [mainImage, setMainImage] = useState<string>("123")
    const images:Img[] = [
        {
            id: "123",
            img: "https://images.squarespace-cdn.com/content/v1/51f0dff4e4b07acd2a17347c/1624133571531-0OPNXXCB7Q78RRJUCBWV/Web_Sticker_Sticker-sheet.jpg?format=1000w"
        },
        {
            id:"124",
            img: "https://images.squarespace-cdn.com/content/v1/51f0dff4e4b07acd2a17347c/1624123980629-VS7CLEUDU1FZPLNGV81G/Web_Sticker_Spring.jpg?format=1000w"
        },
        {
            id:"125",
            img: "https://images.squarespace-cdn.com/content/v1/51f0dff4e4b07acd2a17347c/1624133631070-MTL006EVKC41ETKVGQVO/Web_Sticker_Fish.jpg?format=1000w"
        },

    ]

    const bigImage = (event:any) => {
        const imageId:string = (event.target as HTMLButtonElement).id
        const filteredImage = images.filter((image) => { 
            return image.id === imageId    
        })
        setMainImage(filteredImage[0].img)
    }
    

    return (
        <>
        <NavBar />
        <main className="shop">
            <h2 className="text-6xl p-4 text-center">Tienda</h2>
            {images &&
            <figure className="main-image w-10/12 mx-auto">
                <img src={mainImage} alt="main-image" />
                <div className="miniatures grid grid-flow-row grid-cols-3 max-w-full mt-4 gap-4 hover:cursor-pointer">
                    {images.map((image, i) => {
                        return(
                            <img 
                                src={image.img} 
                                alt="perretes-img" 
                                id={image.id} 
                                onClick ={bigImage}
                                className=""/>    
                    )   
                })}
                </div>
            </figure>}
            <figure className="products-container    md:grid-cols-3 justify-center gap-2 text-center px-4">
            
            </figure>
            <div className="perretes-content w-11/12 mx-auto flex flex-col justify-around">
                <h3 className='md:hidden mt-4 text-4xl text-center'>Perretes</h3>
                <p className="text-justify">Retratos de perretes. Los mejores perretes, los mejores retratos. Pasen y
                    vean. Vean y compren. Compren y vuelvan. No hay salida. NO hay escapatoria.
                    Perretes! Perretes! 
                    <br /><br />
                    Si quieres un retrato de perrete pincha en siguiente botón
                </p>
                <button className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Pide el tuyo!</button>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Shop