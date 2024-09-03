/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import socket from "./socket";
import InfoMsg from "./components/InfoMsg";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Menu from "./components/Menu";
import EraserCursor from "./components/EraserCursor";
import TextEditor from "./components/TextEditor";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  eraserState,
  cursorPosition,
  canvasColors,
  canvasState,
  showMenuState,
  showTextEditor,
  collaborationStarted,
  showMsg
} from "./atoms";


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
  const hasCollaborationStarted = useRecoilValue(collaborationStarted);
  const [showMessage, setShowMsg] = useRecoilState(showMsg);

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
      if (hasCollaborationStarted) {
        socket.emit("draw", { startX, startY, endX, endY, penColor, lineWidth });
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
  }, [penColor, eraserMode, position, ctx, isDrawing, startX, startY]);

  useEffect(() => {
    if (hasCollaborationStarted) {
      socket.on("draw", (data) => {
        console.log("on draw");
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
    if (hasCollaborationStarted) {
      socket.emit("clear");
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
    setShowMsg(false);
  }

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
      {showMessage && <InfoMsg message="" clickHandler={closeMsg}></InfoMsg>}
    </div>
  );
}

export default App;