const { Router } = require('express');
const {getUsuarios, postUsuario, putUsuario, deleteUsuario, getUserLogin} = require('../controllers/usuarios.controller');
const {token, verify, isAdmin} = require('../middlewares/jwt');


const router = Router();

router.route('/')
 .get(verify, isAdmin, async (req, res) => {
   res.json({
      users: await getUsuarios()    
   });
 })
 .post(async(req, res) => {
    const result = await postUsuario(req.body)
    res.json(result);
 })
 .put(verify, async(req, res) => {
   const result = await putUsuario(req.body, req.query.usuario)
   res.json(result);
 })
 .delete(verify, async(req, res) => {
   const result = await deleteUsuario(req.query.usuario)
    res.json(result);
 });

router.route('/login')
 .post( async(req, res) => {
   try {
    const result = await getUserLogin(req.body.usuario, req.body.contrasena);
    res.json({
        'auth': true,
        'token code': await token(result)
      });
  } catch {
    res.status(401).json('Usuario y/o contraseña invalidos.');
  }
});

module.exports = router;
