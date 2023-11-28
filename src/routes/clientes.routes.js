import { Router } from "express";
import { getCliente, ingresar,crearCliente,renovarToken,verificarToken } from "../controllers/clientes.controller";


const router=Router()

router.post('/registrarse',crearCliente);
router.get('/ingresar', ingresar);




export default router