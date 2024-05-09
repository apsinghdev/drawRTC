import ColorPicker from "./ColorPicker";
import StrokeWidthPicker from "./StrokeWidthPicker";

function Toolbar(){
    return (
      <div className="block w-full mt-20">
        <ColorPicker name="Colors :" defaultColor="#000000"></ColorPicker>
        <ColorPicker name="Canvas :" defaultColor="#FFFFFF"></ColorPicker>
        <StrokeWidthPicker></StrokeWidthPicker>
      </div>
    );
}
export default Toolbar;