interface Props {
    tempSize: string,
    setTempSize: React.Dispatch<React.SetStateAction<string>>,
    setShowSizeInput: React.Dispatch<React.SetStateAction<boolean>>,
    addItem: (sectionId:string, section:string) => void,
    tempId: string

}

const ShopSizeInput = (props:Props) => {
    const {
        tempSize,
        setTempSize,
        setShowSizeInput,
        addItem,
        tempId
    } = props

    return (
        <div className="size-input-container flex flex-col justify-center h-screen w-screen fixed z-10 left-0 top-0 overflow-x-hidden bg-black/95">
            <div className="size-input-content flex flex-col">
                <h3 className='text-white text-center text-2xl font-bold mb-4'>Introduce las nuevas medidas</h3>
                <div className="input-content__form flex justify-center items-center gap-4">
                    <input 
                        type="text" 
                        name='size' 
                        value={tempSize} 
                        autoComplete="off"
                        className='w-6/12 outline-none p-2 rounded-md' 
                        onChange={(e) => {
                            setTempSize(e.target.value)
                        }}
                        />
                    <i 
                    className="fa-solid fa-xmark text-white hover:cursor-pointer" 
                    onClick={() => {
                        setShowSizeInput(false)
                        setTempSize("")}}/>
                    <i 
                        className="fa-solid fa-arrow-up-from-bracket text-white hover:cursor-pointer"
                        onClick={() => addItem(tempId, "size")} />
                </div>
            </div>
        </div>
    )
}

export default ShopSizeInput