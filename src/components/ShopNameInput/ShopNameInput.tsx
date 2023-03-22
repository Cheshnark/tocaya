interface Props {
    tempProductName: string,
    setTempProductName: React.Dispatch<React.SetStateAction<string>>,
    setShowNameInput: React.Dispatch<React.SetStateAction<boolean>>,
    createProduct: () => void,
}

const ShopNameInput = (props:Props) => {
    const {
        tempProductName,
        setTempProductName,
        setShowNameInput,
        createProduct
    } = props

    return (
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                        onClick={ () => createProduct()} />
                </div>
            </div>
        </div>
    )
}

export default ShopNameInput