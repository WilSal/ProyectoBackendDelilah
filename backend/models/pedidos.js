const Sequelize = require('sequelize');
const {stringConnection} = require('../database');

const sequelize = new Sequelize (stringConnection());

const Pedido = {};

Pedido.obtenerPedidos = async () => {
    const result = await sequelize.query(
        'SELECT e.descripcion Estado, o.fecha_creacion Hora, op.id_orden Numero, CONCAT(op.cantidad, " x ", p.nombre) Producto, f.descripcion FormaPago, op.total Valor, u.usuario Usuario, u.direccion, u.telefono, u.correo  FROM productos p, formas_pago f, estados e, usuarios u, ordenes o, ordenes_productos op WHERE u.id = o.id_usuario AND op.id_orden = o.id AND op.id_producto = p.id AND f.id = o.id_forma_pago AND e.id = o.id_estado ORDER BY op.id_orden',{
            type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}

Pedido.crearEncabezadoPedido = async (usuario, forma) => {
    const d = new Date();
    const dateNow = `${d.getFullYear()  }-${  d.getMonth() + 1  }-${  d.getDate()  } ${  d.getHours()  }:${  d.getMinutes()  }:${  d.getSeconds()}`;
    await sequelize.query(
    'INSERT INTO ordenes(id_usuario, id_forma_pago, id_estado, fecha_creacion, fecha_actualizacion) VALUES (?,?,?,?,?)',{
        replacements: [usuario, forma, '1', dateNow, dateNow] 
    });

    const result = await sequelize.query(
        'SELECT id FROM ordenes WHERE id_usuario = ? AND fecha_creacion = ?', {
            replacements: [usuario, dateNow], type: sequelize.QueryTypes.SELECT
        });
    return result;
}

Pedido.crearDetallePedido = async (idOrden, idProducto, cantidad, total) => {
    const result = await sequelize.query(
    'INSERT INTO ordenes_productos(id_orden, id_producto, cantidad, total) VALUES (?,?,?,?)',{
        replacements: [idOrden, idProducto, cantidad, total] 
    });
    return result;
}

Pedido.obtenerPedidosUsuario = async (user) => {
    const result = await sequelize.query(
        'SELECT e.descripcion Estado, o.fecha_creacion Hora, op.id_orden Numero, CONCAT(op.cantidad, " x ", p.nombre) Producto, f.descripcion FormaPago, op.total Valor, u.usuario Usuario, u.direccion, u.telefono, u.correo FROM productos p, formas_pago f, estados e, usuarios u, ordenes o, ordenes_productos op WHERE u.id = o.id_usuario AND op.id_orden = o.id AND op.id_producto = p.id AND f.id = o.id_forma_pago AND e.id = o.id_estado AND u.usuario = ?  ORDER BY op.id_orden',{
           replacements: [user], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}

Pedido.actualizarPedido = async (idPedido, estado) => {
    const result = await sequelize.query(
    'UPDATE ordenes SET id_estado = ? WHERE id = ?',{
        replacements: [estado, idPedido] 
    });
    return result;
}

Pedido.eliminarPedido = async (idPedido) => {
    await sequelize.query(
        'DELETE FROM ordenes_productos WHERE id_orden = ?',{
            replacements: [idPedido] 
        });

    const result = await sequelize.query(
        'DELETE FROM ordenes WHERE id = ?',{
        replacements: [idPedido] 
    });
    return result;
}


module.exports = Pedido;