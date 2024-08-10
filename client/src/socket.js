import { io } from "socket.io-client";

const PORT =
  "https://draw-rtc-96kr12q0u-ajeet-pratap-singhs-projects.vercel.app/";

const socket = io(PORT);

socket.on("connect", () => {
  console.log("connected");
});

export default socket;
