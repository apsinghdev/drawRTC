// server file
import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 8080;

app.get('/', (req, res)=>{
    console.log('running')
})

io.on('connection', (socket)=>{
    console.log('user connected socket')
})

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})