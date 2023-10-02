import { Router } from "express";
import { getHabitaciones, getHabitacion, createHabitacion, updateHabitacion, deleteHabitacion } from "../controllers/habitaciones.controller.js";
const router=Router()

router.get('/habitaciones', getHabitaciones)
router.get('/habitacion/:codigo', getHabitacion)
router.post('/habitacion', createHabitacion)
router.patch('/habitacion/:codigo', updateHabitacion)
router.delete('/habitacion/:codigo', deleteHabitacion)


export default router