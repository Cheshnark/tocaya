import { useState, useEffect } from 'react';

interface Props {
    collection:{
        img:string[],
        name:String
    }
}

const PortfolioSection = ({collection}:Props) => {
    const [colNum, setColNum] = useState<string>("lg:grid-cols-2")
    const [xlColNum, setXlColNum] = useState<string>("3")

    useEffect(() => {
        setColNum(():string => {
            if(collection.img.length  < 3){
                return `lg:grid-cols-${collection.img.length} xl:grid-cols-${collection.img.length}`
            }else {
                return "lg:grid-cols-2 xl:grid-cols-"
            }
        })
        setXlColNum(():string => {
            if(collection.img.length < 3){
                return `2xl:grid-cols-${collection.img.length}`
            }else{
                return "2xl:grid-cols-3"
            }
        })
    },[collection])

    return (
        <section className="children">
            <h3 className='md:hidden mt-4 text-4xl text-center'>{collection.name}</h3>
            <hr className="md:hidden mb-4 border-1 border-black"/>
            <figure className={`personal-img-container grid grid-flow-row-dense ${colNum} ${xlColNum} justify-center`}>
                {collection.img.map((img,i) => {
                    return(
                        <img src={img} alt="portfolio-image" key={i} className="justify-self-center"/>
                    )
                })}
            </figure>
        </section>
    )
}

export default PortfolioSection