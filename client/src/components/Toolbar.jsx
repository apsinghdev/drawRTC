import ColorPicker from "./ColorPicker";
import StrokeWidthPicker from "./StrokeWidthPicker";
import ClearBtn from "./ClearBtn";

function Toolbar(){
    return (
      <div className="block w-full mt-20 border align-center">
        <ColorPicker name="Colors :" defaultColor="#000000"></ColorPicker>
        <ColorPicker name="Canvas :" defaultColor="#FFFFFF"></ColorPicker>
        <StrokeWidthPicker></StrokeWidthPicker>
        <ClearBtn></ClearBtn>
      </div>
    );
}
export default Toolbar;