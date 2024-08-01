import { io } from "socket.io-client";

const PORT = "http://localhost:8000";

const socket = io(PORT);

export default socket;