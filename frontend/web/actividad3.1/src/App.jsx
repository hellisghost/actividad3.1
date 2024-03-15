import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = "http://localhost:3000/listarUsuario"; /

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZF91c3VhcmlvIjoxLCJub21icmVzIjoia2V2aW4iLCJhcGVsbGlkb3MiOiJhbmRyYWRlIiwiY29ycmVvIjoiYXMiLCJjb250cmFzZW5hIjoiYXMiLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiZXN0YWRvIjoiYWN0aXZvIn0seyJpZF91c3VhcmlvIjozLCJub21icmVzIjoia2V2aW4iLCJhcGVsbGlkb3MiOiJhbmRyYWRlIiwiY29ycmVvIjoiYXMiLCJjb250cmFzZW5hIjoiYXMiLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiZXN0YWRvIjoiYWN0aXZvIn1dLCJpYXQiOjE3MTA1MjgxMTEsImV4cCI6MTcxMDYxNDUxMX0.GYAqPdCXSMFFNn604O6E-X5X1YQpnXNFxDW4pzEf_Qo";

export default function App() {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (post) {
            alert('Usuario registrado exitosamente!');
            setNombres('');
            setApellidos('');
            setCorreo('');
            setContrasena('');
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(baseURL, {
                nombres: nombres,
                apellidos: apellidos,
                correo: correo,
                contrasena: contrasena
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            setPost(response.data);
        } catch (error) {
            console.error('Error al conectar al servidor:', error);
        }
    };

    return (
        <div className="App">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
