import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
const NotFound = () => {
    return (
        <>
            <NavBar />
            <main className="not-found mb-8 flex flex-col justify-center items-center">
                <h2 className='text-6xl p-4 text-center text-red-500'>404</h2>
                <p className='w-11/12 sm:w-8/12 mx-auto pb-36 text-justify'>Algo no va bien. Esta página no existe, es un espejismo.
Vuelve a intentarlo en otro momento. </p>
            </main>
            <Footer />
        </>
    )
}

export default NotFound