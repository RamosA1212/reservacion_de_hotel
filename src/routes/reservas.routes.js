    import { Router } from "express";
    import { getReservas, getReserva, createReserva, deleteReserva,updateReseva } from "../controllers/reservas.controller.js";

    const router=Router()

    //Reservas

    router.get('/reservas',getReservas)
    router.get('/reserva/:codigo',getReserva)
    router.post('/reservar',createReserva)
    router.delete('/reserva/:codigo',deleteReserva)
    router.patch('/reserva/:codigo', updateReseva)




    export default  router