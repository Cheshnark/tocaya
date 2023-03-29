import { useState, useEffect } from 'react';

import Calendar from '../Calendar/Calendar';

interface Image {
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    path: string;
    size: number
  }  
  interface Props {
    product: {
        productTitle: string;
        productInnerTitle: string;
        productDescription: string;
        productInnerDescription: string;
        images: Array<Image>;
        size: Array<string>;
        backgroundColor: Array<{
            name: string;
            hex: string
        }>
        _id:string
    }
  }

const ProductForm = ({product}:Props) => {
    const [color, setColor] = useState(product.backgroundColor.length > 0 && product.backgroundColor[0].hex)
    const [showWarning, setShowWarning] = useState(false)
    const [showFileField, setShowFileField] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)

    console.log(product);
    
    
    const colorPick = (e:any) => {
        setColor(e.target.value)
        if(!showWarning){
            setShowWarning(true)
            setTimeout(() => {
                setShowWarning(false)
            }, 10000)
        }
    }

    const openCalendar = (e:any) => {
        setShowCalendar(!showCalendar)
    }

    const fileField = () => {
        setShowFileField(!showFileField)
    }

    return (
        <form action="submit" className="flex flex-col justify-center gap-4 w-10/12 mx-auto my-4 text-center">
            {product && 
            <>
            <h3 className="mt-4 text-4xl">{product.productInnerTitle}</h3>
            <p className='text-justify'>{product.productInnerDescription}</p>
            <label htmlFor="">Tamaño</label>
            <select name="tamaño" id="" className="w-6/12 mx-auto">
                {product.size.length > 0 &&
                    product.size.map(size => {
                        return <option value={size}>{size}</option>
                })}
            </select>
            <label htmlFor="color">Color del fondo</label>
            <select name="color" id="" className="w-6/12 mx-auto" style={{backgroundColor:`${color}`}} onChange={colorPick}>
                {product.backgroundColor.length > 0 &&
                    product.backgroundColor.map(bgColor => {
                        return <option value={bgColor.hex} style={{backgroundColor: bgColor.hex}} >{bgColor.name}</option>
                })}
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
            <label
            onClick={openCalendar}
            className='bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105' >
                Fecha de entrega
                <i className="fa-solid fa-angle-down pl-4" />
            </label>
            {showCalendar &&
                <Calendar />
            }
            <label>Comentarios</label>
            <textarea name="comentas" id="coments" cols={25} rows={5} className="border-2 border-green-200 bg-green-50"></textarea>
            <button className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Pedir perrete!</button>
            </>
            }
        </form>
    )
}

export default ProductForm