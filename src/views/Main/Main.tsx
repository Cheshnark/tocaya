import { useFetch } from '../../hooks/useFetch'

import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

import kofiLogo from '../../images/kofilogo.png'

const Main = () => {
    const {data, loading, error} = useFetch("http://localhost:8000/profile")

    return (
        <>
        <NavBar />
        <main className="main sm:mb-12">
            <section className="about-me h-full w-11/12 mx-auto" id='about-me'>
                <div className="about-me__flex flex flex-col justify-center">
                    <h2 className="text-5xl p-4 text-center">Sobre mí</h2>
                    {error && <div className="main-error">{error}</div> }
                    {loading && <div className="main-loading">Loading...</div> }
                    {data && 
                    <div className="about-me-container flex flex-col sm:flex-row sm:gap-8 justify-center align-middle">
                        <figure className='w-8/12 mx-auto'> 
                            <img src={`http://localhost:8000/images/${data[0].profilePicture.filename}`} alt="" className='rounded-full mx-auto max-h-80'/>
                        </figure>
                        <div className="about-me-content w-10/12 mt-4 mb-6 mx-auto flex flex-col">
                            <h3 className='text-3xl text-center'>{data[0].name}</h3>
                            <p className='mt-4 text-justify'>{data[0].description}</p>
                            <a href="https://ko-fi.com/tocayavazquez"><img src={kofiLogo} alt="Kofi logo" className='w-12 mx-auto mt-4 hover:scale-105 transition-all'/></a>
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