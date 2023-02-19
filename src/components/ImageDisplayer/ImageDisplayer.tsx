import { useState } from "react"

interface Img {
    id:string,
    img: string
} 


const ImageDisplayer = () => {
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
        <figure className="image-container w-10/12 mx-auto">
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
        </figure>
    )
}

export default ImageDisplayer