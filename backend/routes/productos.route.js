const { Router } = require('express');
const {verify, isAdmin} = require('../middlewares/jwt');
const {getProductos, postProducto, putProducto, deleteProducto} = require('../controllers/productos.controller');

const router = Router();

router.route('/')
 .get(verify, async (req, res) => {
   res.json({
      products: await getProductos()    
   });
 })
 .post(verify, isAdmin, async(req, res) => {
    const result = await postProducto(req.body)
    res.json(result);
 })
 .put(verify, isAdmin, async(req, res) => {
   const result = await putProducto(req.body, req.query.id)
   res.json(result);
 })
 .delete(verify, isAdmin, async(req, res) => {
   const result = await deleteProducto(req.query.id)
    res.json(result);
 });

module.exports = router;