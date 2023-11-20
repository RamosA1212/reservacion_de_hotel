import { json } from "express"
import { conn } from "../db.js"

export const getHabitaciones = async (req, res) => {
    
    try {
        const [rows] = await executeQuery('SELECT * FROM habitaciones')
        res.send(rows)
        
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
        
    }

}

export const getHabitacion = async (req, res) => {
    const codigo= req.params['codigo']
    console.log(JSON.stringify(codigo))

    try {
        const [rows] = await conn.query('SELECT * FROM habitaciones WHERE codigo=?',[codigo])
        res.send(rows)
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
    }
    

}

export const createHabitacion = async (req, res) => {
    const {numero,tipo,valor} = req.body;

    try {
        const [rows] = await conn.query('INSERT INTO habitaciones (numero,tipo,valor) VALUES (?,?,?)', [numero,tipo,valor])
        console.log(req.body)
        console.log(rows)
        res.status(201).json({message: 'Habitacion crada'})
    } catch (error) {

        res.status(500).json({message:'Ha ocurrido un Error'})
        
    }
}

export const updateHabitacion = async (req, res) => {
    const { numero , tipo , valor}= req.body ;
    const codigo= req.params['codigo']
    try {
    const [result] =  await conn.query('UPDATE habitaciones SET numero=IFNULL(?,numero),tipo=IFNULL(?,tipo),valor=IFNULL(?,valor) WHERE codigo=?',[numero,tipo,valor,codigo])
    if (result.affectedRows<=0) return res.status(404).json ({
        message : 'habitacion no encontrada'
    })
     
     
    res.status(201).json({message: 'Habitacion actualizada'})

        
    }catch (error) {
        res.status(500).json({message:'Ha ocurrido un Error'})
    }
    
    
}

export const deleteHabitacion = async (req, res) => {
    const codigo= req.params['codigo']
    console.log(JSON.stringify(codigo))

    try {
        const [rows] = await conn.query('DELETE FROM habitaciones WHERE codigo=?',[codigo])
        if (rows.affectedRows<=0)return res.status(404).json({
            message:'Habitacion no encontrada'
        })
        res.status(201).json({message: 'Habitacion eliminada'})
    } catch (error) {
        res.status(500).json({message:'Ha ocurrido un error'})
    }
    

}

