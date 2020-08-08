// IMPORTAR LIBRERIAS
const express = require('express');
const morgan = require('morgan'); // MUESTRA LA PETICION QUE SE HIZO AL SERVIDOR Y SU RESPUESTA MAS DETALLADA

// INICIALIZACION
const app = express();

// MIDDLEWARE
app.use(express.urlencoded({extended:false})) // CONVERTIR LAS PETICIONES EN JSON - ENTENDER LOS FORMULARIOS Y CONVERTIRLOS EN JS
app.use(express.json()); // NOS AYUDA A INTERPRETAR ARCHIVOS JSON
app.use(morgan('dev')); // USAR MORGAN MODO DEVELOP

// CONFIGURACION
app.set('port', 3001);

// ROUTES
app.use('/api/usuarios', require('./routes/usuarios.route'));

app.use('/api/productos', require('./routes/productos.route'));

app.use('/api/pedidos', require('./routes/pedidos.route'));

// INICIAR SERVIDOR (PUERTO, IMPRIMIR EN COSOLA QUE ESTA 'ESCUCHANDO' EN EL PUERTO CONFIGURADO)
app.listen(app.get('port'), () => { console.log(`Servidor escuchando en el puerto ${app.get('port')}`); });
