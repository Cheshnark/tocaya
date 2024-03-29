import { useState } from "react"

interface Images {
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    path: string;
    size: number;
    _id: string
}

interface Props {
    images:Images[],
}


const ImageDisplayer = ({images}:Props) => {
    const [mainImage, setMainImage] = useState<string>("")
    

    const bigImage = (e:React.SyntheticEvent) => {
        const imageId:string = (e.target as HTMLButtonElement).id
        const filteredImage = images.filter((image) => { 
            return image._id === imageId    
        })
        setMainImage(`https://tocaya-server-production.up.railway.app/images/shop/${filteredImage[0].filename}`)
    }

    return ( 
        <figure className="image-container w-10/12 mx-auto max-w-sm lg:max-w-md">
            {mainImage !== "" ? <img src={mainImage} alt="main-image" /> : <img src={`https://tocaya-server-production.up.railway.app/images/shop/${images[0].filename}`} alt="main-image" />}
            <div className="miniatures grid grid-flow-row grid-cols-3 max-w-full mt-4 gap-4 hover:cursor-pointer">
                {images.map((image) => {
                    return(
                        <img 
                            src={`https://tocaya-server-production.up.railway.app/images/shop/${image.filename}`} 
                            alt="perretes-img" 
                            id={image._id} 
                            onClick ={bigImage}
                            key={image._id}/>    
                )   
            })}
            </div>
        </figure>
    )
}

export default ImageDisplayer