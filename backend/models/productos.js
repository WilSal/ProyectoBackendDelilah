const Sequelize = require('sequelize');

const {stringConnection} = require('../database');

const sequelize = new Sequelize (stringConnection());

const Producto = {};

Producto.obtenerProductos = async () => {
    const result = await sequelize.query(
        'SELECT id, nombre, descripcion, precio_unidad, path_imagen FROM productos',{
            type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}

Producto.obtenerProductoCreacion = async (producto) => {
    const result = await sequelize.query(
        'SELECT nombre FROM productos WHERE nombre = ?', {
        replacements: [producto], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}

Producto.obtenerProducto = async (id) => {
    const result = await sequelize.query(
        'SELECT id FROM productos WHERE id = ?', {
        replacements: [id], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}


Producto.crearProducto = async (nombre, descripcion, precioUnidad, pathImagen) => {
    const result = await sequelize.query(
    'INSERT INTO productos(nombre, descripcion, precio_unidad, path_imagen) VALUES (?,?,?,?)',{
        replacements: [nombre, descripcion, precioUnidad, pathImagen] 
    });
    return result;
}

Producto.actualizarProducto = async (nombre, descripcion, precioUnidad, pathImagen, id) => {
    const result = await sequelize.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio_unidad = ?, path_imagen = ? WHERE id = ?',{
        replacements: [nombre, descripcion, precioUnidad, pathImagen, id] 
    });
    return result;
}

Producto.eliminarProducto = async (id) => {
    const result = await sequelize.query(
    'DELETE FROM productos WHERE id = ?',{
        replacements: [id] 
    });
    return result;
}

module.exports = Producto;