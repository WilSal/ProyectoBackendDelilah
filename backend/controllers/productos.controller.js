const {obtenerProductos, obtenerProductoCreacion, crearProducto, obtenerProducto, actualizarProducto, eliminarProducto} = require('../models/productos');
/* getProductos, postProducto, puProducto, deleteProducto */
const productosCtrl = {};

productosCtrl.getProductos = async () => {
    const result = await obtenerProductos();
    return result;
}

productosCtrl.postProducto = async (req) => {
    const {nombre, descripcion, precioUnidad, pathImagen} = req;
    if(nombre && descripcion && precioUnidad && pathImagen) {
        const result = await obtenerProductoCreacion(nombre);
        if (result.length === 0){
            await crearProducto(nombre, descripcion, precioUnidad, pathImagen);
            return 'Producto Creado';
        }
        return 'Producto ya existe';
    }
    return 'Información incorrecta';
};

productosCtrl.putProducto = async (req, id) => {
    const {nombre, descripcion, precioUnidad, pathImagen} = req;
    if(id && nombre && descripcion && precioUnidad && pathImagen) {
        const result = await obtenerProducto(id);
        if (result.length === 1){
            await actualizarProducto(nombre, descripcion, precioUnidad, pathImagen, id);
            return 'Producto actualizado';
        }
        return 'Producto no existe';
    }
    return 'Información incorrecta';
};

productosCtrl.deleteProducto = async (id) => {
    if(id) {
        const result = await obtenerProducto(id);
        if (result.length === 1){
            await eliminarProducto(id);
            return 'Producto eliminado';
        }
        return 'Producto no existe';
    }
    return 'Información incorrecta';
};

module.exports = productosCtrl;