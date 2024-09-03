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

app.get('/', ()=>{
    console.log('running')
})

app.get('/test', (res) => {
    res.send(JSON.stringify({ok: true}));
})

io.on('connection', (socket) => {

    socket.on('joinRoom', ({room_id}) => {
        socket.join(room_id);
        console.log(`User ${socket.id} joined room ${room_id}`);
    })

    socket.on('draw', (data)=>{
        const room = data.room_id;
        socket.to(room).emit('draw', data);
    })

    socket.on('clear', (data) => {
        const room = data.room_id;
        socket.to(room).emit('clear');
    })

    socket.on('open-text-editor', data => {
        const room = data.room_id;
        socket.to(room).emit("open-text-editor", data);
    })

    socket.on('close-text-editor', data => {
        const room = data.room_id;
        socket.to(room).emit("close-text-editor", data);
    })
    
    socket.on("text-updated", (data) => {
        const room = data.room_id;
        socket.to(room).emit("text-updated", data);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    })
})

server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})