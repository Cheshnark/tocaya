import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import NavBar from "../../components/NavBar/NavBar"
import { useFetch } from '../../hooks/useFetch'

import PortfolioSection from '../../components/PortfolioSection/PortfolioSection'
import Footer from "../../components/Footer/Footer"

interface Image {
    _id: string;
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    path: string;
    size: number
  }
interface Section {
    _id: string; 
    name: string;
    images: Image[]
}

const Portfolio = () => {
    const [visibleSection, setVisibleSection] = useState<number>(1)
    const {data, loading, error} = useFetch("https://tocaya-server-production.up.railway.app/portfolio")

    document.body.style.overflow = "visible"
    
    return (
        <>
        <NavBar />
        {error && <div className="portfolio-error">{error}</div> }
        {loading && <div className="portfolio-loading">Loading...</div> }
        {data &&
        <main className="portfolio mb-8">
            <h2 className="text-5xl p-4 text-center">Portfolio</h2>
            <header className="hidden md:flex justify-center gap-8 pb-4">
                {data.map((section: Section, i:number) => {
                    return <h3 
                        className='text-3xl text-center hover:cursor-pointer hover:scale-105 hover:text-red-400 transition-all' 
                        onClick={() => setVisibleSection(i + 1)}
                        key={section._id} >
                            {section.name} </h3>
                })}
            </header>
            <hr className="hidden md:block mb-4 border-1 border-black"/>
            <div className="portfolio-small-screen md:hidden">
                {data.map((section: Section) => {
                    return <PortfolioSection collection={section} key={section._id}/>
                })}
            </div>
            <div className="portfolio-big-screen hidden md:block">
                {data.map((section:Section, i:number) => {
                    return visibleSection === i+1 &&
                        <PortfolioSection collection={section} key={section._id}/>
                })}
            </div>
        </main>
        }
        <Footer />
        </>
    )
}

export default Portfolio