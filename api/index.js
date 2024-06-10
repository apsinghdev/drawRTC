// server file
import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from 'cors';
import { YSocketIO } from "y-socket.io/dist/server";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {origin: '*'}
});
const PORT = 8000;

const ysocketio = new YSocketIO(io, {gcEnabled: true});

ysocketio.initialize();

app.use(cors({origin: '*'}))

app.get('/', (req, res)=>{
    console.log('running')
})

io.on('connection', (socket)=>{
    console.log('user connected socket')
    socket.on('draw', (data)=>{
        socket.broadcast.emit('draw', data);
    })
    socket.on('clear', ()=>{
        io.emit('clear');
    })
})

server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})