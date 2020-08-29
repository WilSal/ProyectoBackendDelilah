const { Router } = require('express');
const {verify, isAdmin} = require('../middlewares/jwt');
const {getPedidos, postPedido, getUsuarioxPedido, putPedido, delPedido} = require('../controllers/pedidos.controller');

const router = Router();

router.route('/')
.get(verify, isAdmin, async (req, res) => {
    res.json(await getPedidos());
})
.post(verify, async(req, res) => {
    const result = await postPedido(req.body);
    res.json(result);
})
.put(verify, isAdmin, async (req, res) => {
   const result = await putPedido(req.query.pedido, req.query.estado);
   res.json(result);
 })
.delete(verify, isAdmin, async(req, res) => {
const result = await delPedido(req.query.pedido)
    res.json(result);
});

router.route('/usuario')
.get(verify, async (req, res) => {
    res.json(await getUsuarioxPedido(req.query.usuario));
});

module.exports = router;