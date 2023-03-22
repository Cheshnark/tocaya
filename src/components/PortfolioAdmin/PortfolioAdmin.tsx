import { useState } from 'react'
import { useFetch } from "../../useFetch"

interface PortfolioSection {
    _id:string
    name:string,
    images:string[]
}

const PortfolioAdmin = () => {
    const {data, loading, error, hasChanged, setHasChanged} = useFetch("http://localhost:8000/portfolio") 
    const [showName, setShowName] = useState(true)
    const [showNameInput, setShowNameInput] = useState(false)
    const [showImageInput, setShowImageInput] = useState(false)
    const [tempSectionName, setTempSectionName] = useState("")
    const [tempPicture, setTempPicture] = useState()
    const [tempId, setTempId] = useState("")

    const createSection = async (e:any) => {
        e.preventDefault()
        
        const data = {name:tempSectionName}

        const response = await fetch('http://localhost:8000/portfolio/section', {
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
            setTempSectionName("")
            console.log('Section created correctly', json.profile)
        }
    }

    const deleteSection = async (section:PortfolioSection) => {
        
        const data = {id: section._id}

        const response = await fetch('http://localhost:8000/portfolio/section', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            console.log('Section deleted correctly', json.profile)
        }

    }

    const addPicture = async (sectionId:string) => {        
        const formData = new FormData();
        formData.append('_id', sectionId)
        formData.append('portfolioImage', tempPicture)

        const response = await fetch('http://localhost:8000/portfolio/section/image', {
            method: 'PATCH',
            body: formData,
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            setShowImageInput(false)
            console.log('Picture added correctly', json.profile)
        }
    }

    const deletePicture = async (pictureId:any) => {
        const data = {filename: pictureId, id:tempId}

        const response = await fetch('http://localhost:8000/portfolio/section/image', {
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

    const updateSectionName = async () => {
        const data = {name: tempSectionName, id:tempId}
        console.log(data);
        

        const response = await fetch('http://localhost:8000/portfolio/section/', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setHasChanged(!hasChanged)
            setShowName(true)
            console.log('Section name updated correctly', json.profile)
        }   
    }

    return (
        <section className="portfolio-admin">
            <div className="portfolio-admin__title bg-cyan-500 p-4">
                <h2 className="text-3xl">Portfolio</h2>
            </div>
            {loading && <div>Loading...</div> }
            {error && <div>Error:{error}</div> }
            {data && 
            <form action="submit" className="p-4 flex flex-col justify-center">
                {data.map(section => {
                    return (
                        <div className="portfolio-admin-section">
                            {showName ? (
                                <div className="portfolio-admin-section__name flex justify-center py-4">
                                    <h3 className="text-2xl mx-4">{section.name}</h3>
                                    <div className="portfolio-name__items flex justify-around items-center gap-2">
                                        <i 
                                            className="fa-solid fa-pen hover:cursor-pointer" 
                                            onClick={() => {
                                                setTempSectionName(section.name)
                                                setTempId(section._id)
                                                setShowName(false)}}/>
                                        <i className="fa-solid fa-trash-can hover:cursor-pointer" onClick={() => deleteSection(section)} />
                                </div>
                            </div>
                            ):(
                                <div className="portfolio-admin-section__name flex justify-center py-4">
                                    <input 
                                    type="text" 
                                    name='name' 
                                    value={tempSectionName} 
                                    autoComplete="off"
                                    className='w-6/12 mr-2' 
                                    onChange={e => setTempSectionName(e.target.value)}
                                    />
                                    <div className="portfolio-name__items flex justify-around items-center gap-2">
                                        <i 
                                            className="fa-solid fa-xmark hover:cursor-pointer" onClick={() => setShowName(true)}/>
                                        <i 
                                            className="fa-solid fa-arrow-up-from-bracket hover:cursor-pointer" 
                                            onClick={updateSectionName}/>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-zinc-200"> 
                                {section.images.length > 0 &&
                                section.images.map(image => {
                                    return (
                                    <div className="portfolio-admin-section-container flex justify-center gap-4">
                                        <img 
                                            src={`http://localhost:8000/images/${image.filename}`} 
                                            alt="portfolio image" 
                                            className="max-w-sm w-11/12"/>
                                        <div className="portfolio-name__items flex justify-around items-center gap-2">
                                            <i 
                                                className="fa-solid fa-trash-can hover:cursor-pointer" 
                                                onClick={ () => {
                                                    setTempId(section._id)
                                                    deletePicture(image.filename)}} />
                                        </div>
                                    </div>
                                    )
                                })}
                                <button 
                                    className='bg-cyan-500 w-12 h-12 mx-auto mt-4 min-w-min p-2 rounded-full'
                                    type="button"
                                    onClick={ () => {
                                        setTempId(section._id)
                                        setShowImageInput(true)}}>
                                    <i className="fa-solid fa-plus mx-auto w-11/12" />
                                </button>
                            </div>
                        </div>
                    )
                })}
                <button 
                    className='bg-cyan-500 w-6/12 mx-auto mt-4 min-w-min p-2 rounded-md'
                    type="button"
                    onClick={ () => setShowNameInput(true)}>
                    <i className="fa-solid fa-plus mr-4" />
                    Añadir sección
                </button>
            </form>
            }
            {showNameInput &&
                <div className="section-name-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
                    <div className="section-name-input-content flex flex-col">
                        <h3 className='text-white text-center text-2xl font-bold mb-4'>Da nombre a la nueva sección</h3>
                        <div className="input-content__form flex justify-center items-center gap-4">
                            <input 
                                type="text" 
                                name='name' 
                                value={tempSectionName} 
                                autoComplete="off"
                                className='w-6/12 outline-none p-2 rounded-md' 
                                onChange={(e) => {
                                    setTempSectionName(e.target.value)
                                }}
                                />
                            <i 
                            className="fa-solid fa-xmark text-white hover:cursor-pointer" 
                            onClick={() => {
                                setShowNameInput(false)
                                setTempSectionName("")}}/>
                            <i 
                                className="fa-solid fa-arrow-up-from-bracket text-white hover:cursor-pointer"
                                onClick={createSection} />
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
                                name='portfolioImage' 
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
                                onClick={() => addPicture(tempId)} />
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default PortfolioAdmin