import { useState, useEffect } from 'react';

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
    
    const colorPick = (e:any) => {
        e.preventDefault()

        setColor(e.target.value)
        console.log(e.target.name);
        
        
        if(!showWarning){
            setShowWarning(true)
            setTimeout(() => {
                setShowWarning(false)
            }, 10000)
        }
    }

    const fileField = (e:any) => {
        e.preventDefault()
        setShowFileField(!showFileField)
    }

    return (
        <form 
            action="https://formsubmit.co/4thstringinE@gmail.com" 
            method="POST"
            encType="multipart/form-data" 
            className="flex flex-col justify-center gap-4 w-10/12 mx-auto my-4 text-center sm:max-w-sm lg:max-w-md">
            {product && 
            <>
            <h3 className="mt-4 text-4xl">{product.productInnerTitle}</h3>
            <p className='text-justify'>{product.productInnerDescription}</p>
            <label htmlFor="size">Tamaño</label>
            <select name="tamaño" id="size" className="w-6/12 mx-auto rounded-lg bg-green-50">
                {product.size.length > 0 &&
                    product.size.map((size, i) => {
                        return <option value={size} key={i} className='bg-green-50'>{size}</option>
                })}
            </select>
            <label htmlFor="color">Color del fondo</label>
            <select name="color" id="color" className="w-6/12 mx-auto rounded-lg" style={{backgroundColor:`${color}`}} onChange={colorPick}>
                {product.backgroundColor.length > 0 &&
                    product.backgroundColor.map((bgColor, i) => {
                        return <option value={bgColor.hex} style={{backgroundColor: bgColor.hex}} key={i} >{bgColor.name}</option>
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
                className='bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105' >
                    Sube 4 foto de tu mascota 
                    <i onClick={fileField} className="fa-solid fa-angle-down pl-4" />
            </label>
            {showFileField &&
            <div className="input-drawer flex flex-col justify-center gap-2">
                <input type="file"  
                    name="attachment-1" 
                    accept="image/*"
                    className="w-10/12 mx-auto" />
                <input type="file"  
                    name="attachment-2" 
                    accept="image/*"
                    className="w-10/12 mx-auto" />
                <input type="file"  
                    name="attachment-3"
                    accept="image/*"
                    className="w-10/12 mx-auto" />
                <input type="file"  
                    name="attachment-4"
                    accept="image/*"
                    className="w-10/12 mx-auto" />
            </div>}
            <label htmlFor='email'>Email</label>
            <input 
                type="email" 
                name='email' 
                id='email' 
                required 
                autoComplete="off"
                className="border-2 border-green-200 bg-green-50 rounded-lg focus:border-green-500 focus:outline-none"/>
            <label>Comentarios</label>
            <textarea name="comentarios" id="coments" cols={25} rows={5} className="border-2 border-green-200 bg-green-50 rounded-lg focus:border-green-500 focus:outline-none"></textarea>
            <button 
                type="submit" 
                className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Pedir perrete!</button>
            </>
            }
        </form>
    )
}

export default ProductForm