import { useState } from 'react'
import NavBar from "../../components/NavBar/NavBar"
import PortfolioSection from '../../components/PortfolioSection/PortfolioSection'
import Footer from "../../components/Footer/Footer"

import dolphin from '../../images/dolphin.jpg'
import dragon from '../../images/dragon.jpg'
import clase from '../../images/clase.png'
import elephant from '../../images/elephant.jpg'
import picadito from '../../images/picadito.png'
import whale from '../../images/whale.jpg'
import yayo from '../../images/yayo.png'
import retratos from '../../images/retratos.png'

interface Collection {
    img:string[],
    name:String
}

const Portfolio = () => {
    const [visibleSection, setVisibleSection] = useState<number>(1)

    const editorial:Collection = {
        img:[retratos],
        name:"Editorial"    
    }
    const personal:Collection = {
        img:[dolphin, dragon],
        name: "Personal"
    }
    const children:Collection = {
        img:[whale, elephant, clase, yayo, picadito],
        name:"Children Books"
    }

    return (
        <>
        <NavBar />
        <main className="portfolio">
            <h2 className="text-6xl p-4 text-center">Portfolio</h2>
            <header className="hidden md:flex justify-center gap-6">
                <h3 className='text-4xl text-center hover:cursor-pointer' onClick={() => setVisibleSection(1)}>Personal Work</h3>
                <h3 className='text-4xl text-center hover:cursor-pointer' onClick={() => setVisibleSection(2)}>Editorial</h3>
                <h3 className='text-4xl text-center hover:cursor-pointer' onClick={() => setVisibleSection(3)}>Children Books</h3>
            </header>
            <hr className="hidden md:block mb-4 border-1 border-black"/>
            <div className="portfolio-small-screen md:hidden">
                <PortfolioSection collection={personal}/>
                <PortfolioSection collection={editorial}/>
                <PortfolioSection collection={children}/>
            </div>
            <div className="portfolio-big-screen hidden md:block">
                {visibleSection === 1 &&
                <PortfolioSection collection={personal}/>
                }
                {visibleSection === 2 &&
                    <PortfolioSection collection={editorial}/>
                }
                {visibleSection === 3 &&
                    <PortfolioSection collection={children}/>
                }
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Portfolio