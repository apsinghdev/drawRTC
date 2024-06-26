/* eslint-disable react/prop-types */
function StrokeWidthPicker(props){
  return (
    <div className="flex p-1 items-center justify-around mt-4">
      <h1 className="font-sans text-lg antialiased font-semibold text-white">
        Stroke :
      </h1>
      <input
        onChange={props.addLineWidth}
        id="lineWidth"
        type="number"
        placeholder="2"
        defaultValue={2}
        className="w-12 p-1 h-8 block border border-gray-800 cursor-pointer rounded-md"
      ></input>
    </div>
  );
}

export default StrokeWidthPicker;