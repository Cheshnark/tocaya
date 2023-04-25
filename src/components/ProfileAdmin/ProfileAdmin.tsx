import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProfileAdmin = () => {
    const [showImage, setShowImage] = useState(true)
    const [showName, setShowName] = useState(true)
    const [showDescription, setShowDescription] = useState(true)
    const [changed, setChanged] = useState(false)
    const { admin } = useAuthContext()

    const {data, loading, error, hasChanged, setHasChanged} = useFetch("https://tocaya-server-production.up.railway.app/profile")

    const [tempProfile, setTempProfile] = useState({
        name: data ? data[0].name : "",
        description: data ? data[0].description : "",
        profilePicture: data ? data[0].profilePicture : undefined
    })
    const [oldFile, setOldFile] = useState("")

    const handleSubmit = async (e:React.FormEvent) => {        
        e.preventDefault()
        const formData = new FormData();
        formData.append('id', data[0]._id)
        formData.append('name', tempProfile.name);
        formData.append('description', tempProfile.description);
        formData.append('oldFileName', oldFile)
        if(JSON.stringify(tempProfile.profilePicture) !== JSON.stringify(oldFile)) {
            formData.append('profilePicture', tempProfile.profilePicture);
        }else {
            formData.append('profilePicture', "");
        }

        const response = await fetch('https://tocaya-server-production.up.railway.app/profile', {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${admin.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }else if(response.ok){
            setShowImage(true)
            setShowName(true)
            setShowDescription(true)
            if(setHasChanged)setHasChanged(!hasChanged)
            setTempProfile({
                name: data ? data[0].name : "",
                description: data ? data[0].description : "",
                profilePicture: data ? data[0].profilePicture : undefined
            })
            console.log('Profile updated correctly', json.profile)
        }
    }

    return (
        <section className="profile-admin">
            <div className="profile-admin__title bg-cyan-500 p-4">
                <h2 className="text-3xl">Perfil</h2>
            </div>
            <div className="profile-admin-container p-4">
                {error && <div>Error: {error}</div> }
                {loading && <div>Loading...</div> }
                {data && 
                <form onSubmit={handleSubmit} className="bg-zinc-200 mb-4 p-4 flex flex-col gap-2">
                    <div className="profile-image flex flex-wrap gap-2 justify-center">
                        {showImage ? (
                            <div className='flex gap-4 items-center'>
                                <img 
                                    src={`https://tocaya-server-production.up.railway.app/images/${data[0].profilePicture.filename}`} 
                                    alt="profile picture"
                                    className='max-h-40 rounded-full' />
                                <i 
                                    className="fa-solid fa-pen hover:cursor-pointer" 
                                    onClick={() => {
                                        setOldFile(data[0].profilePicture.filename)
                                        setShowImage(false)}}/>
                            </div>
                        ):(
                            <div className='flex gap-4 items-center'>
                                <input 
                                    type="file" 
                                    name="profilePicture" 
                                    id="profile-picture" 
                                    className='w-8/12' 
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                        setTempProfile({
                                            ...tempProfile,
                                            profilePicture: e.target.files?.[0]})}} />
                                <i className="fa-solid fa-xmark hover:cursor-pointer" onClick={() => setShowImage(true)}/>
                            </div>
                        )}  
                    </div>
                    <div className="profile-name flex flex-col sm:flex-row flex-wrap gap-2 items-center mx-auto">
                        <label className='font-bold'>Nombre: </label>
                        {showName ? (
                            <div className='flex gap-4'>
                                <p>{data[0].name}</p>
                                <i 
                                    className="fa-solid fa-pen hover:cursor-pointer" 
                                    onClick={() => {
                                        setTempProfile({
                                            ...tempProfile,
                                            name: data[0].name})
                                        setShowName(false)}}/>
                            </div>
                        ):(
                            <div className='flex gap-4 items-center justify-center'>
                                <input 
                                    type="text" 
                                    name='name' 
                                    value={tempProfile.name} 
                                    className='w-8/12' 
                                    onChange={(e) => {
                                        setTempProfile({
                                            ...tempProfile,
                                            name: e.target.value})}}/>
                                <i 
                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                onClick={() => {
                                    setShowName(true)}}/>
                            </div>
                        )}                        
                    </div>
                    <div className="profile-about flex flex-wrap gap-2 justify-center">
                        <label className='font-bold'>Sobre mí: </label>
                        {showDescription ? (
                            <div className='flex items-center gap-4 max-w-xl'>
                                <p className='text-justify whitespace-pre-line'>{data[0].description}</p>
                                <i 
                                    className="fa-solid fa-pen hover:cursor-pointer" 
                                    onClick={() => {
                                        setTempProfile({
                                            ...tempProfile,
                                            description: data[0].description})
                                        setShowDescription(false)}}/>
                            </div>
                        ):(
                            <div className='flex gap-4 items-center justify-center'>
                                <textarea 
                                    name="description" 
                                    value={tempProfile.description} 
                                    cols={30} rows={5} 
                                    className='w-8/12' 
                                    onChange={(e) => {
                                        setTempProfile({
                                            ...tempProfile,
                                            description: e.target.value})}} />
                                <i 
                                className="fa-solid fa-xmark hover:cursor-pointer" 
                                onClick={() => {
                                    setShowDescription(true)}}/>
                            </div>
                        )}   
                    </div>
                    <button 
                        className='bg-cyan-500 w-3/12 mx-auto mt-4 min-w-min p-2 rounded-md' 
                        type='submit'
                        onClick={ () => setChanged(!changed)}> 
                            Actualizar 
                    </button>
                </form>
                }
            </div>
        </section>
    )
}

export default ProfileAdmin