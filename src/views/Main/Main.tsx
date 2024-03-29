import { useFetch } from '../../hooks/useFetch'

import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

import kofiLogo from '../../images/kofilogo.webp'

const Main = () => {
    const {data, loading, error} = useFetch("https://tocaya-server-production.up.railway.app/profile")

    return (
        <>
        <NavBar />
        <main className="main sm:mb-12">
            <section className="about-me h-full w-11/12 mx-auto" id='about-me'>
                <div className="about-me__flex flex flex-col justify-center">
                    <h2 className="text-5xl p-4 text-center hidden">Sobre mí</h2>
                    {error && <div className="main-error">{error}</div> }
                    {loading && <div className="main-loading">Loading...</div> }
                    {data && 
                    <div className="about-me-container flex flex-col sm:flex-row sm:gap-8 justify-center align-middle">
                        <figure className='w-8/12 mx-auto'> 
                            <img src={`https://tocaya-server-production.up.railway.app/images/${data[0].profilePicture.filename}`} alt="" className='rounded-full mx-auto max-h-80'/>
                        </figure>
                        <div className="about-me-content w-10/12 mt-4 mb-6 mx-auto flex flex-col">
                            <h3 className='text-3xl text-center'>{data[0].name}</h3>
                            <p className='mt-4 text-justify whitespace-pre-line'>{data[0].description}</p>
                        </div>
                    </div>
                    }
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Main;