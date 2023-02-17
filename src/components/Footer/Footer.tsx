

const Footer = () => {
    const year:Number = (new Date()).getFullYear(); 

    return (
        <footer className="h-full">
            <hr className="border-1 border-black"/>
            <div className="social">
                <figure className="social-icons">
                    <i className="fa-brands fa-instagram" />
                    <i className="fa-brands fa-behance" />
                    <i className="fa-brands fa-linkedin-in" />
                </figure>
            </div>
            <div className="copy-mail">
                <p>©{year} Tocaya Vázquez</p>
                <p>TocayaVazquez@gmail.com</p>
            </div>
        </footer>
    )
}

export default Footer