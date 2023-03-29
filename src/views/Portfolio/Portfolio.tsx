import { useState } from 'react'
import NavBar from "../../components/NavBar/NavBar"
import { useFetch } from '../../hooks/useFetch'

import PortfolioSection from '../../components/PortfolioSection/PortfolioSection'
import Footer from "../../components/Footer/Footer"

const Portfolio = () => {
    const [visibleSection, setVisibleSection] = useState<number>(1)
    const {data, loading, error} = useFetch("http://localhost:8000/portfolio")

    console.log(data);

    return (
        <>
        <NavBar />
        {error && <div className="portfolio-error">{error}</div> }
        {loading && <div className="portfolio-loading">Loading...</div> }
        {data &&
        <main className="portfolio">
            <h2 className="text-6xl p-4 text-center">Portfolio</h2>
            <header className="hidden md:flex justify-center gap-6">
                {data.map((section, i) => {
                    return <h3 
                        className='text-4xl text-center hover:cursor-pointer' 
                        onClick={() => setVisibleSection(i + 1)}>
                            {section.name} </h3>
                })}
            </header>
            <hr className="hidden md:block mb-4 border-1 border-black"/>
            <div className="portfolio-small-screen md:hidden">
                {data.map(section => {
                    return <PortfolioSection collection={section}/>
                })}
            </div>
            <div className="portfolio-big-screen hidden md:block">
                {data.map((section, i) => {
                    return visibleSection === i+1 &&
                        <PortfolioSection collection={section}/>
                })}
            </div>
        </main>
        }
        <Footer />
        </>
    )
}

export default Portfolio