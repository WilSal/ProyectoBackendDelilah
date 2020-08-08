const {obtenerUsuarios, obtenerUsuarioCreacion, obtenerTipo, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarioLogin} =  require('../models/usuarios');

const usuariosCtrl = {};

usuariosCtrl.getUsuarios = async () => {
    const result = await obtenerUsuarios();
    return result;
}

usuariosCtrl.postUsuario = async (req) => {
    const {usuario, contrasena, nombre, apellido, correo, telefono, direccion} = req;
    if(usuario && nombre && apellido && correo && telefono && direccion && contrasena) {
        const result = await obtenerUsuarioCreacion(usuario);
        if (result.length === 0){
            await crearUsuario(usuario, contrasena, nombre, apellido, correo, telefono, direccion);        
            return 'Usuario Creado';
        }
        return 'Usuario ya existe';
    }
    return 'Información incorrecta';
};

usuariosCtrl.getTipo = async (usuario) => {
    if(usuario) {
        const result = await obtenerTipo(usuario);
        if (result.length === 1){            
            return result;
        }
        throw new Error('Usuario no existe');
    }
    throw new Error('Información incorrecta');
}

usuariosCtrl.getUserLogin = async (user, pwd) => {
    if(user && pwd) {
        const usuario = await obtenerUsuarioLogin(user, pwd);
        if (usuario){            
            return usuario[0];
        }
        return 'Usuario no existe';
    }
    return 'Información incorrecta';
}

usuariosCtrl.putUsuario = async (req, usuario) => {
    const {contrasena, nombre, apellido, correo, telefono, direccion, tipo} = req;
    if(usuario && nombre && apellido && correo && telefono && direccion && contrasena && tipo) {
        const result = await obtenerUsuario(usuario);
        if (result.length === 1){
            await actualizarUsuario(usuario, contrasena, nombre, apellido, correo, telefono, direccion, tipo);
            return 'Usuario actualizado';
        }
        return 'Usuario no existe';
    }
    return 'Información incorrecta';
};

usuariosCtrl.deleteUsuario = async (usuario) => {
    if(usuario) {
        const result = await obtenerUsuario(usuario);
        if (result.length === 1){
            await eliminarUsuario(usuario);
            return 'Usuario eliminado';
        }
        return 'Usuario no existe';
    }
    return 'Información incorrecta';
};

module.exports = usuariosCtrl;