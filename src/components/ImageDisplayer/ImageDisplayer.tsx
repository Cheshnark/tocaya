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
        setMainImage(`http://localhost:8000/images/shop/${filteredImage[0].filename}`)
    }

    return ( 
        <figure className="image-container w-10/12 mx-auto">
            {mainImage !== "" ? <img src={mainImage} alt="main-image" /> : <img src={`http://localhost:8000/images/shop/${images[0].filename}`} alt="main-image" />}
            <div className="miniatures grid grid-flow-row grid-cols-3 max-w-full mt-4 gap-4 hover:cursor-pointer">
                {images.map((image) => {
                    return(
                        <img 
                            src={`http://localhost:8000/images/shop/${image.filename}`} 
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