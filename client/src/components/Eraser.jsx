import eraserImg from "../assets/eraser.png";
import { useState } from "react";

function Eraser(){
const [ eraserMode, setEraserMode ] = useState(false);

  function clickHandler(){
    setEraserMode(!eraserMode);
  }

    return (
      <div className="flex p-1 items-center justify-around mt-3">
        <h1 className="font-sans text-lg antialiased font-semibold text-white">
          Eraser :
        </h1>
        <img src={eraserImg} className="h-8 w-8 rounded cursor-pointer" onClick={clickHandler} ></img>
      </div>
    );
}

export default Eraser;