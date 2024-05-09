/* eslint-disable react/prop-types */
function ColorPicker(props){
    return (
      <div className="flex p-1 items-center justify-around mt-3">
        <h1 className="font-sans text-lg antialiased font-semibold text-white">
          {props.name}
        </h1>
        <input
          type="color"
          value={props.defaultColor}
          className="p-1 h-10 w-14 block bg-white border border-gray-800 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700"
        ></input>
      </div>
    );
}

export default ColorPicker;