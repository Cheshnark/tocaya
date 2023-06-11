import { useState, useEffect } from 'react';

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
    collection:{
        images:Images[];
        name:String;
    }
}

const PortfolioSection = ({collection}:Props) => {
    const [colNum, setColNum] = useState<string>("lg:grid-cols-2")
    const [xlColNum, setXlColNum] = useState<string>("3")    

    // useEffect(() => {
    //     setColNum(():string => {
    //         if(collection.images.length  < 3){
    //             return `lg:grid-cols-${collection.images.length} xl:grid-cols-${collection.images.length}`
    //         }else {
    //             return "lg:grid-cols-2 xl:grid-cols-"
    //         }
    //     })
    //     setXlColNum(():string => {
    //         if(collection.images.length < 3){
    //             return `2xl:grid-cols-${collection.images.length}`
    //         }else{
    //             return "2xl:grid-cols-3"
    //         }
    //     })
    // },[collection])

    return (
        <section className="children">
            <h3 className='md:hidden mt-4 text-4xl text-center'>{collection.name}</h3>
            {/* <figure className={`personal-images-container grid grid-flow-row-dense ${colNum} ${xlColNum} justify-center`}> */}
            <figure className={`personal-images-container flex flex-col max-w-7xl mx-auto justify-center`}>
                {collection.images.map((img,i) => {
                    return(
                        <img 
                            src={`https://tocaya-server-production.up.railway.app/images/portfolio/${collection.images[i].filename}`} 
                            alt="portfolio-image" 
                            key={collection.images[i]._id} 
                            className="justify-self-center"/>
                    )
                })}
            </figure>
        </section>
    )
}

export default PortfolioSection