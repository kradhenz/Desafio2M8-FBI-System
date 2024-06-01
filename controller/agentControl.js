import path from 'path';
import jwt from 'jsonwebtoken';
import agents from '../data/agentes.js';
import dotenv from 'dotenv';

dotenv.config();
process.loadEnvFile;

const __dirname = import.meta.dirname;
const secretKey = process.env.SECRET_KEY;
/*const filePath = path.resolve('index.html');
res.sendFile(filePath);*/

const homeControl = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

const signinControl = (req, res) => {
    try {
        const { email, password } = req.query;
        const agent = agents.find((agent) => {
            return agent.email === email && agent.password === password;
        });

        let token = jwt.sign({ email }, secretKey, { expiresIn: '2m' });

        agent
            ? res.send(`<p> Agente Autenticado, bienvenido <b>${email}</b>
                Su token está en el sessionStorage</p>
                <a href="/dashboard?token=${token}">Ir al dashboard</a>
                <script>sessionStorage.setItem('token', JSON.stringify('${token}'))</script>`)
            : res.send('No se ha podido autenticar');
    } catch (error) {
        console.log(error.message);
    }
}

const dashControl = (req, res) => {
    try {
        const { token } = req.query;
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                res.status(400).send(`ALERTA ${err.message}`);
            } else {
                res.send(`Bienvenido al Dashboard ${data.email}`);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

export { homeControl, signinControl, dashControl };