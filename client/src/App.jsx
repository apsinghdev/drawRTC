import { useEffect, useRef } from "react";

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
      if(isDrawing){
        const endX = e.clientX-canvas.getBoundingClientRect().left;
        const endY = e.clientY-canvas.getBoundingClientRect().top;
        drawLine(startX, startY, endX, endY);
        startX = endX;
        startY = endY;
      }
    }

    function handleMousedown(e) {
      isDrawing = true;
      startX = e.clientX-canvas.getBoundingClientRect().left;
      startY = e.clientY-canvas.getBoundingClientRect().top;
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "700px",
        width: "100%",
      }}
    >
      <canvas
        style={{
          height: "70vh",
          width: "70vh",
          border: "0px solid black",
          boxShadow: "0 0 4px #000",
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default App;
