import { json } from "express"
import { conn } from "../db.js"
import jwt from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from "cookie-parser";

export const getCliente = async (req, res) => {

    try {
        const [cliente] = await conn.query('SELECT * FROM Usuarios')
        res.send(cliente)

    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' })

    }

}
export const crearCliente = async (req, res) => {
    const { username, contraseña, rol } = req.body;
    try {
        const [clienteEx] = await conn.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        if (clienteEx.length > 0) {
            return res.status(400).json({ error: 'El cliente ya existe' });
        }
        const [cliente] = await conn.query('INSERT INTO usuarios (username, contraseña, rol) VALUES (?, ?, ?)', [username, contraseña, rol]);
        res.json({ id: cliente.insertId, mensaje: 'Cliente registrado' });
    } catch (error) {     
        return res.status(500).json({ error: 'Error del servidor' });
    }
};

export const ingresar = async (req, res) => {
    const { username, contraseña } = req.body;
    try {
        const [cliente] = await conn.query('SELECT * FROM usuarios WHERE username = ? AND contraseña = ?', [username, contraseña]);

         if (cliente.length === 0) {
             return res.status(401).json({ error: 'informacion incorrecta' });
         }
        const token = jsonwebtoken.sign({ id: cliente[0].id, username: cliente[0].username, rol: cliente[0].rol }, 'palabrasecreta', { expiresIn: '2m' });
        res.cookie('token', token, { httpOnly: true,sameSite: 'None', secure: true});
        res.send(token);
    } catch (error) {
        return res.status(500).json({ error: 'Error del servidor' });
    }
};



export const verificarToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado.' });
    }
    try {
        jwt.verify(token, 'palabrasecreta', (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token erroneo' });
            } else {
                req.username = decoded;
                req.rol = decoded.rol;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Acceso no autorizado' });
    }
};

export const renovarToken = async (req,res)=>{
    try {
        const cliente = req.username; 
        const nuevoToken = jsonwebtoken.sign(cliente, 'palabrasecreta');
        res.cookie('token', nuevoToken, { httpOnly: true, sameSite: 'None', secure: true });
        res.json({ token: nuevoToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al renovar' });
    }

};