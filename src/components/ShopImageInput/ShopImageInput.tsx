interface Props {
    setTempPicture: React.Dispatch<React.SetStateAction<Blob | undefined>>,
    setShowImageInput: React.Dispatch<React.SetStateAction<boolean>>,
    addProductPicture: (sectionId:string) => void,
    tempId: string
}


const ShopImageInput = (props:Props) => {
    const {
        setTempPicture,
        setShowImageInput,
        addProductPicture,
        tempId
    } = props

    return (
        <div className="section-name-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
            <div className="section-name-input-content flex flex-col">
                <h3 className='text-white text-center text-2xl font-bold mb-4'>Elige una imagen que subir</h3>
                <div className="input-content__form flex justify-center items-center gap-4">
                    <input 
                        type="file" 
                        name='productPicture' 
                        autoComplete="off"
                        className='w-6/12 outline-none p-2 rounded-md bg-white' 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setTempPicture(e.target.files?.[0])
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
    )
}

export default ShopImageInput