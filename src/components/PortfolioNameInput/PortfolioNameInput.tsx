interface Props {
    tempSectionName: string,
    setTempSectionName: React.Dispatch<React.SetStateAction<string>>,
    setShowNameInput: React.Dispatch<React.SetStateAction<boolean>>,
    createSection: (e:any) => void
}

const PortfolioNameInput = (props:Props) => {

    const {
        tempSectionName,
        setTempSectionName,
        setShowNameInput,
        createSection
    } = props

    return (
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
    )
}

export default PortfolioNameInput