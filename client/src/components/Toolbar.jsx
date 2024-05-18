/* eslint-disable react/prop-types */
import StrokeWidthPicker from "./StrokeWidthPicker";
import ClearBtn from "./ClearBtn";
import Eraser from "./Eraser";
import CanvasColor from "./CanvasColor";
import PenColor from "./PenColor";

function Toolbar(props){
    return (
      <div className="block w-full mt-20 align-center">
        <PenColor addStroke={props.addStroke} name="Color :"></PenColor>
        <CanvasColor name="Canvas :"></CanvasColor>
        <Eraser></Eraser>
        <StrokeWidthPicker
          addLineWidth={props.addLineWidth}
        ></StrokeWidthPicker>
        <ClearBtn clearOnClick={props.clearOnClick} id={props.id}></ClearBtn>
      </div>
    );
}
export default Toolbar;