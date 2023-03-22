interface Props {
    tempBackgroundName: string,
    setTempBackgroundName: React.Dispatch<React.SetStateAction<string>>,
    tempBackground: string,
    setTempBackground: React.Dispatch<React.SetStateAction<string>>,
    setShowBackgroundInput: React.Dispatch<React.SetStateAction<boolean>>,
    addItem: (sectionId:string, section:string) => void,
    tempId:string

}

const ShopBackgroundInput = (props:Props) => {
    const {
        tempBackgroundName,
        setTempBackgroundName,
        tempBackground,
        setTempBackground,
        setShowBackgroundInput,
        addItem,
        tempId
    } = props

    return (
        <div className="background-color-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
            <div className="background-color-input-content flex flex-col">
                <h3 className='text-white text-center text-2xl font-bold mb-4'>Introduce un nuevo color</h3>
                <div className="input-content__form flex justify-center items-center gap-4">
                    <div className="input-content__form-inputs flex flex-col gap-2 items-end">
                        <input 
                            type="text" 
                            name='backgroundColorName' 
                            value={tempBackgroundName} 
                            autoComplete="off"
                            placeholder='Nombre'
                            className='w-10/12 outline-none p-2 rounded-md' 
                            onChange={(e) => {
                                setTempBackgroundName(e.target.value)
                            }}/>
                        <input 
                            type="text" 
                            name='backgroundColorHex' 
                            value={tempBackground} 
                            autoComplete="off"
                            placeholder='Código hex'
                            className='w-10/12 outline-none p-2 rounded-md' 
                            onChange={(e) => {
                                setTempBackground(e.target.value)
                            }}/>
                    </div>
                    <i 
                    className="fa-solid fa-xmark text-white hover:cursor-pointer" 
                    onClick={() => {
                        setShowBackgroundInput(false)
                        setTempBackgroundName("")
                        setTempBackground("")}}/>
                    <i 
                        className="fa-solid fa-arrow-up-from-bracket text-white hover:cursor-pointer"
                        onClick={ () => addItem(tempId, "background")} />
                </div>
            </div>
        </div>
    )
}

export default ShopBackgroundInput