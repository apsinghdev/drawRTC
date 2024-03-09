// server file
import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {origin: '*'}
});
const PORT = 8000;

app.use(cors({origin: '*'}))

app.get('/', (req, res)=>{
    console.log('running')
})

io.on('connection', (socket)=>{
    console.log('user connected socket')
})

server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})