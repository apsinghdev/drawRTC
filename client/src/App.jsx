import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef(null);                   

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function handleEvent(e){
      console.log(e.clientX, e.clientY) 
    }
    canvas.addEventListener('mousemove', handleEvent);
    
    return ()=>{
      canvas.removeEventListener('mousemove', handleEvent);
    }
  }, [])

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
