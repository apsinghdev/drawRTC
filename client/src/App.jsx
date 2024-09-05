/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import InfoMsg from "./components/InfoMsg";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Menu from "./components/Menu";
import EraserCursor from "./components/EraserCursor";
import TextEditor from "./components/TextEditor";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  eraserState,
  cursorPosition,
  canvasColors,
  canvasState,
  showMenuState,
  showTextEditor,
  collaborationStarted,
  showMsg,
  roomIdAtom,
  messageTxtAtom
} from "./atoms";
import { useSocket } from "./Context";

const PORT = "http://localhost:8000"; 

function App() {
  const [showMenu, setShowMenu] = useRecoilState(showMenuState);
  const eraserMode = useRecoilValue(eraserState);
  const [position, setPosition] = useRecoilState(cursorPosition);
  const [ctx, setCtx] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const canvasColor = useRecoilValue(canvasColors);
  const [currentCanvas, setCanvas] = useRecoilState(canvasState);
  const textEditor = useRecoilValue(showTextEditor);
  const setTextEditor = useSetRecoilState(showTextEditor);
  const hasCollaborationStarted = useRecoilValue(collaborationStarted);
  const setCollaborationFlag = useSetRecoilState(collaborationStarted);
  const [showMessage, setShowMsg] = useRecoilState(showMsg);
  const [roomId, setRoomId] = useRecoilState(roomIdAtom);
  const { socket, setSocket } = useSocket();
  const [ messageText, setMessageText ] = useRecoilState(messageTxtAtom);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);
  let lineWidth;

  function drawLine(sx, sy, ex, ey, penColor, lineWidth) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.lineCap = "round";
    ctx.lineWidth = eraserMode ? 40 : lineWidth;
    ctx.strokeStyle = eraserMode ? canvasColor : penColor;
    ctx.stroke();
  }

  useEffect(() => {
    setCanvas(canvasRef.current);
    const canvas = currentCanvas;
    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.width = canvas.getBoundingClientRect().width;
      canvas.height = canvas.getBoundingClientRect().height;
      setCtx(context);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (!ctx) return;
    setCanvas(canvasRef.current);
    const canvas = currentCanvas;
    function handleMousemove(e) {
      // if eraseMode is set the position of the eraser cursor
      if (eraserMode) {
        setPosition(() => ({ x: e.clientX, y: e.clientY }));
      }

      if (!isDrawing) return;
      const endX = e.clientX - canvas.getBoundingClientRect().left;
      const endY = e.clientY - canvas.getBoundingClientRect().top;
      drawLine(startX, startY, endX, endY, penColor);
      if (hasCollaborationStarted && socket) {
        socket.emit("draw", { startX, startY, endX, endY, penColor, lineWidth, room_id: roomId });
      }
      setStartX(endX);
      setStartY(endY);
    }

    function handleMousedown(e) {
      setIsDrawing(true);
      let X = e.clientX - canvas.getBoundingClientRect().left;
      let Y = e.clientY - canvas.getBoundingClientRect().top;
      setStartX(X);
      setStartY(Y);
    }
    function handleMouseup() {
      setIsDrawing(false);
      setStartX(0);
      setStartY(0);
      ctx.beginPath();
    }

    canvas.addEventListener("mousemove", handleMousemove);
    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mouseup", handleMouseup);

    return () => {
      canvas.removeEventListener("mousemove", handleMousemove);
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mouseup", handleMouseup);
    };
  }, [socket, penColor, eraserMode, position, ctx, isDrawing, startX, startY]);

  useEffect(() => {
    if (hasCollaborationStarted && socket) {
      socket.on("draw", (data) => {
        drawLine(
          data.startX,
          data.startY,
          data.endX,
          data.endY,
          data.penColor,
          data.lineWidth
        );
      });
  
      socket.on("clear", () => {
        clearRect();
      });
  
      return () => {
        socket.off("draw");
        socket.off("clear");
      };
    }
  }, [socket, ctx, hasCollaborationStarted]);

  function clearRect() {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

  function clearOnClick() {
    clearRect();
    if (hasCollaborationStarted && socket) {
      const data = {room_id: roomId};
      socket.emit("clear", data);
    }
  }

  function addStroke(e) {
    if (e.target.id === "penColor") {
      const newColor = e.target.value;
      setPenColor(newColor);
      if (ctx) {
        ctx.strokeStyle = newColor;
      }
    }
  }

  function addLineWidth(e) {
    if (e.target.id === "lineWidth") {
      lineWidth = e.target.value;
      if (ctx) {
        ctx.lineWidth = lineWidth;
      }
    }
  }

  const closeMsg = () => {
    setMessageText(null);
    setShowMsg(false);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomID = urlParams.get("roomID");
    const RETRIES = 5;
    const DELAY_DURATION = 2000;
    let attempts = 0;
  
    const closeConnection = (socket) => {
      if (attempts >= RETRIES) {
        socket.disconnect();
        setCollaborationFlag(false);
        console.log("Max socket calls exceeded. Please try connecting again.")
      }
    }

    if (roomID) {
      const collaborationLink = window.location.href;
      setRoomId(roomID);
      setCollaborationFlag(true);
      const newSocket = io(PORT);

      try {
        newSocket.on("connect", () => {
          console.log("connected");
          try {
            newSocket.emit("joinRoom", { room_id: roomID });
            console.log(`joined room ${roomID}`);
            setSocket(newSocket);
            setMessageText(`Collaboration Link : ${collaborationLink}`);
            setShowMsg(true);
          } catch (error) {
            console.log("Can't join the room", error);
          }
        });

        newSocket.on("connect_error", (error) => {
          attempts++;
          console.log("Failed to connect to the socket server. Retrying...")
          setTimeout(() => closeConnection(newSocket), DELAY_DURATION);
        })

      } catch (error) {
        console.log("Can't connect", error);
      }
    }
  }, []);

  // Hook to listen the events emitted by the server
  useEffect(() => {
    if (hasCollaborationStarted && socket) {
      socket.on("open-text-editor", () => {
        setTextEditor(true);
      });

      return () => {
        socket.off("open-text-editor");
      };
    }
  }, [showTextEditor, socket, hasCollaborationStarted]);

  // Hook to display a message when someone opens the app through vercel's url
  useEffect(() => {
    const isVercel = window.location.hostname === "drawrtcbyajeet.vercel.app"
    if (isVercel) {
      setMessageText("Collaborative features require local installation. For more information, please visit our GitHub repository (linked in the menu).");
      setShowMsg(true);
    }
  }, []);

  // Hook to hide the menu when user click elsewhere on the screen
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("click", () => {
      if (showMenu) {
        setShowMenu(false);
      }
    })
  }, [showMenu]);

  return (
    <div id="container">
      <Sidebar
        addStroke={addStroke}
        addLineWidth={addLineWidth}
        clearOnClick={clearOnClick}
        ref={sidebarRef}
        id="clear"
        toggleMenu={toggleMenu}
      ></Sidebar>
      <Canvas canvasRef={canvasRef}></Canvas>
      {eraserMode && <EraserCursor></EraserCursor>}
      {showMenu && <Menu></Menu>}
      {textEditor && <TextEditor></TextEditor>}
      {showMessage && <InfoMsg message={messageText} clickHandler={closeMsg}></InfoMsg>}
    </div>
  );
}

export default App;