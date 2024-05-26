/* eslint-disable react/prop-types */
import Menu from "./Menu";
import { useRecoilValue } from "recoil";
import { canvasColors } from "../atoms";

function Canvas(props){
  const canvasColor = useRecoilValue(canvasColors);
    return (
      <div className="flex justify-center items-center h-full w-80vw overflow-hidden">
        <canvas
          className="h-full w-86vw"
          style={{backgroundColor: `${canvasColor}`}}
          ref={props.canvasRef}
        ></canvas>
        {props.showMenu && <Menu></Menu>}
      </div>
    );
}

export default Canvas;