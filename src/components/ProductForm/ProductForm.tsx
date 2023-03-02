import { useState, useEffect } from 'react';

const ProductForm = () => {
    const [color, setColor] = useState("#5C9665")
    const [showWarning, setShowWarning] = useState(false)
    const [showFileField, setShowFileField] = useState(false)
    
    const colorPick = (e:any) => {
        setColor(e.target.value)
        if(!showWarning){
            setShowWarning(true)
            setTimeout(() => {
                setShowWarning(false)
            }, 10000)
        }
    }

    const fileField = () => {
        setShowFileField(!showFileField)
    }

    return (
        <form action="submit" className="flex flex-col justify-center gap-4 w-10/12 mx-auto my-4 text-center">
            <h3 className="mt-4 text-4xl">Elige los detalles</h3>
            <p className='text-justify'>
                Los perretes son tus amigos, buenos amigos, buenos perretes, mejores personas. Al menos mejores
                personas que muchas personas. No es que sea difícil, es verdad, pero tu me entiendes. No quieres un
                retrato de tu perrete? No harías una foto a tu hijo? Un cuadro a tu hijo? Pero tienes hijo? No? Sí? Da igual.
                Retrato de tu perrete.
            </p>
            <label htmlFor="">Tamaño</label>
            <select name="tamaño" id="" className="w-6/12 mx-auto">
                <option value="15x15">15x15</option>
                <option value="30x30">30x30</option>
                <option value="60x60">60x60</option>
            </select>
            <label htmlFor="color">Color del fondo</label>
            <select name="color" id="" className="w-6/12 mx-auto" style={{backgroundColor:`${color}`}} onChange={colorPick}>
                <option value="#5C9665" style={{backgroundColor:"#5C9665"}} >verde chachi</option>
                <option value="#007fff" style={{backgroundColor:"#007fff"}} >azul molón</option>
                <option value="#B25D72" style={{backgroundColor:"#B25D72"}} >rosa chido</option>
            </select>
            {showWarning &&
            <aside className='flex justify-center items-center gap-1 p-2 border-2 border-green-200 bg-green-50'>
                <i className="fa-solid fa-triangle-exclamation text-2xl" />
                <p className='p-3 text-justify'>
                    Ten en cuenta que el color que aparece en la pantalla puede cambiar mucho del resultado final.
                    Cualquier duda, puedes escribirme ;)
                </p>
            </aside>
            }
            <label 
                onClick={fileField}
                className='bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105' >
                    Sube 5 foto de tu mascota 
                    <i className="fa-solid fa-angle-down pl-4" />
            </label>
            {showFileField &&
            <div className="input-drawer flex flex-col justify-center gap-2">
                <input type="file" 
                    id="pet-image" 
                    name="pet-image" 
                    className="w-10/12 mx-auto" />
                <input type="file" 
                    id="pet-image" 
                    name="pet-images" 
                    className="w-10/12 mx-auto" />
                <input type="file" 
                    id="pet-image" 
                    name="pet-images" 
                    className="w-10/12 mx-auto" />
                <input type="file" 
                    id="pet-image" 
                    name="pet-images" 
                    className="w-10/12 mx-auto" />
                <input type="file" 
                    id="pet-image" 
                    name="pet-images" 
                    className="w-10/12 mx-auto" />
            </div>}
            <label htmlFor="">Comentarios</label>
            <textarea name="comentas" id="coments" cols={25} rows={5} className="border-2 border-green-200 bg-green-50"></textarea>
            <button className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Pedir perrete!</button>
        </form>
    )
}

export default ProductForm