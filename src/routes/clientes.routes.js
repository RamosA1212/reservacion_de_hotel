import { Router } from "express";
import { ingresar,crearCliente } from "../controllers/clientes.controller.js";


const router=Router()

router.post('/cliente/registrarse',crearCliente);
router.get('/cliente/ingresar', ingresar);




export default router