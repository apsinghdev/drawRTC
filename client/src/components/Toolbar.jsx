/* eslint-disable react/prop-types */
import ColorPicker from "./ColorPicker";
import StrokeWidthPicker from "./StrokeWidthPicker";
import ClearBtn from "./ClearBtn";

function Toolbar(props){
    return (
      <div className="block w-full mt-20 border align-center">
        <ColorPicker name="Colors :" defaultColor="#000000"></ColorPicker>
        <ColorPicker name="Canvas :" defaultColor="#FFFFFF"></ColorPicker>
        <StrokeWidthPicker></StrokeWidthPicker>
        <ClearBtn clearOnClick={props.clearOnClick} id={props.id}></ClearBtn>
      </div>
    );
}
export default Toolbar;