import { useState } from 'react'
import { useFetch } from "../../hooks/useFetch"
import { useAuthContext } from '../../hooks/useAuthContext'

import PortfolioNameInput from '../PortfolioNameInput/PortfolioNameInput'
import PortfolioImageInput from '../PortfolioImageInput/PortfolioImageInput'
interface Image {
    _id: string;
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    path: string;
    size: number
  }
interface PortfolioSection {
    _id:string
    name:string,
    images:Image[]
}

const PortfolioAdmin = () => {
    const {data, loading, error, hasChanged, setHasChanged} = useFetch("https://tocaya-server-production.up.railway.app/portfolio") 
    const [showName, setShowName] = useState(true)
    const [showNameInput, setShowNameInput] = useState(false)
    const [showImageInput, setShowImageInput] = useState(false)
    const [tempSectionName, setTempSectionName] = useState("")
    const [tempPicture, setTempPicture] = useState<File | undefined>()
    const [tempId, setTempId] = useState("")
    const { admin } = useAuthContext()

    const createSection = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        
        const data = {name:tempSectionName}

        const response = await fetch('https://tocaya-server-production.up.railway.app/portfolio/section', {
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
            if(setHasChanged)setHasChanged(!hasChanged)
            setTempSectionName("")
            console.log('Section created correctly', json.profile)
        }
    }

    const deleteSection = async (section:PortfolioSection) => {
        
        const data = {id: section._id}

        const response = await fetch('https://tocaya-server-production.up.railway.app/portfolio/section', {
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
            if(setHasChanged)setHasChanged(!hasChanged)
            console.log('Section deleted correctly', json.profile)
        }

    }

    const addPicture = async (sectionId:string) => {        
        const formData = new FormData();
        formData.append('_id', sectionId)
        if(tempPicture){
            formData.append('portfolioImage', tempPicture)

            const response = await fetch('https://tocaya-server-production.up.railway.app/portfolio/section/image', {
            method: 'PATCH',
            body: formData,
            headers: {'Authorization': `Bearer ${admin.token}`}
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            if(setHasChanged)setHasChanged(!hasChanged)
            setShowImageInput(false)
            setTempPicture(undefined)
            console.log('Picture added correctly', json.profile)
        }
        }        
    }

    const deletePicture = async (pictureId:string) => {
        const data = {filename: pictureId, id:tempId}

        const response = await fetch('https://tocaya-server-production.up.railway.app/portfolio/section/image', {
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
            if(setHasChanged)setHasChanged(!hasChanged)
            console.log('Image deleted correctly', json.profile)
        }   
    }

    const updateSectionName = async () => {
        const data = {name: tempSectionName, id:tempId}

        const response = await fetch('https://tocaya-server-production.up.railway.app/portfolio/section/', {
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
            if(setHasChanged)setHasChanged(!hasChanged)
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
                {data.map((section:PortfolioSection) => {
                    return (
                        <div className="portfolio-admin-section" key={section._id}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-4 p-8 bg-zinc-200"> 
                                {section.images.length > 0 &&
                                section.images.map(image => {
                                    return (
                                    <div className="portfolio-admin-section-container flex justify-center gap-4" key={image._id}>
                                        <img 
                                            src={`https://tocaya-server-production.up.railway.app/images/portfolio/${image.filename}`} 
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
                    onClick={ () => {
                        setTempSectionName("")
                        setShowNameInput(true)}}>
                    <i className="fa-solid fa-plus mr-4" />
                    Añadir sección
                </button>
            </form>
            }
            {showNameInput &&
                <PortfolioNameInput 
                    tempSectionName={tempSectionName}
                    setTempSectionName={setTempSectionName}
                    setShowNameInput={setShowNameInput}
                    createSection={createSection}/>
            }
            {showImageInput &&
                <PortfolioImageInput
                setTempPicture={setTempPicture}
                setShowImageInput={setShowImageInput}
                addPicture={addPicture}
                tempId={tempId} />
            }
        </section>
    )
}

export default PortfolioAdmin