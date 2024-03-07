import { useEffect, useRef } from "react";
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    const ctx = canvas.getContext("2d");

    const canvasHeight = canvas.getBoundingClientRect().height;
    const canvasWidht = canvas.getBoundingClientRect().width;

    function drawLine(sx, sy, ex, ey) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = ctx.strokeStyle;
    ctx.lineWidth = ctx.lineWidth;
    ctx.lineCap = 'round';
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
      startX = 0;
      startY = 0;
      ctx.stroke();
      ctx.beginPath();
    }

    canvas.addEventListener("mousemove", handleMouseover);
    canvas.addEventListener("mousedown", handleMousedown);
    canvas.addEventListener("mouseup", handleMouseup);

    const sidebar = sidebarRef.current;
    sidebar.addEventListener('click', (e)=>{
      if(e.target.id === 'clear'){
        ctx.clearRect(0, 0, canvasWidht, canvasHeight)
      }
      else if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
      }
      else if(e.target.id === 'lineWidth'){
        ctx.lineWidth = e.target.value;
      }
    })


    return () => {
      canvas.removeEventListener("mousemove", handleMouseover);
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mouseup", handleMouseup);
    };
  }, []);

  return (
    <div id="container" style={{ display: 'flex' }}>
  <div id="sidebar" ref={sidebarRef}>
    <h1 id="drawRTC">drawRTC</h1>
    <div className="input-container" id='colorpicker'>
      <label htmlFor="stroke">Stroke</label>
      <input id="stroke" name="stroke" type="color" />
    </div>
    <div className="input-container" id='linewidth'>
      <label htmlFor="lineWidth">Line Width</label>
      <input id="lineWidth" name="lineWidth" type="number" defaultValue="5" />
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
