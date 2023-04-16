import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useAuthContext } from '../../hooks/useAuthContext'

import ShopNameInput from '../ShopNameInput/ShopNameInput';
import ShopImageInput from '../ShopImageInput/ShopImageInput';
import ShopSizeInput from '../ShopSizeInput/ShopSizeInput';
import ShopBackgroundInput from '../ShopBackgroundInput/ShopBackgroundInput';

const ShopAdmin = () => {
    const {data, loading, error, hasChanged, setHasChanged} = useFetch("http://localhost:8000/shop")
    const { admin } = useAuthContext()
    
    const [showNameInput, setShowNameInput] = useState(false)
    const [showImageInput, setShowImageInput] = useState(false)
    const [showSizeInput, setShowSizeInput] = useState(false)
    const [showBackgroundInput, setShowBackgroundInput] = useState(false)
    const [showProductName, setShowProductName] = useState(true)
    const [showDescription, setShowDescription] = useState(true)
    const [showInnerTitle, setShowInnerTitle] = useState(true)
    const [showInnerDescription, setShowInnerDescription] = useState(true)

    const [tempProductName, setTempProductName] = useState("")    
    const [tempId, setTempId] = useState("")
    const [tempPicture, setTempPicture] = useState()
    const [tempInnerTitle, setTempInnerTitle] = useState("")
    const [tempProductDescription, setTempProductDescription] = useState("")
    const [tempInnerDescription, setTempInnerDescription] = useState("")
    const [tempSize, setTempSize] = useState("")
    const [tempBackgroundName, setTempBackgroundName] = useState("")
    const [tempBackground, setTempBackground] = useState("")

    const createProduct = async () => {
        const data = {productTitle:tempProductName}

        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setShowNameInput(false)
            setHasChanged(!hasChanged)
            setTempProductName("")
            console.log('Product created correctly', json.profile)
        }
    }

    const deleteProduct = async () => {
        const data = {id:tempId}
        
        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setShowNameInput(false)
            setHasChanged(!hasChanged)
            setTempProductName("")
            console.log('Product created correctly', json.profile)
        }
    }

    const deletePicture = async (pictureId:any) => {
        const data = {filename: pictureId, id:tempId}

        const response = await fetch('http://localhost:8000/shop/product/image', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            console.log('Image deleted correctly', json.profile)
        }   
    }

    const addProductPicture = async (sectionId:string) => {        
        const formData = new FormData();
        formData.append('_id', sectionId)
        formData.append('productPicture', tempPicture)

        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()
        console.log(json);
        

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            setShowImageInput(false)
            console.log('Picture added correctly', json.profile)
        }
    }

    const patchProduct = async (sectionId:string, section:string) => {
        let data = {}

        switch (section) {
            case "title":
                data = {
                    _id:sectionId,
                    productTitle:tempProductName
                }
                break;
            case "description":
                data = {             
                    _id:sectionId,  
                    productDescription: tempProductDescription
                }
                break
            case "innerTitle":
                data = {
                    _id:sectionId,
                    productInnerTitle: tempInnerTitle
                }
                break
            case "innerDescription":
                data = {
                    _id:sectionId,
                    productInnerDescription: tempInnerDescription
                }
                break
            default:
                break;
        }

        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            switch (section) {
                case "title":
                    setTempProductName("")
                    setShowProductName(true)
                    break;
                case "description":
                    setTempProductDescription("")
                    setShowDescription(true)
                case "innerTitle":
                    setTempInnerTitle("")
                    setShowInnerTitle(true)
                    break
                case "innerDescription":
                    setTempInnerDescription("")
                    setShowInnerDescription(true)
                    break
                default:
                    break;
            }
            console.log('Product created correctly', json.profile)
        }
    }

    const addItem = async (sectionId:string, section:string) => {
        let data = {}

        if(section === "size") {
            data = {
                _id:sectionId,
                size:tempSize
            }
        }else if(section === "background") {
            data = {
                _id:sectionId,
                backgroundColor: {
                    name: tempBackgroundName,
                    hex: tempBackground
                }
            }
        }

        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            if(section === "size") {
                setTempSize("")
                setShowSizeInput(false)
            }else if(section === "background") {
                setTempBackgroundName("")
                setTempBackground("")
                setShowBackgroundInput(false)
            }
            console.log('Product created correctly', json.profile)
        }
    }

    const deleteItem = async (itemName:string, section:string) => {
        let data = {}
        if(section === "size"){
            data = {name: itemName, id:tempId, sectionName:section}
        }else if(section === "background") {
            data = {name: itemName, id:tempId,sectionName:section}
        }

        const response = await fetch('http://localhost:8000/shop/product/item', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            console.log('Image deleted correctly', json.profile)
        }   
    }

    return (
        <section className="shop-admin">
            <div className="shop-admin__title bg-cyan-500 p-4">
                <h2 className="text-3xl">Tienda</h2>
            </div>
            <form action="submit" className="p-4 flex flex-col justify-center">
                {error && <div>Error:{error}</div>}
                {loading && <div>Loading...</div> }
                {data &&
                    data.map(product => {
                        return(
                            <div className="shop-admin__product bg-zinc-200 p-4 mb-4 flex flex-col justify-center" key={product._id}>
                                {showProductName ? (
                                    <div className="product-title flex justify-start items-center mb-4">
                                        <label>Product title</label>
                                        <h3 className="text-2xl mx-4">{product.productTitle}</h3>
                                        <div className="product-name__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-pen hover:cursor-pointer"
                                                onClick={ () => {
                                                    setTempProductName(product.productTitle)
                                                    setTempId(product._id)
                                                    setShowProductName(false)
                                                
                                                }}/>
                                        </div>
                                    </div>
                                ):(
                                    <div className="product-title flex justify-start mb-4 gap-4 ">
                                        <input 
                                            type="text" 
                                            name='product-title'
                                            value={tempProductName}
                                            onChange={e => setTempProductName(e.target.value)}/>
                                        <div className="product-name__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                                onClick={() => {
                                                    setShowProductName(true)
                                                    }}/>
                                            <i 
                                                className="fa-solid fa-arrow-up-from-bracket hover:cursor-pointer"
                                                onClick={() => patchProduct(tempId, "title")} />
                                        </div>
                                    </div>
                                )}
                                {showDescription ? (
                                    <div className="product-description flex justify-start items-center mb-4">
                                        <label>Product description</label>
                                        <p className="mx-4 text-justify">{product.productDescription}</p>
                                        <i 
                                            className="fa-solid fa-pen" 
                                            onClick={() => {
                                                setTempProductDescription(product.productDescription)
                                                setTempId(product._id)
                                                setShowDescription(false)
                                            }}/>
                                    </div>
                                ):(
                                    <div className="product-description flex justify-start mb-4 gap-4 ">
                                        <textarea 
                                            name="product-description" 
                                            cols={30} rows={5}
                                            value={tempProductDescription}
                                            onChange={e => setTempProductDescription(e.target.value)}/> 
                                        <div className="product-name__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                                onClick={() => {
                                                    setShowDescription(true)
                                                    }}/>
                                            <i 
                                                className="fa-solid fa-arrow-up-from-bracket hover:cursor-pointer"
                                                onClick={() => patchProduct(tempId, "description")} />
                                        </div>
                                    </div>
                                )}
                                {showInnerTitle ? (
                                    <div className="product-inner-title flex justify-start mb-4">
                                        <label>Product inner title</label>
                                        <h3 className="text-2xl mx-4">{product.productInnerTitle}</h3>
                                        <div className="product-inner-title__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-pen hover:cursor-pointer" 
                                                onClick={() => {
                                                    setTempInnerTitle(product.productInnerTitle)
                                                    setTempId(product._id)
                                                    setShowInnerTitle(false)
                                                }}/>
                                        </div>
                                    </div>
                                ):(
                                    <div className="product-inner-title flex justify-start mb-4 gap-4 ">
                                        <input 
                                            type="text" 
                                            name='product-inner-title'
                                            value={tempInnerTitle}
                                            onChange={e => setTempInnerTitle(e.target.value)}/>
                                        <div className="product-inner-title__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                                onClick={() => {
                                                    setShowInnerTitle(true)
                                                    }}/>
                                            <i 
                                                className="fa-solid fa-arrow-up-from-bracket hover:cursor-pointer"
                                                onClick={() => patchProduct(tempId, "innerTitle")} />
                                        </div>
                                    </div>
                                )}
                                {showInnerDescription ? (
                                    <div className="product-inner-description flex justify-start items-center mb-4">
                                        <label>Inner product description</label>
                                        <p className="mx-4 text-justify">{product.productInnerDescription}</p>
                                        <i 
                                            className="fa-solid fa-pen" 
                                            onClick={() => {
                                                setTempInnerDescription(product.productInnerDescription)
                                                setTempId(product._id)
                                                setShowInnerDescription(false)
                                            }}/>
                                    </div>
                                ):(
                                    <div className="product-inner-description flex justify-start mb-4 gap-4 ">
                                        <textarea 
                                            name='product-inner-description'
                                            cols={30} rows={5}
                                            value={tempInnerDescription}
                                            onChange={e => setTempInnerDescription(e.target.value)}/>                                            
                                        <div className="product-inner-description__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                                onClick={() => {
                                                    setShowInnerDescription(true)
                                                    }}/>
                                            <i 
                                                className="fa-solid fa-arrow-up-from-bracket hover:cursor-pointer"
                                                onClick={() => patchProduct(tempId, "innerDescription")} />
                                        </div>
                                    </div>
                                )}
                                <div className="product-images flex flex-col justify-center gap-2 mb-4 p-2 ">
                                    <h3 className='text-center text-2xl'>Imagenes</h3>
                                    {product.images.length > 0 &&
                                    product.images.map(image => {
                                        return (
                                            <div 
                                                className="product-image flex items-center gap-2 w-11/12 max-w-sm" key={image.filename}>
                                                <img 
                                                    src={`http://localhost:8000/images/shop/${image.filename}`} 
                                                    alt="product-image"/>
                                                <i 
                                                    className="fa-solid fa-trash-can hover:cursor-pointer" 
                                                    onClick={ () => {
                                                        setTempId(product._id)
                                                        deletePicture(image.filename)}} />
                                            </div>
                                            
                                        )
                                    })}
                                    <button 
                                        className='bg-cyan-500 w-12 h-12 mx-auto mt-4 mb-2 min-w-min p-2 rounded-full'
                                        type="button"
                                        onClick={ () => {
                                            setTempId(product._id)                                            
                                            setShowImageInput(true)}}>
                                        <i className="fa-solid fa-plus mx-auto w-11/12" />
                                    </button>
                                </div>
                                <div className="product-collapsables flex justify-around p-4 mb-8">
                                    <div className="product-size w-60 flex flex-col">
                                        <h4 className="text-center mb-4">Tamaño del producto</h4>
                                        {product.size.map((s, i) => {
                                            return(
                                                <div className="produc-size__object flex justify-between gap-4" key={i + Math.random() *1000}>
                                                    <p className="ml-4">{s}</p>
                                                    <div className="produc-size__object-items">
                                                        <i 
                                                            className="fa-solid fa-trash-can"
                                                            onClick={() => {
                                                                setTempId(product._id)
                                                                deleteItem(s, "size")}} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <button 
                                            className='bg-cyan-500 w-12 h-12 mx-auto mt-4 mb-2 min-w-min p-2 rounded-full'
                                            type="button"
                                            onClick={ () => {
                                                setTempId(product._id)                                            
                                                setShowSizeInput(true)}}>
                                            <i className="fa-solid fa-plus mx-auto w-11/12" />
                                        </button>
                                    </div>
                                    <div className="product-background w-60 flex flex-col">
                                        <h4 className="text-center mb-4">Color de fondo</h4>
                                        {product.backgroundColor.map(background=> {
                                            return(
                                                <div className="product-background__object flex justify-between" key={background.hex}>
                                                    <p className="ml-4">{background.name}</p>
                                                    <p className="ml-4">{background.hex}</p>
                                                    <div className="produc-background__object-items">
                                                        <i 
                                                            className="fa-solid fa-trash-can"
                                                            onClick={() => { 
                                                                setTempId(product._id)
                                                                deleteItem(background.name, "background")}}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <button 
                                            className='bg-cyan-500 w-12 h-12 mx-auto mt-4 mb-2 min-w-min p-2 rounded-full'
                                            type="button"
                                            onClick={ () => {
                                                setTempId(product._id)                                            
                                                setShowBackgroundInput(true)}}>
                                            <i className="fa-solid fa-plus mx-auto w-11/12" />
                                        </button>
                                    </div>
                                </div>
                                <div className="produc-size__object-items bg-cyan-500 w-12 h-12 mx-auto mb-2 min-w-min p-2 rounded-full justify-self-end flex justify-center items-center">
                                    <i 
                                        className="fa-solid fa-trash-can"
                                        onClick={() => {
                                            setTempId(product._id)
                                            deleteProduct()}} />
                                </div>
                            </div>
                        )
                    })}
                <button 
                    className='bg-cyan-500 w-7/12 mx-auto mt-4 min-w-min p-2 rounded-md'
                    type="button"
                    onClick={ () => setShowNameInput(true)}>
                    <i className="fa-solid fa-plus mr-4" />
                    Añadir producto
                </button>
            </form>
            {showNameInput &&
                <ShopNameInput 
                    tempProductName={tempProductName}
                    setTempProductName={setTempProductName}
                    setShowNameInput={setShowNameInput}
                    createProduct={createProduct} />
            }
            {showImageInput &&
                <ShopImageInput 
                    setTempPicture={setTempPicture}
                    setShowImageInput={setShowImageInput}
                    addProductPicture={addProductPicture}
                    tempId={tempId} />
            }
            {showSizeInput &&
                <ShopSizeInput 
                    tempSize={tempSize}
                    setTempSize={setTempSize}
                    setShowSizeInput={setShowSizeInput}
                    addItem={addItem}
                    tempId={tempId} />
            }
            {showBackgroundInput &&
                <ShopBackgroundInput 
                    tempBackgroundName={tempBackgroundName}
                    setTempBackgroundName={setTempBackgroundName}
                    tempBackground={tempBackground}
                    setTempBackground={setTempBackground}
                    setShowBackgroundInput={setShowBackgroundInput}
                    addItem={addItem}
                    tempId={tempId} />
            }
        </section>
    )
}

export default ShopAdmin