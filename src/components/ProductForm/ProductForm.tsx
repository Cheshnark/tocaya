

const ProductForm = () => {
    return (
        <form action="submit" className="flex flex-col justify-center gap-4 w-10/12 mx-auto my-4 text-center">
            <h3 className="mt-4 text-4xl">Elige los detalles</h3>
            <label htmlFor="">Tamaño</label>
            <select name="tamaño" id="" className="w-6/12 mx-auto">
                <option value="15x15">15x15</option>
                <option value="30x30">30x30</option>
                <option value="60x60">60x60</option>
            </select>
            <label htmlFor="color">Color del fondo</label>
            <input type="color" id="background-color" name="background-color" className="w-6/12 mx-auto"/>
            <label htmlFor="">Sube la foto de tu mascota</label>
            <input type="file" 
                id="pet-image" 
                name="pet-image" 
                className="w-6/12 mx-auto" />
            <label htmlFor="">Comentarios</label>
            <textarea name="comentas" id="coments" cols={25} rows={5} className="border-2 border-green-200 bg-green-50"></textarea>
            <button className="w-6/12 mx-auto py-2 px-4 my-4 bg-green-200 rounded-lg hover:bg-green-300 cursor-pointer hover:scale-105 transition-all">Pedir perrete!</button>
        </form>
    )
}

export default ProductForm