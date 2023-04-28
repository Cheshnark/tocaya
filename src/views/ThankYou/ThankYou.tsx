import { useEffect } from "react";

const ThankYou = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
          window.location.replace('https://tocaya-vazquez.vercel.app/tienda');
        }, 3000);
      }, []);

    return (
        <main className="thank-you flex flex-col justify-center items-center h-full min-h-screen">
            <h2 className="text-4xl sm:text-6xl p-4 text-center">¡Gracias por escribir!</h2>
            <p className='w-11/12 sm:w-8/12 mx-auto text-center'>Si has hecho un pedido, recuerda revisar tu correo los próximos días.
            Te contestaré lo antes posible 😊 </p>
        </main>
    )
}

export default ThankYou