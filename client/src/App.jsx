import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);
  let color = '#000000'
  let ctx;
  let canvas;

  useEffect(() => {
    canvas = canvasRef.current;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    ctx = canvas.getContext("2d");
    

    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
    function drawLine(sx, sy, ex, ey) {
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.lineCap = "round";
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

    return () => {
      canvas.removeEventListener("mousemove", handleMouseover);
      canvas.removeEventListener("mousedown", handleMousedown);
      canvas.removeEventListener("mouseup", handleMouseup);
    };
  }, []);

  function clearRect(e){
    if (e.target.id === "clear") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function addStroke(e){
    if(e.target.id === "stroke"){
      color = e.target.value;
      ctx.strokeStyle = color;
    }
  }

  function addLineWidth(e){
    if (e.target.id === "lineWidth") {
      ctx.lineWidth = e.target.value;
    }
  }

  return (
    <div id="container" style={{ display: "flex" }}>
      <div id="sidebar" ref={sidebarRef}>
        <h1 id="drawRTC">drawRTC</h1>
        <div className="input-container" id="colorpicker">
          <label htmlFor="stroke">Stroke</label>
          <input id="stroke" name="stroke" type="color" defaultValue={color} onInput={addStroke}/>
        </div>
        <div className="input-container" id="linewidth">
          <label htmlFor="lineWidth">Line Width</label>
          <input
            id="lineWidth"
            name="lineWidth"
            type="number"
            defaultValue="3"
            onInput={addLineWidth} 
          />
        </div>
        <button id="clear" onClick={clearRect}>Clear</button>
      </div>
      <div className="canvas-container">
        <canvas className="canvas" ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default App;
