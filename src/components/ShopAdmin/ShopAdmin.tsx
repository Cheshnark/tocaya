import { useState } from 'react';
import { useFetch } from '../../useFetch';
interface Product {
    name: string,
    description: string,
    size: Array<string>,
    backgroundColor: Array<string>
}


const products:Array<Product> = [
    {
        name: "Perrete",
        description: "Perros dibujados muy dibujados con cosas",
        size: [
            "15x15",
            "20x20",
            "60x60"
        ],
        backgroundColor: [
            "#83a3ee",
            "#ef1a11",
            "#80bd76"
        ]
    }
]

const ShopAdmin = () => {
    const {data, loading, error, handleCancelRequest, hasChanged, setHasChanged} = useFetch("http://localhost:8000/shop")
    
    const [showNameInput, setShowNameInput] = useState(false)
    const [showImageInput, setShowImageInput] = useState(false)
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




    const createProduct = async () => {
        const data = {productTitle:tempProductName}

        const response = await fetch('http://localhost:8000/shop/product', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
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
            headers: {"Content-type": "application/json; charset=UTF-8"}
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
            headers: {"Content-type": "application/json; charset=UTF-8"}
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
                            <div className="shop-admin__product bg-zinc-200 p-4 mb-4 flex flex-col justify-center">
                                {showProductName ? (
                                    <div className="product-title flex justify-start mb-4">
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
                                    {product.images.map(image => {
                                        return (
                                            <div className="product-image flex items-center gap-2 w-11/12 max-w-sm">
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
                                        {product.size.map(s => {
                                            return(
                                                <div className="produc-size__object flex justify-between gap-4">
                                                    <p className="ml-4">{s}</p>
                                                    <div className="produc-size__object-items">
                                                        <i className="fa-solid fa-plus mr-4" />
                                                        <i className="fa-solid fa-trash-can" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="product-background w-60 flex flex-col">
                                        <h4 className="text-center mb-4">Color de fondo</h4>
                                        {product.backgroundColor.map(background=> {
                                            return(
                                                <div className="product-background__object flex justify-between">
                                                    <p className="ml-4">{background}</p>
                                                    <div className="produc-background__object-items">
                                                        <i className="fa-solid fa-plus mr-4" />
                                                        <i className="fa-solid fa-trash-can" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
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
                <div className="section-name-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
                    <div className="section-name-input-content flex flex-col">
                        <h3 className='text-white text-center text-2xl font-bold mb-4'>Da nombre al nuevo producto</h3>
                        <div className="input-content__form flex justify-center items-center gap-4">
                            <input 
                                type="text" 
                                name='name' 
                                value={tempProductName} 
                                autoComplete="off"
                                className='w-6/12 outline-none p-2 rounded-md' 
                                onChange={(e) => {
                                    setTempProductName(e.target.value)
                                }}
                                />
                            <i 
                            className="fa-solid fa-xmark text-white hover:cursor-pointer" 
                            onClick={() => {
                                setShowNameInput(false)
                                setTempProductName("")}}/>
                            <i 
                                className="fa-solid fa-arrow-up-from-bracket text-white hover:cursor-pointer"
                                onClick={createProduct} />
                        </div>
                    </div>
                </div>
            }
            {showImageInput &&
                <div className="section-name-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
                    <div className="section-name-input-content flex flex-col">
                        <h3 className='text-white text-center text-2xl font-bold mb-4'>Elige una imagen que subir</h3>
                        <div className="input-content__form flex justify-center items-center gap-4">
                            <input 
                                type="file" 
                                name='productPicture' 
                                autoComplete="off"
                                className='w-6/12 outline-none p-2 rounded-md bg-white' 
                                onChange={(e:any) => {
                                    setTempPicture(e.target.files[0])
                                }}
                                />
                            <i 
                            className="fa-solid fa-xmark text-white hover:cursor-pointer" 
                            onClick={() => {
                                setShowImageInput(false)
                                }}/>
                            <i 
                                className="fa-solid fa-arrow-up-from-bracket text-white hover:cursor-pointer"
                                onClick={() => addProductPicture(tempId)} />
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default ShopAdmin