const {obtenerPedidos, crearEncabezadoPedido, crearDetallePedido, obtenerPedidosUsuario, actualizarPedido, eliminarPedido} = require('../models/pedidos');
const {obtenerUsuarioId} = require('../models/usuarios');
const Pedido = require('../models/pedidos');

const pedidosCtrl = {};

pedidosCtrl.getPedidos = async () => {
    const result = await obtenerPedidos();
    return result;
}

pedidosCtrl.postPedido = async (req) => {
    const {usuario, forma, total, productos} = req; // PRODUCTOS ID Y CANTIDAD

    if (usuario && forma && total && productos.length > 0) {
        const idUser = await obtenerUsuarioId(usuario);
        const idOrden = await crearEncabezadoPedido(idUser[0].id, forma);
        const result = [];
        for (let i = 0; i < productos.length; i += 1) {
            const element = productos[i];
            result.push(crearDetallePedido(idOrden[0].id, element.id, element.cantidad, total));
        }
        await Promise.all(result);
        return 'Pedido Creado';
    }
    return 'Información incorrecta';
}

pedidosCtrl.getUsuarioxPedido = async(req) =>{
    const result = await obtenerPedidosUsuario(req);
    return result;
}

pedidosCtrl.putPedido = async(pedido, estado) => {
    if (pedido && estado) {
        await actualizarPedido(pedido, estado);
        return 'Pedido actualizado';
    }
    return 'Información incorrecta';
}

pedidosCtrl.delPedido = async(pedido) => {
    if (pedido) {
        await eliminarPedido(pedido);
        return 'Pedido eliminado';
    }
    return 'Información incorrecta';
}

module.exports = pedidosCtrl;