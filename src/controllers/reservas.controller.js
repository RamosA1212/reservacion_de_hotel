import { json } from "express"
import { conn } from "../db.js"

export const getReservas = async (req, res) => {
    
    try {
        const [rows] = await conn.query('SELECT * FROM reservas')
        res.send(rows)
        
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
        
    }

}

export const getReserva = async (req, res) => {
    const codigo= req.params['codigo']
    

    try {
        const [rows] = await conn.query('SELECT * FROM reservas WHERE codigo=?',[codigo])
        res.send(rows)
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
    }
    

}

export const createReserva = async (req, res) => {
    const {codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida} = req.body;
    console.log(req.body)
    try {
        const [rows] = await conn.query('INSERT INTO reservas (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?,?,?,?,?,?)', [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida])
        console.log(req.body)
        console.log(rows)
        res.status(201).json({message: 'Reserva creada'})
    } catch (error) {

        res.status(500).json({message:'Ha ocurrido un Error'})
        
    }
}

export const deleteReserva = async (req, res) => {
    const codigo= req.params['codigo']
    console.log(JSON.stringify(codigo))

    try {
        const [rows] = await conn.query('DELETE FROM reservas WHERE codigo=?',[codigo])
        if (rows.affectedRows<=0)return res.status(404).json({
            message:'Habitacion no encontrada'
        })
        res.status(201).json({message: 'Reserva eliminada'})
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
    }
    

}

export const updateReseva = async (req, res) => {
    const {codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida}= req.body ;
    const codigo= req.params['codigo']
    try {
    const [result] =  await conn.query('UPDATE reservas SET codigo_habitacion=IFNULL(?,codigo_habitacion), nombre_cliente=IFNULL(?,nombre_cliente), telefono_cliente=IFNULL(?,telefono_cliente), fecha_reservacion=IFNULL(?,fecha_reservacion), fecha_entrada=IFNULL(?,fecha_entrada), fecha_salida=IFNULL(?,fecha_salida) WHERE codigo=?',[codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida,codigo])
    if (result.affectedRows<=0) return res.status(404).json ({
        message : 'habitacion no encontrado'
    })
     
     
    res.status(201).json({message: 'Reserva actualizada'})

        
    }catch (error) {
        res.status(500).json({message:'Ha ocurrido un Error'})
    }
    
    
}