const Sequelize = require('sequelize');
const {stringConnection} = require('../database');

const sequelize = new Sequelize (stringConnection());

const Usuario = {};

Usuario.obtenerUsuarios = async () => {
    const result = await sequelize.query(
        'SELECT id, usuario, nombre, apellido, correo, telefono, direccion FROM usuarios WHERE estado = 1',{
            type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
};

Usuario.obtenerUsuarioCreacion = async (usuario) => {
    const result = await sequelize.query(
        'SELECT usuario, nombre, apellido, correo, telefono, direccion FROM usuarios WHERE usuario = ?',{
            replacements: [usuario], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
};

Usuario.obtenerUsuarioId = async (usuario) => {
    const result = await sequelize.query(
        'SELECT id FROM usuarios WHERE usuario = ?',{
            replacements: [usuario], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
};

Usuario.obtenerUsuario = async (usuario) => {
    const result = await sequelize.query(
        'SELECT usuario, nombre, apellido, correo, telefono, direccion FROM usuarios WHERE usuario = ? AND estado = 1',{
            replacements: [usuario], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
};

Usuario.obtenerUsuarioLogin = async (usuario, pwd) => {
    const result = await sequelize.query(
        'SELECT usuario, nombre, apellido, correo, telefono, direccion, tipo FROM usuarios WHERE usuario = ? AND estado = 1 AND contrasena = ?',{
            replacements: [usuario, pwd], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
};

Usuario.obtenerTipo = async(usuario) => {
    const result = await sequelize.query(
        'SELECT tipo FROM usuarios WHERE usuario = ? AND estado = 1',{
            replacements: [usuario], type: sequelize.QueryTypes.SELECT
        }
    );
    return result;
}

Usuario.crearUsuario = async (usuario, contrasena, nombre, apellido, correo, telefono, direccion) => {
    const result = await sequelize.query(
    'INSERT INTO usuarios(usuario, contrasena, nombre, apellido, correo, telefono, direccion) VALUES (?,?,?,?,?,?,?)',{
        replacements: [usuario, contrasena, nombre, apellido, correo, telefono, direccion] 
    });
    return result;
}

Usuario.actualizarUsuario = async (usuario, contrasena, nombre, apellido, correo, telefono, direccion, tipo) => {
    const result = await sequelize.query(
    'UPDATE usuarios SET contrasena = ?, nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, tipo = ? WHERE usuario = ?',{
        replacements: [contrasena, nombre, apellido, correo, telefono, direccion, tipo, usuario] 
    });
    return result;
}

Usuario.eliminarUsuario = async (usuario) => {
    const result = await sequelize.query(
    'UPDATE usuarios SET estado = 0 WHERE usuario = ?',{
        replacements: [usuario] 
    });
    return result;
}

module.exports = Usuario;