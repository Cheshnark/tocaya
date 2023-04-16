import { useEffect } from "react";

const ThankYou = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
          window.location.replace('http://localhost:5173/tienda');
        }, 3000);
      }, []);

    return (
        <main className="thank-you flex flex-col justify-center items-center h-full min-h-screen">
            <h2 className="text-6xl p-4 text-center">¡Gracias por escribir!</h2>
            <p className='w-11/12 sm:w-8/12 mx-auto text-justify'>En cuanto vea tu correo confirmo tu pedido o contesto tus dudas. Muchas gracias y buenas noches.</p>
        </main>
    )
}

export default ThankYou