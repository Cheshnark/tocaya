import kofiLogo from '../../images/kofilogo.png'
import behanceLogo from '../../images/behance.png'
import instagramLogo from '../../images/instagram.png'
import linkedinLogo from '../../images/linkedin.png'

const Footer = () => {
    const year:number = (new Date()).getFullYear(); 

    return (
        <footer className="footerh-full" id="contact">
            <hr className="border-1 border-black"/>
            <h2 className="mt-8 text-center text-4xl font-bold" >Contacto</h2>
            <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-7xl mx-auto">
                <div className="contact-info w-10/12 mx-auto flex flex-col justify-center gap-8 text-justify">
                    <div className="social">
                        <figure className="social-icons flex justify-center align-middle gap-8">
                            <div className="social-icon__bg w-12 h-12 hover:scale-105 transition-all">
                                <a href="https://www.instagram.com/tocayavazquez/" target="_blank">
                                    <img src={instagramLogo} alt="Instagram logo" />
                                </a>
                            </div>
                            <div className="social-icon__bg w-12 h-12 hover:scale-105 transition-all">
                                <a href="https://www.behance.net/veronicavazquez8" target="_blank">
                                    <img src={behanceLogo} alt="Behance logo" />
                                </a>
                            </div>
                            <div className="social-icon__bg w-12 h-12 hover:scale-105 transition-all">
                                <a href="https://www.linkedin.com/in/tocayavazquez/" target="_blank">
                                    <img src={linkedinLogo} alt="Linkedin logo" />
                                </a>
                            </div>
                            <div className="social-icon__bg w-12 h-12 hover:scale-105 transition-all">
                                <a href="https://ko-fi.com/tocayavazquez" target="_blank">
                                    <img src={kofiLogo} alt="Kofi logo" />
                                </a>
                            </div>
                        </figure>
                    </div>
                    <div>
                        <p>Si tienes alguna propuesta de trabajo, colaboración, comentario y/o salseo, por favor ponte en contacto conmigo, estaré encantada de atenderte. 
                            <br /><br />
                        </p>
                        <p className="text-center text-red-600 hover:text-red-700 hover:scale-105 transition-all" >
                            <a href="mailto:TocayaVazquez@gmail.com">TocayaVazquez@gmail.com</a>
                        </p>
                    </div>
                </div>
                <form 
                    action="https://formsubmit.co/4thstringinE@gmail.com" 
                    method="POST" 
                    className="contact-form flex flex-col gap-4 w-8/12 mx-auto" >
                    <input type="hidden" name="_next" value="http://localhost:5173/gracias"/>
                    <h3 className="text-center text-lg font-bold">¿Algo qué quieras decirme?</h3>
                    <div className="contact-form__user-info grid grid-cols-2 grid-rows-2 gap-y-4 items-center text-center">
                        <label htmlFor='name'>Nombre: </label>
                        <input 
                            type="text" 
                            name='nombre'
                            id='name'
                            autoComplete="off" 
                            className="bg-green-100 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"/>
                        <label htmlFor='contact-email'>Email: </label>
                        <input 
                            type="text" 
                            name='email'
                            id='contact-email'
                            autoComplete="off"
                            className="bg-green-100 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"/>
                    </div>
                    <label htmlFor="contact-body" className='hidden'>Cuerpo del mail</label>
                    <textarea 
                        name="mail-body" 
                        id="contact-body" 
                        cols={30} 
                        rows={5}
                        className="bg-green-100 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"></textarea>
                    <button className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Enviar!</button>
                </form>
            </div>
            
            <div className="copy-mail mt-8 mb-2 text-center">
                <p>©{year} Tocaya Vázquez</p>
                <p>TocayaVazquez@gmail.com</p>
            </div>
        </footer>
    )
}

export default Footer