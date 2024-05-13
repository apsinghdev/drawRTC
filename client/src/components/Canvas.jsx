/* eslint-disable react/prop-types */
function Canvas(props){
    return (
      <div className="flex justify-center items-center h-full w-80vw overflow-hidden">
        <canvas
          className="h-full w-86vw bg-yellow-600"
          ref={props.canvasRef}
        ></canvas>
      </div>
    );
}

export default Canvas;