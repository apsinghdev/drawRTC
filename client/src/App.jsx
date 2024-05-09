import { useEffect, useRef, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

import Header from "./components/Header";

function App() {
  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);
  let color = '#000000'
  let ctx;
  let canvas;
  let lineWidth;

  function drawLine(sx, sy, ex, ey, color, lineWidth) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  useEffect(() => { 
    canvas = canvasRef.current;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    ctx = canvas.getContext("2d");

    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;

    function handleMousemove(e) {
      if (!isDrawing) return;
      const endX = e.clientX - canvas.getBoundingClientRect().left;
      const endY = e.clientY - canvas.getBoundingClientRect().top;
      drawLine(startX, startY, endX, endY, color );
      socket.emit("draw", { startX, startY, endX, endY, color, lineWidth });
      startX = endX;
      startY = endY;
    }

    function handleMousedown(e) {
      isDrawing = true;
      startX = e.clientX - canvas.getBoundingClientRect().left;
      startY = e.clientY - canvas.getBoundingClientRect().top;
    }
    function handleMouseup() {
      isDrawing = false;
      startX = 0;
      startY = 0;
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
  }, [color]);

  useEffect(() => {
    socket.on("draw", (data) => {
      drawLine(
        data.startX,
        data.startY,
        data.endX,
        data.endY,
        data.color,
        data.lineWidth
      );
    });
  
    socket.on("clear", () => {
      clearRect();
    });
   
   return () => {
    socket.off("draw");
    socket.off("clear");
   }
  }, []);

  function clearRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function clearOnClick(){
    clearRect();
    socket.emit('clear')
  }

  function addStroke(e) {
    if (e.target.id === "stroke") {
      const newColor = e.target.value;
      color = newColor;
      ctx.strokeStyle = newColor;
      
    }
  }

  function addLineWidth(e) {
    if (e.target.id === "lineWidth") {
      lineWidth = e.target.value;
      ctx.lineWidth = lineWidth;
    }
  }

  return (
    <div id="container" style={{ display: "flex" }}>
      <div
        id="sidebar"
        className="flex flex-col w-64 bg-gray-900"
        ref={sidebarRef}
      >
        <Header></Header>
        <h1 id="drawRTC">drawRTC</h1>
        <div className="input-container" id="colorpicker">
          <label htmlFor="stroke">Stroke</label>
          <input id="stroke" name="stroke" type="color" onChange={addStroke} />
        </div>
        <div className="input-container" id="linewidth">
          <label htmlFor="lineWidth">Line Width</label>
          <input
            id="lineWidth"
            name="lineWidth"
            type="number"
            defaultValue="3"
            onChange={addLineWidth}
          />
        </div>
        <button id="clear" onClick={clearOnClick}>
          Clear
        </button>
      </div>
      <div className="canvas-container">
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default App;

