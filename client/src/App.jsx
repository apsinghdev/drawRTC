import { useEffect, useRef } from "react";
import './App.css'

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    const ctx = canvas.getContext("2d");

    function drawLine(sx, sy, ex, ey) {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function handleMouseover(e) {
      if (!isDrawing) return;
      const endX = e.clientX - canvas.getBoundingClientRect().left;
      const endY = e.clientY - canvas.getBoundingClientRect().top;
      drawLine(startX, startY, endX, endY);
      startX = endX;
      startY = endY;
    }

    function handleMousedown(e) {
      isDrawing = true;
      startX = e.clientX - canvas.getBoundingClientRect().left;
      startY = e.clientY - canvas.getBoundingClientRect().top;
    }
    function handleMouseup(e) {
      isDrawing = false;
    }

    canvas.addEventListener("mousemove", handleMouseover);
    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mouseup", handleMouseup);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseover);
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mouseup", handleMouseup);
    };
  }, []);

  return (
    <div id="container" style={{ display: 'flex' }}>
  <div id="sidebar">
    <h1 id="drawRTC">drawRTC</h1>
    <div className="input-container" id='colorpicker'>
      <label htmlFor="stroke">Stroke</label>
      <input id="stroke" name="stroke" type="color" />
    </div>
    <div className="input-container" id='linewidth'>
      <label htmlFor="lineWidth">Line Width</label>
      <input id="lineWidth" name="lineWidth" type="number" value="5" />
    </div>
    <button id="clear">Clear</button>
  </div>
  <div className="canvas-container">
    <canvas className="canvas" ref={canvasRef}></canvas>
  </div>
</div>

  );
}

export default App;
