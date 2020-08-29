# Proyecto 3 - *DWFS* - Delilah
> El presente documento explica los puntos más importante para el proyecto. Este proyecto es una *web api* en **Nodejs**.

## Inicializar proyecto
A continuacion se enseñara los pasos que se deben realizar para que el proyecto funcione de una forma correcta.


### 1. Instalación de librerias.
Ejecutar la siguiente linea:
```bash
npm install
```
### 2. Configuración de la base de datos.
#### 2.1. Crear base datos
Tener un hosting con mysql, tener presentes el usuario, contraseña y tener creado una base de datos con el nombre que desee, en esta guia usaremos el nombre de *master_wilfer*

#### 2.2. Ingresar datos de la base de datos en la aplicación
En el archivo database.js (Ruta:../Proyectos_3_Delilah/backend) debe reemplazar las variables usuario, constraseña, url, puerto y nombre de la base de datos:

```javascript
connection.stringConnection = () => {
    return 'mysql://usuario:clave@url:puerto/baseDeDatos';
}
```

Ejemplo:
```javascript
connection.stringConnection = () => {
    return 'mysql://master:pruebaclase@automosaiko.tk:3306/master_wilfer';
}
```
### 3. Comando de iniciación
Abrir una terminal, ubicarse en la carpeta raíz del proyecto y ejecutar el siguiente comando:
```bash
npm run dev
```
## 4. Peticiones HTTP REST
En este ejemplo se uso la herramienta **postman**, en la carpeta backend se encuentra el archivo **Proyecto3 Delilah.postman_collection.json** (*RUTA: Proyectos_3_Delilah/backend/Proyecto3 Delilah.postman_collection.json*) exportado del postman con las peticiones HTTP que se usaron, se puede usar este json para importarlo al postman local.
Para el proyecto se uso Web Tokens, para poder validar que el usuario tenga los permisos necesarios al realizar la peticion HTTP REST.

---
## Modelo base de datos
Ejecutar los scripts para la creación de la base de datos
### Tabla Usuario
Información del usuario.
```sql
CREATE TABLE usuarios (
  id int(11) NOT NULL,
  usuario varchar(30) NOT NULL,
  nombre varchar(60) NOT NULL,
  apellido varchar(60) NOT NULL,
  correo varchar(100) NOT NULL,
  telefono varchar(30) NOT NULL,
  direccion varchar(100) NOT NULL,
  contrasena varchar(200) NOT NULL,
  estado tinyint(1) NOT NULL DEFAULT '1',
  tipo varchar(4) NOT NULL DEFAULT 'user'
);
```
*Los tipos de usuarios admitidos por la aplicación son: **admi** o **user***
### Tabla Estados de la Orden
Información de los estados de la orden
```sql
CREATE TABLE estados (
  id int(2) NOT NULL,
  descripcion varchar(60) NOT NULL
);
```
*Ejemplos de estados de orden:*
```sql
INSERT INTO `estados` (`id`, `descripcion`) VALUES
(1, 'Nuevo'),
(2, 'Confirmado'),
(3, 'Preparando'),
(4, 'Enviando'),
(5, 'Cancelado'),
(6, 'Entregado');
```

### Tabla Formas de pago
Información de las formas de pago de las ordenes.
```sql
CREATE TABLE formas_pago (
  id int(2) NOT NULL,
  descripcion varchar(100) NOT NULL
);
```
*Ejemplos de formas de pago:*
```sql
INSERT INTO formas_pago (id, descripcion) VALUES
(1, 'Efectivo'),
(2, 'Datafono'),
(3, 'PSE');
```
### Tabla de productos
Información de los productos.
```sql
CREATE TABLE productos (
  id int(11) NOT NULL,
  nombre varchar(200) NOT NULL,
  descripcion varchar(300) NOT NULL,
  precio_unidad float NOT NULL,
  path_imagen varchar(300) DEFAULT NULL
);
```

### Tabla Encabezado de las Ordenes
Infomación principal de las ordenes.
```sql
CREATE TABLE ordenes (
  id int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  id_forma_pago int(11) NOT NULL,
  id_estado int(11) NOT NULL,
  fecha_creacion datetime NOT NULL,
  fecha_actualizacion datetime NOT NULL
);
```

### Tabla Detalle de las Ordenes
Información secundaria de las ordenes.
```sql
CREATE TABLE ordenes_productos (
  id int(11) NOT NULL,
  id_orden int(11) NOT NULL,
  id_producto int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  total float NOT NULL
);
```
### Indices de las tablas
Los siguientes comando definen los indices, auto increment y restricciones que manejara la base de datos y sus respectivas relaciones entre tablas.
```sql

-- Índices para tablas volcadas

--
-- Indices de la tabla `estados`
--
ALTER TABLE estados
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla `formas_pago`
--
ALTER TABLE formas_pago
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE ordenes
  ADD PRIMARY KEY (id),
  ADD KEY id_usuario (id_usuario),
  ADD KEY id_forma_pago (id_forma_pago),
  ADD KEY id_estado (id_estado);

--
-- Indices de la tabla `ordenes_productos`
--
ALTER TABLE ordenes_productos
  ADD PRIMARY KEY (id),
  ADD KEY id_orden (id_orden),
  ADD KEY id_producto (id_producto);

--
-- Indices de la tabla `productos`
--
ALTER TABLE productos
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

-- AUTO_INCREMENT de las tablas volcadas

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE estados
  MODIFY id int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla formas_pago
--
ALTER TABLE formas_pago
  MODIFY id int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE ordenes
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `ordenes_productos`
--
ALTER TABLE ordenes_productos
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE productos
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE usuarios
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

-- Restricciones para tablas volcadas

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE ordenes
  ADD CONSTRAINT ordenes_ibfk_1 FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT ordenes_ibfk_2 FOREIGN KEY (id_estado) REFERENCES estados (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT ordenes_ibfk_3 FOREIGN KEY (id_forma_pago) REFERENCES formas_pago (id) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordenes_productos`
--
ALTER TABLE ordenes_productos
  ADD CONSTRAINT ordenes_productos_ibfk_1 FOREIGN KEY (id_orden) REFERENCES ordenes (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT ordenes_productos_ibfk_2 FOREIGN KEY (id_producto) REFERENCES productos (id) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;
```
---

