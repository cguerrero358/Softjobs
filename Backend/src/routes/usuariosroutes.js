// las rutas
const express = require("express");
const {
  registrarUsuario,
  verificarCredenciales,
  getUsuarios,
} = require("../controllers/usuarioscontrollers");
const {
  authMiddleware,
  reportarConsulta,
} = require("../middleware/authmiddleware");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/usuarios", reportarConsulta, async (req, res) => {
  try {
    const usuario = req.body; 
    await registrarUsuario(usuario); 
    res.send("Usuario registrado con éxito"); 
  } catch (error) {
    res.status(500).send(error); 
  }
});

router.post("/login", reportarConsulta, async (req, res) => {
  try {
    const { email, password } = req.body; 
    await verificarCredenciales(email, password); 
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 600 }); 
    res.json({ token }); 
  } catch (error) {
    console.log(error); 
    res.status(error.code || 500).send(error); 
  }
});

router.get("/usuarios", authMiddleware, reportarConsulta, async (req, res) => {
  try {
    const { email } = req.user; 
    const user = await getUsuarios(email);
    res.status(200).json(user); 
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ message: error.message || "Error en el servidor" });
  }
});

module.exports = router;