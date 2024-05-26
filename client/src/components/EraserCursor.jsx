import eraserSvg from "../assets/eraserSvg.svg";
import { useRecoilValue } from "recoil";
import { cursorPosition } from "../atoms";

function EraserCursor() {
  const position = useRecoilValue(cursorPosition);

  return (
    <div
      className="h-7 w-7 left-36 transform rotate-90 absolute eraser-cursor"
      style={{ left: position.x, top: position.y }}
    >
      <img src={eraserSvg}></img>
    </div>
  );
}

export default EraserCursor;